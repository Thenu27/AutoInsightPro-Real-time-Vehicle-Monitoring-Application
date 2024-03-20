package com.autoInsightProDatabase.autoInsightProServer.Controller;

import com.autoInsightProDatabase.autoInsightProServer.model.InputData;
import com.autoInsightProDatabase.autoInsightProServer.model.InputDataDAO;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.json.JSONArray;
import org.json.JSONException;


import java.util.*;

@RestController
public class InputDataController {
    int currentMileage;
    int servicedMileage;

    @Autowired
    private InputDataDAO inputDataDAO;

    @GetMapping("/vehicle/get-all")
    public List<InputData> getAllVehicles(){
        return inputDataDAO.getAllVehicles();
    }
    @PostMapping("/vehicle/save-vehicleNum")
    public void save(@RequestBody InputData vehicle){
        inputDataDAO.save(vehicle);
    }

    @PostMapping("/vehicle/current-Mileage")
    public String MileageList(@RequestBody int[] mileage){
        System.out.println(Arrays.toString(mileage));
        currentMileage = mileage[0];
        servicedMileage = mileage[1];
        System.out.println(currentMileage);
        System.out.println(servicedMileage);
        return "Current mileage updated";
    }

    @PostMapping("/vehicle/maintenance-details")
    public String receiveMaintenanceData(@RequestBody int[] maintenanceArray) {
        System.out.println(Arrays.toString(maintenanceArray));

        int oilFilter = maintenanceArray[0];
        int dustPollenFilter = maintenanceArray[1];
        int airFilter = maintenanceArray[2];
        int fuelFilter = maintenanceArray[3];
        int sparkPlug = maintenanceArray[4];
        int brakePad = maintenanceArray[5];
        int clutch = maintenanceArray[6];
        int engineOil = maintenanceArray[7];
        int washerPlugDrain = maintenanceArray[8];
        int brakeFluid = maintenanceArray[9];
        int brakeClutchOil = maintenanceArray[10];
        int transmissionFluid = maintenanceArray[11];
        int coolant = maintenanceArray[12];
        int wheelAlignment = maintenanceArray[13];

//     predictFromFlask();

        predictFromFlask();

        return "Data received successfully!";



//        'Changing Oil filter',
//        'Changing Dust and pollen filter',
//        'Replacing Air clean filter',
//        'Changing Fuel filter',
//        'Replacing Spark plugs',
//        'Replacing Brake pads',
//        'Replacing Clutch',
//        'Replacing Engine oil',
//        'Replacing Washer plug drain',
//        'Changing Brake fluid',
//        'Replacing Brake and clutch oil',
//        'Changing Transmission fluid',
//        'Changing Coolants',
//        'Performing Wheel alignment'
    }

    @GetMapping("/receiveDataPython")
    public String receiveFromPython(@RequestBody List<Integer> predictionArray){
        System.out.println("Receive data:" + predictionArray);

        return "Data received from Python successfully";
    }

    @PostMapping("/predict-from-flask")
    public String predictFromFlask() {
        // Convert the request body to the required format
        String predictEndpoint = "http://127.0.0.1:5000/predict";

        ResponseEntity<String> responseEntity = new RestTemplate().postForEntity(predictEndpoint, null, String.class);
        System.out.println("ok");
        String responseBody = responseEntity.getBody();
        if (responseEntity.getStatusCode().is2xxSuccessful()) {
            JSONArray outerArray = new JSONArray(responseBody); //This is ised here to convert a String Json sentence into readable format
            JSONArray innerArray = outerArray.getJSONArray(0);
            ArrayList<Integer> predictionArray = new ArrayList<>();
            for (int i = 0; i < innerArray.length(); i++) {
                int value = innerArray.getInt(i);
                if (value == 1 || value == 0) {
                    predictionArray.add(value);
                }
            }
            System.out.println(predictionArray);
//            System.out.println("Prediction from Flask: " + responseEntity.getBody());
            return "Prediction from Flask: " + responseEntity.getBody();
        } else {
            System.out.println("Failed to get prediction from flask");
            return "Failed to get prediction from Flask";
        }
    }




}
