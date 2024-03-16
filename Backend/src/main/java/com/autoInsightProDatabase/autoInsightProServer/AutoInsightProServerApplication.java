package com.autoInsightProDatabase.autoInsightProServer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "com.autoInsightProDatabase.autoInsightProServer" )
public class AutoInsightProServerApplication {

	public static void main(String[] args) {

		SpringApplication.run(AutoInsightProServerApplication.class, args);
	}

}
