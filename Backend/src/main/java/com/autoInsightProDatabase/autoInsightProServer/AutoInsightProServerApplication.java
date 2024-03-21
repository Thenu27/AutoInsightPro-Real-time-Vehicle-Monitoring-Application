package com.autoInsightProDatabase.autoInsightProServer;

import com.autoInsightProDatabase.autoInsightProServer.InputDataset.LoadDataset;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.IOException;

@SpringBootApplication(scanBasePackages = "com.autoInsightProDatabase.autoInsightProServer" )
public class AutoInsightProServerApplication {

	public static void main(String[] args) {

		SpringApplication.run(AutoInsightProServerApplication.class, args);

        LoadDataset loader = new LoadDataset();
        // If LoadDataset constructor prints the loaded data,
        // you should see the output here.
        System.out.println("CSV Data loaded successfully.");
    }

}
