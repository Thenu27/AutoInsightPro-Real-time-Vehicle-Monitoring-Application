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

    private int oilFilter;
    private int dustPollenFilter;
    private int airFilter;
    private int fuelFilter;
    private int sparkPlug;
    private int brakePad;
    private int clutch;
    private int engineOil;
    private int washerPlugDrain;
    private int brakeFluid;
    private int transmissionFluid;
    private int coolant;
    private int wheelAlignment;

    private ArrayList<String> serviceItemNames = new ArrayList<>();

    @Autowired
    private InputDataDAO inputDataDAO;

    private  ArrayList<Integer> predictionArray = new ArrayList<>();

    private  ArrayList<String> nextServiceNeedItems = new ArrayList<>();
    private int [] maintenanceArray2;

    public void createServiceItemList(){
        serviceItemNames.add("Changing Oil filter");
        serviceItemNames.add("Changing Dust and pollen filter");
        serviceItemNames.add("Replacing Air clean filter");
        serviceItemNames.add("Changing Fuel filter");
        serviceItemNames.add("Replacing Spark plugs");
        serviceItemNames.add("Replacing Brake pads");
        serviceItemNames.add("Replacing Clutch");
        serviceItemNames.add("Replacing Engine oil");
        serviceItemNames.add("Replacing Washer plug drain");
        serviceItemNames.add("Changing Brake fluid");
        serviceItemNames.add("Replacing Brake and clutch oil");
        serviceItemNames.add("Changing Transmission fluid");
        serviceItemNames.add("Changing Coolants");
        serviceItemNames.add("Performing Wheel alignment");
    }

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
        System.out.println("CM "+currentMileage);
        System.out.println("LS "+servicedMileage);
        return "Current mileage updated";
    }

    @PostMapping("/vehicle/maintenance-details")
    public String receiveMaintenanceData(@RequestBody int[] maintenanceArray) {
        System.out.println(Arrays.toString(maintenanceArray));
        createServiceItemList();

        maintenanceArray2 = maintenanceArray;
        System.out.println(maintenanceArray2.length);
//        for(int i: maintenanceArray2){
//            System.out.print(i);
//        }
        oilFilter = maintenanceArray2[0];
        dustPollenFilter = maintenanceArray2[1];
        airFilter = maintenanceArray2[2];
        fuelFilter = maintenanceArray2[3];
        sparkPlug = maintenanceArray2[4];
        brakePad = maintenanceArray2[5];
        clutch = maintenanceArray2[6];
        engineOil = maintenanceArray2[7];
        washerPlugDrain = maintenanceArray2[8];
        brakeFluid = maintenanceArray2[9];
//        int brakeClutchOil = maintenanceArray2[10];
        transmissionFluid = maintenanceArray2[11];
        coolant = maintenanceArray2[12];
        wheelAlignment = maintenanceArray2[13];

//        System.out.println(wheelAlignment);

        predictFromFlask();

        return "Data received successfully!";


    }

    @GetMapping("/receiveDataPython")
    public String receiveFromPython(@RequestBody List<Integer> predictionArray){
        System.out.println("Receive data:" + predictionArray);

        return "Data received from Python successfully";
    }

    @PostMapping("/predict-from-flask")
    public String predictFromFlask() {
        predictionArray.clear();
        String predictEndpoint = "http://127.0.0.1:5000/predict";

        // Create request body with current mileage and mileage range
        Map<String, Integer> requestBody = new HashMap<>();
        int mileageRange = currentMileage - servicedMileage;
        requestBody.put("currentMileage", currentMileage);
        requestBody.put("mileageRange", mileageRange);

        // Set headers for the request
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        // Create request entity with body and headers
        HttpEntity<Map<String, Integer>> requestEntity = new HttpEntity<>(requestBody, headers);

        // Send POST request to the Flask server
        ResponseEntity<String> responseEntity = new RestTemplate().postForEntity(predictEndpoint, requestEntity, String.class);
        System.out.println("ok");
        String responseBody = responseEntity.getBody();
        if (responseEntity.getStatusCode().is2xxSuccessful()) {
            JSONArray outerArray = new JSONArray(responseBody);
            JSONArray innerArray = outerArray.getJSONArray(0);
            for (int i = 0; i < innerArray.length(); i++) {
                int value = innerArray.getInt(i);
                if (value == 1 || value == 0) {
                    predictionArray.add(value);
                }
            }
            predictionArray.add(10,2);
            System.out.println(predictionArray);
            nextServiceItems();
            return "Prediction from Flask: " + responseEntity.getBody();
        } else {
            System.out.println("Failed to get prediction from flask");
            return "Failed to get prediction from Flask";
        }
    }


    public void nextServiceItems(){
        System.out.println("nextServiceItems is working");
        ArrayList<Integer> nextItems = new ArrayList<>();
        nextServiceNeedItems.clear();

        int count = 0;

        for (int prediction : predictionArray) {
            count++;
            if (prediction == 1 && maintenanceArray2[count - 1] != prediction) {
                nextItems.add(count);
            }
        }
        for (int index : nextItems) {
            System.out.println(serviceItemNames.get(index - 1));
            nextServiceNeedItems.add(serviceItemNames.get(index - 1));
        }
    }

    @PostMapping("/vehicle/next-service-items")
    public List<String> getNextServiceItems() {
        return nextServiceNeedItems;
    }


}
