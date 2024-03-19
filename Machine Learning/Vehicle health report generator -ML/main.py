import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score

# Load and prepare the training dataset
data_path_training = r"C:\Users\MSI\OneDrive\Desktop\SDGP\2017-07-05_Seat_Leon_RT_S_Stau.csv"
data_training = pd.read_csv(data_path_training)

# Initial data cleaning for the training dataset
data_training = data_training.dropna(how='all', subset=data_training.columns[1:])  # Ignore 'Time' for dropping rows
numeric_columns_training = data_training.select_dtypes(include=['number']).columns
data_training[numeric_columns_training] = data_training[numeric_columns_training].fillna(data_training[numeric_columns_training].mean(), inplace=False)

# Define thresholds for potential issues and optimal ranges for the training dataset
thresholds = {
    'Engine Coolant Temperature': {'high': 90, 'optimal_range': (70, 90)},
    'Engine RPM [RPM]': {'low': 500, 'high': 4000, 'optimal_range': (800, 3000)},
    'Vehicle Speed Sensor [km/h]': {'low': 0, 'high': 200, 'optimal_range': (0, 130)},
    'Intake Air Temperature': {'high': 50, 'optimal_range': (10, 35)},
    'Air Flow Rate from Mass Flow Sensor [g/s]': {'low': 10, 'optimal_range': (15, 100)}
}

# Adding a synthetic target variable for the training dataset
data_training['MaintenanceNeeded'] = ((data_training['Engine Coolant Temperature '] > thresholds['Engine Coolant Temperature']['high']) |
                                      (data_training['Engine RPM [RPM]'] < thresholds['Engine RPM [RPM]']['low']) |
                                      (data_training['Engine RPM [RPM]'] > thresholds['Engine RPM [RPM]']['high']) |
                                      (data_training['Vehicle Speed Sensor [km/h]'] > thresholds['Vehicle Speed Sensor [km/h]']['high']) |
                                      (data_training['Intake Air Temperature'] > thresholds['Intake Air Temperature']['high']) |
                                      (data_training['Air Flow Rate from Mass Flow Sensor [g/s]'] < thresholds['Air Flow Rate from Mass Flow Sensor [g/s]']['low'])).astype(int)

# Preparing features and labels for the training dataset
X_train = data_training[numeric_columns_training]
y_train = data_training['MaintenanceNeeded']

# Training the Random Forest Classifier
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Load and prepare a new dataset for generating the health report
data_path_health_report = r"C:\Users\MSI\OneDrive\Desktop\SDGP\2017-07-05_Seat_Leon_S_KA_Normal.csv"  # Update this path to your new dataset
data_health_report = pd.read_csv(data_path_health_report)


# Apply similar initial data cleaning steps to the health report dataset
data_health_report = data_health_report.dropna(how='all', subset=data_health_report.columns[1:])  # Ignore 'Time' for dropping rows
numeric_columns_health_report = data_health_report.select_dtypes(include=['number']).columns
data_health_report[numeric_columns_health_report] = data_health_report[numeric_columns_health_report].fillna(data_health_report[numeric_columns_health_report].mean(), inplace=False)

# Use the trained model to predict maintenance needs on the new dataset
X_new = data_health_report[numeric_columns_health_report]
data_health_report['PredictedMaintenanceNeeded'] = model.predict(X_new)

# Function to identify issues for the summary report on the new dataset
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
print(common_issues)

print("\nMaintenance Summary Report :")
for issue, count in common_issues.items():
    if count > 0:
        print(f"- {issue} was identified as an issue in {count} instances.")

# General recommendations based on common issues
print("\nGeneral Maintenance Recommendations:")


if any(count > 0 for count in common_issues.values()):

    recommendations_given = set()

    for issue, count in common_issues.items():
        if count > 0:
            if issue == 'Engine RPM [RPM]' and 'engine_inspection' not in recommendations_given:
                print("- Check the engine system.")
                recommendations_given.add('engine_inspection')

            elif issue == 'Vehicle Speed Sensor [km/h]'  and 'sensor_inspection' not in recommendations_given:
                print("- Recommend checking the sensor for any issues.")
                recommendations_given.add('sensor_inspection')

            elif issue == 'Engine Coolant Temperature' or issue == 'Intake Air Temperature' and 'coolant' not in recommendations_given:
                print("- Check and maintain proper coolant levels and inspect the cooling system.")
                recommendations_given.add('coolant')

            elif issue == 'Air Flow Rate from Mass Flow Sensor [g/s]' and 'Air Flow' not in recommendations_given:
                print("- Check air intake system and associated components")
                recommendations_given.add('Air Flow')

else:
    print("\nNo common issues identified requiring general maintenance recommendations.")