import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score


# Loading and preparing the training dataset
data_path_training = r"C:\Users\MSI\OneDrive\Desktop\SDGP\drive1.csv"
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
    'FUEL_TRIM': {'low': -10, 'high': 10, 'optimal_range': (-5, 5)}  # Example threshold for fuel trim issues
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

# Preparing features and labels for the training dataset
X = data_training[numeric_columns_training]
y = data_training['MaintenanceNeeded']


X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)


# Checking for infinite values and replace them if any
if np.isinf(X_train).values.sum() > 0:
    X_train = X_train.replace([np.inf, -np.inf], np.nan).fillna(0)
# Converting to float32 to ensure compatibility
X_train = X_train.astype('float32')
# Training the Random Forest Classifier
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

y_pred = model.predict(X_test.astype('float32'))

accuracy = accuracy_score(y_test, y_pred)
precision = precision_score(y_test, y_pred)
recall = recall_score(y_test, y_pred)
f1 = f1_score(y_test, y_pred)

#print(f"Accuracy: {accuracy:.4f}")
#print(f"Precision: {precision:.4f}")
#print(f"Recall: {recall:.4f}")
#print(f"F1 Score: {f1:.4f}")

# Loading and preparing a new dataset for generating the health report
data_path_health_report = r"C:\Users\MSI\OneDrive\Desktop\SDGP\archive\live8.csv"
data_health_report = pd.read_csv(data_path_health_report)

# Applying similar initial data cleaning steps to the health report dataset
data_health_report = data_health_report.dropna(how='all', subset=data_health_report.columns[1:])  # Ignore 'Time' for dropping rows
numeric_columns_health_report = data_health_report.select_dtypes(include=['number']).columns
data_health_report[numeric_columns_health_report] = data_health_report[numeric_columns_health_report].fillna(data_health_report[numeric_columns_health_report].mean())

# Preparing features for prediction
X_new = data_health_report[numeric_columns_health_report].astype('float32')  # Ensure data type compatibility

# Using the trained model to predict maintenance needs on the new dataset
data_health_report['PredictedMaintenanceNeeded'] = model.predict(X_new)

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


print("\n---Maintenance Summary Report---")
for issue, count in common_issues.items():
    if count >0 :
        print(f" {issue} was identified as an issue in {count} instances.")

# General recommendations based on common issues
print("\n---Maintenance Recommendations---")


if any(count >100 for count in common_issues.values()):

    recommendations_given = set()

    for issue, count in common_issues.items():
        if count > 100:
            if issue == 'ENGINE_RPM ()' and 'engine_inspection' not in recommendations_given:
                print(" Check the engine system.")
                recommendations_given.add('engine_inspection')

            elif issue == 'VEHICLE_SPEED ()'and 'sensor_inspection' not in recommendations_given:
                print("  Recommend checking the sensor for any issues.")
                recommendations_given.add('sensor_inspection')

            elif issue == 'COOLANT_TEMPERATURE ()'  and 'coolant' not in recommendations_given:
                print(" Check and maintain proper coolant levels and inspect the cooling system.")
                recommendations_given.add('coolant')


            elif issue == 'INTAKE_AIR_TEMP ()' and 'AirIntakeIsuue' not in recommendations_given:
                print(' Inspect the Air Intake System')
                recommendations_given.add('AirIntakeIsuue')

            elif issue == 'FUEL_TRIM' and 'FuelIssue' not in recommendations_given:
                print('  Inspect Oxygen sensors,Air Filter and Check for Vacuum Leaks')

else:
    print("\nNo major issues identified requiring general maintenance recommendations.")





