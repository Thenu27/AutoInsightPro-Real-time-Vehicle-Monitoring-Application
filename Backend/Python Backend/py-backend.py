import os
import joblib
import pandas as pd
import numpy as np
import pickle
import requests
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)

CORS(app)

@app.route('/')
# @app.route('/index')
@app.route('/sendData')
def index():
    return 'You should go to /predict'


@app.route('/predict', methods=['POST'])
def post():
    with open('MSmodel.pkl','rb') as file:
        loaded_model = pickle.load(file)

    le1 = joblib.load('le1.joblib')
    sc = joblib.load('sc.joblib')
    loaded_model = joblib.load('multi_output_model.joblib')

    data = request.json
    print("ok")
    print("Received data:", data)
    current_mileage = data['currentMileage']
    mileage_range = data['mileageRange']
    fuel_type = data['fuelType'] 

    engine_type = 'diesel' if fuel_type == 1 else 'petrol'

    # engine_type = 'diesel'  
    # mileage_range = 30000 
    # mileage = 5000

    engine_type_encoded = le1.transform([engine_type])[0]
    features_to_scale = [[engine_type_encoded, mileage_range, current_mileage]]
    scaled_features = sc.transform(features_to_scale)

    prediction = loaded_model.predict(scaled_features)

    # prediction = loaded_model.predict([[engine_type_encoded, mileage_range, current_mileage]])

    return jsonify(prediction.tolist())

    # data_send = prediction.tolist() 

    # url = "http://localhost:8080/receiveDataPython"

    # response = requests.post(url, json=data_send)

    # print(response.text)

    @app.route('/predictFuel', methods=['POST'])
    def predictFuel():
        modelFuel = joblib.load('FuelEfficiencyModel.joblib')
        # Extract data from the request
        data = request.json
        cylinders = float(data.get('cylinders'))
        vehicle_type = data.get('type')
        displacement = float(data.get('displacement'))

        if vehicle_type == "SUV":
            vehicle_type_value = 3500
        elif vehicle_type == "Sedan":
            vehicle_type_value = 3000
        elif vehicle_type == "Hatchback":
            vehicle_type_value = 2570
        elif vehicle_type == "Pickup":
            vehicle_type_value = 5000
        elif vehicle_type == "Van":
            vehicle_type_value = 4500
        else:
            # Default value if vehicle type is not recognized
            vehicle_type_value = 2570

        # Use the extracted data as input for prediction
        input_data = [cylinders, vehicle_type_value, displacement, 10]

        # Make predictions using the loaded model
        predictionFuel = modelFuel.predict([input_data])
        print(predictionFuel)
        # Return the prediction as a JSON response

        return jsonify({'prediction': predictionFuel.tolist()})


if __name__ == '__main__':
    app.debug = True

    print("Current working dir : %s" % os.getcwd())

    app.run(port=5000)