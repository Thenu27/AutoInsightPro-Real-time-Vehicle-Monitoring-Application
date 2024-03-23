import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report

# --- Training the model with the initial dataset ---
# Loading the initial dataset
initial_data_path = "2017-07-05_Seat_Leon_S_KA_Normal.csv"
initial_data = pd.read_csv(initial_data_path)

# Preprocessing  the initial dataset
initial_data['Issue'] = (initial_data['COOLANT_TEMPERATURE ()'] > 90).astype(int)

# Defining features and target variable for the initial dataset
X_initial = initial_data[['COOLANT_TEMPERATURE ()']]  # Feature: Coolant Temperature
y_initial = initial_data['Issue']  # Target: Potential issue in the cooling system

# Spliting the initial dataset into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X_initial, y_initial, test_size=0.2, random_state=42)

# Initializing and training the Logistic Regression model
model = LogisticRegression()
model.fit(X_train, y_train)

# Evaluating the model on the test set of the initial dataset
predictions_initial = model.predict(X_test)
#print(classification_report(y_test, predictions_initial))

# --- Predicting with a new dataset using the trained model ---
# Loading the new dataset
new_data_path = "drive1.csv"  # Update this path
new_data = pd.read_csv(new_data_path)

# Making predictions on the new dataset
if 'COOLANT_TEMPERATURE ()' in new_data.columns:
    Coolant_issue= model.predict(new_data[['COOLANT_TEMPERATURE ()']])
    # Mapping predictions to descriptive messages
    new_data['Coolant Issue'] = Coolant_issue
    new_data['Coolant Issue Message'] = new_data['Coolant Issue'].map({0: 'No coolant issue detected.', 1: 'Potential coolant issue detected!'})

    # Counting the number of rows with potential coolant issues
    issue_count = new_data['Coolant Issue'].sum()
    if (issue_count>1000):
      print(f"Number of instances  coolant issues arises: {issue_count}")
      print(("Cooling system issue is predicted to occur"))

    else:
        print("Cooling system operating Normally")
else:
    print("The required column 'COOLANT_TEMPERATURE ()' is not in the new dataset.")