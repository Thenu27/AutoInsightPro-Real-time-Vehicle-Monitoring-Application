package com.autoInsightProDatabase.autoInsightProServer.Controller;

import com.autoInsightProDatabase.autoInsightProServer.model.InputData;
import com.autoInsightProDatabase.autoInsightProServer.model.InputDataDAO;
import com.autoInsightProDatabase.autoInsightProServer.model.VehicleSave;
import com.autoInsightProDatabase.autoInsightProServer.model.VehicleSaveDAO;
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

//    private int fuelType;

    private ArrayList<String> serviceItemNames = new ArrayList<>();

    @Autowired
    private InputDataDAO inputDataDAO;

    @Autowired
    private VehicleSaveDAO vehicleSaveDAO;

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

        int fuelType;
        try {
            fuelType = FuelType();
        } catch (NoSuchElementException e) {
            System.out.println(e.getMessage());
            return "Failed to get fuel type from the database";
        }

        System.out.println(fuelType);

        Map<String, Integer> requestBody = new HashMap<>();
        int mileageRange = currentMileage - servicedMileage;
        requestBody.put("currentMileage", currentMileage);
        requestBody.put("mileageRange", mileageRange);
        requestBody.put("fuelType", fuelType);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, Integer>> requestEntity = new HttpEntity<>(requestBody, headers);

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

    public int FuelType() throws NoSuchElementException{
//        int fuelType;
        String lastVehicle = vehicleSaveDAO.getLastVehicle();
        if (lastVehicle != null) {
//            String fuel = lastVehicle.getFuel();
            if("Diesel".equals(lastVehicle)){
                return 1;
            }else{
                return 0;
            }
//            return fuelType;
        }
        throw new NoSuchElementException("No vehicles in the database!");
    }

    @PostMapping("/Fuel-prediction")
    public String fuelPrediction() {
        predictionArray.clear();
//        String predictEndpoint = "http://127.0.0.1:5004/predict";

        int cylinderNum;
        String vehicleType;

        try {
            cylinderNum = vehicleSaveDAO.getLastVehicle2();
            vehicleType = vehicleSaveDAO.getLastVehicle3();
        } catch (NoSuchElementException e) {
            System.out.println(e.getMessage());
            return "Failed to get vehicle information from the database";
        }

        System.out.println("Cylinder Number: " + cylinderNum);
        System.out.println("Vehicle Type: " + vehicleType);


        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("cylinderNum", cylinderNum);
        requestBody.put("vehicleType", vehicleType);


        return "Fuel prediction successful "+cylinderNum+" "+vehicleType;
    }



}
