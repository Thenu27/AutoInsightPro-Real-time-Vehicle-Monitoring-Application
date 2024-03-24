package com.autoInsightProDatabase.autoInsightProServer.InputDataset;

import com.opencsv.CSVReader;
import com.opencsv.CSVReaderBuilder;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import java.io.InputStreamReader;
import java.io.Reader;
import java.util.List;

@Service
public class CsvService {

    public List<String[]> readCsv() {
        try {
            ClassPathResource resource = new ClassPathResource("drive1.csv");
            try (Reader reader = new InputStreamReader(resource.getInputStream())) {
                CSVReader csvReader = new CSVReaderBuilder(reader).withSkipLines(1).build(); // Skip header row
                return csvReader.readAll();
            }
        } catch (Exception ex) {
            ex.printStackTrace();
            throw new RuntimeException("Failed to read CSV data: " + ex.getMessage());
        }
    }
}
