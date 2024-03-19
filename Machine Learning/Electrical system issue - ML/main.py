import pandas as pd
from sklearn.ensemble import RandomForestRegressor

# Loading the first dataset
data1 = pd.read_csv("live1.csv")
# Loading the second dataset
data2 = pd.read_csv("drive1.csv")


# Training a machine learning model using data1
X = data1.drop("CONTROL_MODULE_VOLTAGE ()", axis=1)
y = data1["CONTROL_MODULE_VOLTAGE ()"]
model = RandomForestRegressor()
model.fit(X, y)

# Using the trained model to predict CONTROL_MODULE_VOLTAGE for data2
data2_predictions = model.predict(data2.drop("CONTROL_MODULE_VOLTAGE ()", axis=1))

# Identifying instances where the predicted voltage is above 15 or below 10
issues_indices = (data2_predictions > 15) | (data2_predictions < 10)
issues_instances = data2[issues_indices]

# Counting instances where CONTROL_MODULE_VOLTAGE is above 15 and below 10 in data2
count_issues = len(issues_instances)

print(count_issues," instances of abnormal CONTROL_MODULE_VOLTAGE values")
if count_issues>1000:
    print("There is a potential for a electrical system fault ")

else:
    print(" ")


