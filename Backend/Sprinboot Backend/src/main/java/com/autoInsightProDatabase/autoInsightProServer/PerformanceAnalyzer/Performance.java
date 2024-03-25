package com.autoInsightProDatabase.autoInsightProServer.PerformanceAnalyzer;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Performance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int pID;

    private int highestSpeed;
    private int highestRPM;
    private int highestCoolTemp;
    private int highestThrottle;

    public int getpID() {
        return pID;
    }

    public void setpID(int pID) {
        this.pID = pID;
    }

    public int getHighestSpeed() {
        return highestSpeed;
    }

    public void setHighestSpeed(int highestSpeed) {
        this.highestSpeed = highestSpeed;
    }

    public int getHighestRPM() {
        return highestRPM;
    }

    public void setHighestRPM(int highestRPM) {
        this.highestRPM = highestRPM;
    }

    public int getHighestCoolTemp() {
        return highestCoolTemp;
    }

    public void setHighestCoolTemp(int highestCoolTemp) {
        this.highestCoolTemp = highestCoolTemp;
    }

    public int getHighestThrottle() {
        return highestThrottle;
    }

    public void setHighestThrottle(int highestThrottle) {
        this.highestThrottle = highestThrottle;
    }

    @Override
    public String toString() {
        return "Performance{" +
                "pID=" + pID +
                ", highestSpeed=" + highestSpeed +
                ", highestRPM=" + highestRPM +
                ", highestCoolTemp=" + highestCoolTemp +
                ", highestThrottle=" + highestThrottle +
                '}';
    }
}
