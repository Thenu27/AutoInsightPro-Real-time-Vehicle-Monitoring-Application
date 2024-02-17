import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report
from sklearn.preprocessing import StandardScaler
from sklearn.impute import SimpleImputer

# Load the training dataset
df = pd.read_csv('C:\\Users\\MSI\\OneDrive\\Desktop\\SDGP\\exp1_14drivers_14cars_dailyRoutes.csv.zip', low_memory=False)

# Preprocess the training data by labeling instances with ENGINE_COOLANT_TEMP > 90 as having a cooling system issue
df['Cooling_System_Issue'] = (df['ENGINE_COOLANT_TEMP'] > 90).astype(int)

# Define features and label
X = df[['ENGINE_COOLANT_TEMP']]
y = df['Cooling_System_Issue']

# Split data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Impute missing values in the feature data
imputer = SimpleImputer(strategy='median')
X_train_imputed = imputer.fit_transform(X_train)
X_test_imputed = imputer.transform(X_test)

# Scale features to have mean=0 and variance=1
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train_imputed)
X_test_scaled = scaler.transform(X_test_imputed)

# Train a logistic regression model
model = LogisticRegression()
model.fit(X_train_scaled, y_train)

# Evaluate the model on the test set
y_pred = model.predict(X_test_scaled)
accuracy = accuracy_score(y_test, y_pred)
report = classification_report(y_test, y_pred)
print(f'Accuracy: {accuracy}\n{report}')

# Load new data for prediction
live_data = pd.read_csv(r'C:\Users\MSI\OneDrive\Desktop\SDGP\10.35097-1130\10.35097-1130\data\dataset\OBD-II-Dataset\OBD-II-Dataset\2017-07-06_Seat_Leon_KA_RT_Normal.csv')

# Rename column to match training data
live_data.rename(columns={'Engine Coolant Temperature ': 'ENGINE_COOLANT_TEMP'}, inplace=True)

# Impute and scale the live data
live_data_imputed = imputer.transform(live_data[['ENGINE_COOLANT_TEMP']])
live_data_scaled = scaler.transform(live_data_imputed)

# Predict probabilities for the live data
live_probabilities = model.predict_proba(live_data_scaled)

# Add the probability of having a cooling system issue to the DataFrame
# Add the probability of having a cooling system issue to the DataFrame, converting to percentage
live_data['Probability_Cooling_System_Issue'] = live_probabilities[:, 1] * 100  # Multiply by 100 to convert to percentage

# Calculate the average probability of having a cooling system issue, in percentage
average_probability_issue = live_data['Probability_Cooling_System_Issue'].mean()
print(f'Average probability of a cooling system issue for the car: {average_probability_issue:.2f}%')

# Display ENGINE_COOLANT_TEMP and Probability_Cooling_System_Issue for the first few rows, with probability shown as percentage


# Calculate and print the number of instances with a high probability of having a cooling system issue, using percentage
# Here, we consider a high probability as greater than 50% (since we've converted probabilities to percentages)
num_high_risk_issues = (live_data['Probability_Cooling_System_Issue'] > 50).sum()
print(f'Number of instances with high probability of cooling system issue: {num_high_risk_issues}')
