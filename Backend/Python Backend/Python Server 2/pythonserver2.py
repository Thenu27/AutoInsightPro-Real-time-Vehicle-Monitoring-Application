from flask import Flask, jsonify
import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report
import numpy as np
from sklearn.impute import SimpleImputer  

app = Flask(__name__)

# Load data and preprocess for coolant temperature malfunction
coolant_data = pd.read_csv('data.csv')
features_coolant = coolant_data.drop(columns=['COOLANT_TEMPERATURE ()'])
target_coolant = ((coolant_data['COOLANT_TEMPERATURE ()'] < 185) | (coolant_data['COOLANT_TEMPERATURE ()'] > 205)).astype(int)
X_train_coolant, X_test_coolant, y_train_coolant, y_test_coolant = train_test_split(features_coolant, target_coolant, test_size=0.2, random_state=42)
clf_coolant = RandomForestClassifier(n_estimators=100, random_state=42)
clf_coolant.fit(X_train_coolant, y_train_coolant)

# Load data for throttle response issue
throttle_data = pd.read_csv('updated_livenew.csv')
features_throttle = ['ENGINE_RUN_TINE ()', 'ENGINE_RPM ()', 'VEHICLE_SPEED ()', 'THROTTLE ()', 'ENGINE_LOAD ()', 'COOLANT_TEMPERATURE ()', 'FUEL_AIR_COMMANDED_EQUIV_RATIO ()', 'INTAKE_AIR_TEMP ()']
target_throttle = 'Throttle_Response_Problem'
x_train_throttle = throttle_data[features_throttle]
y_train_throttle = throttle_data[target_throttle]
scaler = StandardScaler()
x_train_scaled_throttle = scaler.fit_transform(x_train_throttle)
clf_throttle = RandomForestClassifier(random_state=42)
clf_throttle.fit(x_train_scaled_throttle, y_train_throttle)

initial_data_path = "2017-07-05_Seat_Leon_S_KA_Normal.csv"
initial_data = pd.read_csv(initial_data_path)
initial_data['Issue'] = (initial_data['COOLANT_TEMPERATURE ()'] > 90).astype(int)
X_initial = initial_data[['COOLANT_TEMPERATURE ()']]
y_initial = initial_data['Issue']
X_train_initial, X_test_initial, y_train_initial, y_test_initial = train_test_split(X_initial, y_initial, test_size=0.2, random_state=42)
model_initial = LogisticRegression()
model_initial.fit(X_train_initial, y_train_initial)

def detect_cooling_system_issue(new_data_path):
    new_data = pd.read_csv(new_data_path)
    if 'COOLANT_TEMPERATURE ()' in new_data.columns:
        Coolant_issue = model_initial.predict(new_data[['COOLANT_TEMPERATURE ()']])
        new_data['Coolant Issue'] = Coolant_issue
        new_data['Coolant Issue Message'] = new_data['Coolant Issue'].map({0: 'No coolant issue detected.', 1: 'Potential coolant issue detected!'})

        issue_count = new_data['Coolant Issue'].sum()
        if issue_count > 1000:
            return "Cooling system issue is predicted to occur"
        else:
            return "Cooling system operating normally"
    else:
        return "The required column 'COOLANT_TEMPERATURE ()' is not in the new dataset."

@app.route('/check_issues', methods=['GET'])
def check_issues():
    y_pred_coolant = clf_coolant.predict(X_test_coolant)
    coolant_output = "Thermostat malfunction detected." if any(y_pred_coolant) else "No thermostat malfunction detected."

    new_data_throttle = pd.read_csv('live3.csv')
    x_new_throttle = new_data_throttle[features_throttle]
    x_new_scaled_throttle = scaler.transform(x_new_throttle)

    predictions_throttle = clf_throttle.predict(x_new_scaled_throttle)
    count_yes = sum(predictions_throttle == 1)
    throttle_output = "There is a potential for a throttle issue." if count_yes >= 1000 else ""

    cooling_system_output = detect_cooling_system_issue("drive1.csv")

    return jsonify({"coolant_output": coolant_output, "throttle_output": throttle_output, "cooling_system_output": cooling_system_output})
@app.route('/generate_maintenance_report', methods=['GET'])
def generate_maintenance_report():
    # Loading and preparing the training dataset
    data_path_training = "drive1.csv"
    data_training = pd.read_csv(data_path_training)

    # Initialing data cleaning for the training dataset
    data_training = data_training.dropna(how='all', subset=data_training.columns[1:])
    numeric_columns_training = data_training.select_dtypes(include=['number']).columns
    data_training[numeric_columns_training] = data_training[numeric_columns_training].fillna(data_training[numeric_columns_training].mean())

    # Defining thresholds for potential issues and optimal ranges for the training dataset
    thresholds = {
        'COOLANT_TEMPERATURE ()': {'high': 90, 'optimal_range': (70, 90)},
        'ENGINE_RPM ()': {'low': 500, 'high': 4000, 'optimal_range': (800, 3000)},
        'VEHICLE_SPEED ()': {'low': 0, 'high': 200, 'optimal_range': (0, 130)},
        'INTAKE_AIR_TEMP ()': {'high': 50, 'optimal_range': (10, 35)},
        'FUEL_TRIM': {'low': -10, 'high': 10, 'optimal_range': (-5, 5)}
    }

    # Adding a synthetic target variable for the training dataset
    data_training['MaintenanceNeeded'] = (
        (data_training['COOLANT_TEMPERATURE ()'] > thresholds['COOLANT_TEMPERATURE ()']['high']) |
        (data_training['ENGINE_RPM ()'] < thresholds['ENGINE_RPM ()']['low']) |
        (data_training['ENGINE_RPM ()'] > thresholds['ENGINE_RPM ()']['high']) |
        (data_training['VEHICLE_SPEED ()'] > thresholds['VEHICLE_SPEED ()']['high']) |
        (data_training['INTAKE_AIR_TEMP ()'] > thresholds['INTAKE_AIR_TEMP ()']['high']) |
        (data_training['SHORT_TERM_FUEL_TRIM_BANK_1 ()'].between(thresholds['FUEL_TRIM']['low'],
                                                                 thresholds['FUEL_TRIM']['high'],
                                                                 inclusive='neither') == False) |
        (data_training['LONG_TERM_FUEL_TRIM_BANK_1 ()'].between(thresholds['FUEL_TRIM']['low'],
                                                                thresholds['FUEL_TRIM']['high'],
                                                                inclusive='neither') == False)
    ).astype(int)

    
    X = data_training[numeric_columns_training]
    y = data_training['MaintenanceNeeded']
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    
    imputer = SimpleImputer(strategy='mean')  
    X_train_imputed = imputer.fit_transform(X_train) 
    X_test_imputed = imputer.transform(X_test)  

    # Training the Random Forest Classifier
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train_imputed, y_train)

    # Loading and preparing a new dataset for generating the health report
    data_path_health_report = "live8.csv"
    data_health_report = pd.read_csv(data_path_health_report)

    # Applying similar initial data cleaning steps to the health report dataset
    data_health_report = data_health_report.dropna(how='all', subset=data_health_report.columns[1:])
    numeric_columns_health_report = data_health_report.select_dtypes(include=['number']).columns
    data_health_report[numeric_columns_health_report] = data_health_report[numeric_columns_health_report].fillna(data_health_report[numeric_columns_health_report].mean())

   
    X_new = data_health_report[numeric_columns_health_report].astype('float32')

    X_new_imputed = imputer.transform(X_new)

    data_health_report['PredictedMaintenanceNeeded'] = model.predict(X_new_imputed)

    # Function to identify common issues
    def identify_common_issues(data, thresholds):
        issue_counts = {issue: 0 for issue in thresholds.keys()}
        for index, row in data.iterrows():
            for feature, threshold in thresholds.items():
                if feature in row and not pd.isnull(row[feature]):
                    value = row[feature]
                    if 'low' in threshold and value < threshold['low']:
                        issue_counts[feature] += 1
                    if 'high' in threshold and value > threshold['high']:
                        issue_counts[feature] += 1
        return issue_counts

    # Generating a summary report for the new dataset
    common_issues = identify_common_issues(data_health_report, thresholds)

    summary_report = {"Maintenance Summary Report": {}}

    for issue, count in common_issues.items():
        if count > 0:
            summary_report["Maintenance Summary Report"][issue] = f"{count} instances identified."

    # General recommendations based on common issues
    recommendations_given = set()
    recommendations = []

    for issue, count in common_issues.items():
        if count > 100:
            if issue == 'ENGINE_RPM ()' and 'engine_inspection' not in recommendations_given:
                recommendations.append("Check the engine system.")
                recommendations_given.add('engine_inspection')

            elif issue == 'VEHICLE_SPEED ()' and 'sensor_inspection' not in recommendations_given:
                recommendations.append("Recommend checking the sensor for any issues.")
                recommendations_given.add('sensor_inspection')

            elif issue == 'COOLANT_TEMPERATURE ()' and 'coolant' not in recommendations_given:
                recommendations.append("Check and maintain proper coolant levels and inspect the cooling system.")
                recommendations_given.add('coolant')

            elif issue == 'INTAKE_AIR_TEMP ()' and 'AirIntakeIsuue' not in recommendations_given:
                recommendations.append('Inspect the Air Intake System')
                recommendations_given.add('AirIntakeIsuue')

            elif issue == 'FUEL_TRIM' and 'FuelIssue' not in recommendations_given:
                recommendations.append('Inspect Oxygen sensors, Air Filter and Check for Vacuum Leaks')

    summary_report["Maintenance Recommendations"] = recommendations if recommendations else "No major issues identified requiring general maintenance recommendations."

    return jsonify(summary_report)

if __name__ == '__main__':
    app.run(debug=True)
