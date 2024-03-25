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


# @app.route('/predict', methods=['POST'])
# def post():
#     with open('MSmodel.pkl','rb') as file:
#         loaded_model = pickle.load(file)

#     le1 = joblib.load('le1.joblib')
#     sc = joblib.load('sc.joblib')
#     loaded_model = joblib.load('multi_output_model.joblib')

#     engine_type = 'diesel'  
#     mileage_range = 30000 
#     mileage = 5000

#     engine_type_encoded = le1.transform([engine_type])[0]
#     features_to_scale = [[engine_type_encoded, mileage_range, mileage]]
#     scaled_features = sc.transform(features_to_scale)

#     prediction = loaded_model.predict(scaled_features)

#     return jsonify(prediction.tolist())

#     # data_send = prediction.tolist() 

#     # url = "http://localhost:8080/receiveDataPython"

#     # response = requests.post(url, json=data_send)

#     # print(response.text)


if _name_ == '_main_':
    app.debug = True

    print("Current working dir : %s" % os.getcwd())

    app.run(port=5000)

