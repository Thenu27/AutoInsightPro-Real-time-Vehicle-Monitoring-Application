package com.autoInsightProDatabase.autoInsightProServer.PerformanceAnalyzer;

import com.autoInsightProDatabase.autoInsightProServer.model.VehicleSave;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PerformanceDAO {


    @Autowired
    private PerformanceRepository performanceRepository;

    public void savePA(Performance performance){
        performanceRepository.save(performance);
    }

    public int getLastPerformance1(){
        List<Performance> lastPerformance = (List<Performance>) performanceRepository.findAll();
        if (!lastPerformance.isEmpty()) {
            Performance lastVehicle = lastPerformance.get(lastPerformance.size() - 1);
            return lastVehicle.getHighestRPM();
        } else {
            return 0;
        }
    }
    public int getLastPerformance2(){
        List<Performance> lastPerformance = (List<Performance>) performanceRepository.findAll();
        if (!lastPerformance.isEmpty()) {
            Performance lastVehicle = lastPerformance.get(lastPerformance.size() - 1);
            return lastVehicle.getHighestSpeed();
        } else {
            return 0;
        }
    }

    public int getLastPerformance3(){
        List<Performance> lastPerformance = (List<Performance>) performanceRepository.findAll();
        if (!lastPerformance.isEmpty()) {
            Performance lastVehicle = lastPerformance.get(lastPerformance.size() - 1);
            return lastVehicle.getHighestCoolTemp();
        } else {
            return 0;
        }
    }
}
