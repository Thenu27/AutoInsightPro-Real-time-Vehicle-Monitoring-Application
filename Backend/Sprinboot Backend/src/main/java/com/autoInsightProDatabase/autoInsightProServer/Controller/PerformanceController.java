package com.autoInsightProDatabase.autoInsightProServer.Controller;

import com.autoInsightProDatabase.autoInsightProServer.PerformanceAnalyzer.Performance;
import com.autoInsightProDatabase.autoInsightProServer.PerformanceAnalyzer.PerformanceDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PerformanceController {

    @Autowired
    private PerformanceDAO performanceDAO;

    @GetMapping("/lastPerformance")
    public Performance getLastPerformance() {
        int highestRPM = performanceDAO.getLastPerformance1();
        int highestSpeed = performanceDAO.getLastPerformance2();
        int highestCoolTemp = performanceDAO.getLastPerformance3();

        // Create a response object to hold the last performance data
        Performance response = new Performance();
        response.setHighestRPM(highestRPM);
        response.setHighestSpeed(highestSpeed);
        response.setHighestCoolTemp(highestCoolTemp);

        return response;
    }
}
