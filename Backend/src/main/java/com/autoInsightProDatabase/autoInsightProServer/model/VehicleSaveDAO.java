package com.autoInsightProDatabase.autoInsightProServer.model;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Streamable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class VehicleSaveDAO {

    @Autowired
    private VehicleSaveRepository repository;

    public void saveD(VehicleSave vehicle) {
        repository.save(vehicle);
    }

    public List<VehicleSave> getAllVehicles() {
        List<VehicleSave> vehicles = new ArrayList<>();
        repository.findAll().forEach(vehicles::add);
        return vehicles;
    }

    public boolean existsByVehicleNum(String vehicleNum) {
        return repository.existsByVehicleNum(vehicleNum);
    }

    //public boolean existsById(int vehicleID) {
    //    return repository.existsById(vehicleID);
    //}



    public String getLastVehicle() {
        List<VehicleSave> vehicles = (List<VehicleSave>) repository.findAll();
        if (!vehicles.isEmpty()) {
            VehicleSave lastVehicle = vehicles.get(vehicles.size() - 1);
            return lastVehicle.getFuel();
        } else {
            return null;
        }

    }

    public int getLastVehicle2() {
        List<VehicleSave> vehicles = (List<VehicleSave>) repository.findAll();
        if (!vehicles.isEmpty()) {
            VehicleSave lastVehicle = vehicles.get(vehicles.size() - 1);
            return lastVehicle.getCylinderNum();
        } else {
            return 0;
        }

    }


}