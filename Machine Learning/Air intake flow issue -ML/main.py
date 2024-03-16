import pandas as pd

# Load the dataset
file_path = r'C:\Users\MSI\OneDrive\Desktop\SDGP\2017-07-05_Seat_Leon_S_KA_Normal.csv'  # Update this path for your environment
data = pd.read_csv(file_path)

# Assuming 'Absolute Throttle Position [%]' is the relevant column for TPS
tps_data = data['Absolute Throttle Position [%]'].dropna()  # Remove rows where TPS data is missing

# Calculate IQR
Q1 = tps_data.quantile(0.25)
Q3 = tps_data.quantile(0.75)
IQR = Q3 - Q1

# Determine bounds for outliers
lower_bound = Q1 - 1.5 * IQR
upper_bound = Q3 + 1.5 * IQR

# Identify anomalies
anomalies = tps_data[(tps_data < lower_bound) | (tps_data > upper_bound)]

# Check if there are any potential TPS faults
if anomalies.empty:
    print("No potential TPS faults detected in the car.")
else:
    print(f"Potential TPS fault detected. Number of suspicious readings: {anomalies.count()}")
    print("It is recommended to check the Throttle Position Sensor.")
