package com.autoInsightProDatabase.autoInsightProServer.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.util.List;

@Entity
public class InputData {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String vehicleNum;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getVehicleNum() {
        return vehicleNum;
    }

    public void setVehicleNum(String vehicleNum) {
        this.vehicleNum = vehicleNum;
    }

    @Override
    public String toString() {
        return "InputData{" +
                "id=" + id +
                ", vehicleNum=" + vehicleNum +
                '}';
    }
}
