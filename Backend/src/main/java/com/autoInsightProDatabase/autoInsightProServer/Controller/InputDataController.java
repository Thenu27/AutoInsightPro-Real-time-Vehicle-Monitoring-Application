package com.autoInsightProDatabase.autoInsightProServer.Controller;

import com.autoInsightProDatabase.autoInsightProServer.model.InputData;
import com.autoInsightProDatabase.autoInsightProServer.model.InputDataDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

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
}
