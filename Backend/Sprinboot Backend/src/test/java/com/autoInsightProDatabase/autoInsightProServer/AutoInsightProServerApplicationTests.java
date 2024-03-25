package com.autoInsightProDatabase.autoInsightProServer;

import com.autoInsightProDatabase.autoInsightProServer.InputDataset.InputDataset;
import com.autoInsightProDatabase.autoInsightProServer.InputDataset.LoadDataset;
import com.autoInsightProDatabase.autoInsightProServer.PerformanceAnalyzer.Performance;
import com.autoInsightProDatabase.autoInsightProServer.PerformanceAnalyzer.PerformanceDAO;
import com.autoInsightProDatabase.autoInsightProServer.model.InputData;
import com.autoInsightProDatabase.autoInsightProServer.model.InputDataDAO;
import com.autoInsightProDatabase.autoInsightProServer.model.InputDataRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.io.IOException;

@SpringBootTest
class AutoInsightProServerApplicationTests {

	@Autowired
	private InputDataDAO inputDataDAO;

	@Autowired
	private PerformanceDAO performanceDAO;

//	@Test
	void addDataTest() {
		InputData vehicle = new InputData();
		vehicle.setVehicleNum("KG 5504");
		inputDataDAO.save(vehicle);
	}

//	@Test
	void addDataTestPA() {
		Performance performance = new Performance();
		performance.setHighestSpeed(50);
		performance.setHighestRPM(60);
		performance.setHighestCoolTemp(10);
		performance.setHighestThrottle(20);

		performanceDAO.savePA(performance);
	}

//	@Test
//	void testDataInput() throws IOException {
//		LoadDataset dataset = new LoadDataset();
//	}

}
