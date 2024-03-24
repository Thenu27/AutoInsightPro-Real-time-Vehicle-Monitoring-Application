package com.autoInsightProDatabase.autoInsightProServer.model;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Streamable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class InputDataDAO {

    @Autowired
    private InputDataRepository repository;

    public void save(InputData vehicleNum){
        repository.save(vehicleNum);
    }

    public List<InputData> getAllVehicles(){
        List<InputData> vehicles = new ArrayList<>();
        Streamable.of(repository.findAll()).forEach(vehicles::add);
        return vehicles; 
    }

}
