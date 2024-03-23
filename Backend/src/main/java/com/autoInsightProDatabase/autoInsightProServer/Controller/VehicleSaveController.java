package com.autoInsightProDatabase.autoInsightProServer.Controller;

import com.autoInsightProDatabase.autoInsightProServer.model.VehicleSave;
import com.autoInsightProDatabase.autoInsightProServer.model.VehicleSaveDAO;
import com.autoInsightProDatabase.autoInsightProServer.model.VehicleSaveRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.config.ConfigDataResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;



import java.util.ArrayList;
import java.util.List;

@RestController
public class VehicleSaveController {

    @Autowired
    private VehicleSaveDAO vehicleSaveDAO;
    @Autowired
   private VehicleSaveRepository vehicleSaveRepository;
    private int vehicleID;

    @GetMapping("/vehicle/get-vehicles")
    public List<VehicleSave> getAllVehicles(){
        return vehicleSaveDAO.getAllVehicles();
    }


    /*@DeleteMapping("/vehicle/delete/{id}")
    public ResponseEntity<String> deleteVehicle(@PathVariable("id") int vehicleID) {
        // Check if the vehicle exists by ID
        if (!vehicleSaveRepository.existsById(vehicleID))  {
            // If the vehicle doesn't exist, return a response with a not found error message
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Vehicle with ID " + vehicleID + " not found");
        }

        // If the vehicle exists, proceed with deleting it
       vehicleSaveRepository.deleteById(vehicleID);

        // Return a success response
        return ResponseEntity.ok("Vehicle with ID " + vehicleID + " deleted successfully");
    }*/

    @DeleteMapping("/vehicle/delete/{vehicleNum}")
    public ResponseEntity<String> deleteVehicle(@PathVariable("vehicleNum") String vehicleNum) {
        // Check if the vehicle exists by vehicle number
        if (!vehicleSaveRepository.existsByVehicleNum(vehicleNum)) {
            // If the vehicle doesn't exist, return a response with a not found error message
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Vehicle with number " + vehicleNum + " not found");
        }

        // If the vehicle exists, proceed with deleting it
        vehicleSaveRepository.deleteByVehicleNum(vehicleNum);

        // Return a success response
        return ResponseEntity.ok("Vehicle with number " + vehicleNum + " deleted successfully");
    }



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
