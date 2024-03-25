package com.autoInsightProDatabase.autoInsightProServer.Controller;

import com.autoInsightProDatabase.autoInsightProServer.model.VehicleSave;
import com.autoInsightProDatabase.autoInsightProServer.model.VehicleSaveDAO;
import com.autoInsightProDatabase.autoInsightProServer.model.VehicleSaveRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.config.ConfigDataResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class VehicleSaveController {

    @Autowired
    private VehicleSaveDAO vehicleSaveDAO;

    @GetMapping("/vehicle/get-vehicles")
    public List<VehicleSave> getAllVehicles(){
        return vehicleSaveDAO.getAllVehicles();
    }


  /*  @DeleteMapping("/vehicle/{vehicleNum}")
    public ResponseEntity<HttpStatus> deleteVehicle(@PathVariable String vehicleNum) {
        VehicleSave vehicleSave = vehicleSaveDAO.getByVehicleNum(vehicleNum)
                .orElseThrow(() -> new ResourceNotFoundException("Vehicle not found with number: " + vehicleNum));

        vehicleSaveDAO.delete(vehicleSave);
        return ResponseEntity.noContent().build();
    }*/





    @PostMapping("/vehicle-save")
    public ResponseEntity<List<String>> saveVehicle(@RequestBody VehicleSave vehicleSave) {
        // Check if the vehicle number already exists
        if (vehicleSaveDAO.existsByVehicleNum(vehicleSave.getVehicleNum())) {
            // If the vehicle number already exists, return a response with an error message
            String errorMessage = "Vehicle with number " + vehicleSave.getVehicleNum() + " already exists";
            List<String> errorMessages = new ArrayList<>();
            errorMessages.add(errorMessage);
            return ResponseEntity.status(HttpStatus.CONFLICT).body(errorMessages);
        }

        // If the vehicle number doesn't exist, proceed with saving the vehicle
        // Log the received data
        System.out.println(vehicleSave.toString());

        // Save the received vehicle data using your DAO/repository
        vehicleSaveDAO.saveD(vehicleSave);

        // Create a success message with the received vehicle data
        String successMessage = "Vehicle data received successfully:\n" + vehicleSave.toString();

        // Create a list of strings containing the success message
        List<String> responseMessages = new ArrayList<>();
        responseMessages.add(successMessage);

        // Return a ResponseEntity with the list of success messages and HTTP status OK
        return ResponseEntity.ok(responseMessages);
    }

}
