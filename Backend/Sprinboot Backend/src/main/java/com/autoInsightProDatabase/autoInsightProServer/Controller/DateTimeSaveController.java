package com.autoInsightProDatabase.autoInsightProServer.Controller;

import com.autoInsightProDatabase.autoInsightProServer.model.DateTimeSave;
import com.autoInsightProDatabase.autoInsightProServer.model.DateTimeSaveDAO;
import com.autoInsightProDatabase.autoInsightProServer.model.VehicleSave;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class DateTimeSaveController {

    @Autowired
    private DateTimeSaveDAO dateTimeSaveDAO;

    private int ExpiryI;

    @GetMapping("/dateTime/get-dates")
    public List<DateTimeSave> getAllDateTime(){
        return dateTimeSaveDAO.getAllDateTime();
    }
    @PostMapping("/dateTime-save")
    public ResponseEntity<List<String>> saveDateTime(@RequestBody DateTimeSave dateTimeSave) {
        // Implement  logic to save the received vehicle data
System.out.println(dateTimeSave.toString());// Log the received data

        // Save the received vehicle data using your DAO/repository
        dateTimeSaveDAO.saveDate(dateTimeSave);

        // Create a success message with the received vehicle data
        String successMessage="Expiration dates received successfully:\n "+dateTimeSave.toString();

        // Create a list of strings containing the success message
        List<String>responseMessages=new ArrayList<>();
        responseMessages.add(successMessage);

        // Return a ResponseEntity with the list of success messages and HTTP status OK
        return ResponseEntity.ok(responseMessages);
    }



}
