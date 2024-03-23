package com.autoInsightProDatabase.autoInsightProServer.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class VehicleSave {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int vehicleID;

    private String vehicleNum;
    private int engineCapacity;
    private String fuel;
    private String type;
    private int cylinderNum;
    private int year;

    public int getVehicleID() {
        return vehicleID;
    }

    public void setVehicleID(int vehicleID) {
        this.vehicleID = vehicleID;
    }

    public String getVehicleNum() {
        return vehicleNum;
    }

    public void setVehicleNum(String vehicleNum) {
        this.vehicleNum = vehicleNum;
    }

    public int getEngineCapacity() {
        return engineCapacity;
    }

    public void setEngineCapacity(int engineCapacity) {
        this.engineCapacity = engineCapacity;
    }

    public String getFuel() {
        return fuel;
    }

    public void setFuel(String fuel) {
        this.fuel = fuel;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public int getCylinderNum() {
        return cylinderNum;
    }

    public void setCylinderNum(int cylinderNum) {
        this.cylinderNum = cylinderNum;
    }

    @Override
    public String toString() {
        return "VehicleSave{" +
                "vehicleID=" + vehicleID +
                ", vehicleNum='" + vehicleNum + '\'' +
                ", engineCapacity=" + engineCapacity +
                ", fuel=" + fuel +
                ", type='" + type + '\'' +
                ", cylinderNum="+ cylinderNum+
                ", year=" + year +
                '}';
    }
}
