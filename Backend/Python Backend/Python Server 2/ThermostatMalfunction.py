import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier

#loading dataset 
data = pd.read_csv('data.csv')

#define the input variabrls and targets 
features = data.drop(columns=['COOLANT_TEMPERATURE ()']) 
target = ((data['COOLANT_TEMPERATURE ()'] < 185) | (data['COOLANT_TEMPERATURE ()'] > 205)).astype(int) 


# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(features, target, test_size=0.2, random_state=42)

# Initializing and training  Random Forest classifier
clf = RandomForestClassifier(n_estimators=100, random_state=42)
clf.fit(X_train, y_train)

# Predict coolant temperature malfunction using the trained classifier
y_pred = clf.predict(X_test)

# Check if there is a malfunction in the data
malfunction_present = any(y_pred)
if malfunction_present:
    print("Thermostat malfunction detected.")
    else:
        print("No thermostat malfunction detected.")