package com.autoInsightProDatabase.autoInsightProServer;

import com.autoInsightProDatabase.autoInsightProServer.model.InputData;
import com.autoInsightProDatabase.autoInsightProServer.model.InputDataDAO;
import com.autoInsightProDatabase.autoInsightProServer.model.InputDataRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class AutoInsightProServerApplicationTests {

	@Autowired
	private InputDataDAO inputDataDAO;

	@Test
	void addDataTest() {
		InputData vehicle = new InputData();
		vehicle.setVehicleNum("KG 5504");
		inputDataDAO.save(vehicle);
	}

}
