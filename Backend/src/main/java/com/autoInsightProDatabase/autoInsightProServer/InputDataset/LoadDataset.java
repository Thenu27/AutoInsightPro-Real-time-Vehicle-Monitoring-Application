package com.autoInsightProDatabase.autoInsightProServer.InputDataset;

import com.autoInsightProDatabase.autoInsightProServer.InputDataset.InputDataset;
import com.opencsv.CSVReader;
import com.opencsv.CSVReaderBuilder;
import com.opencsv.bean.CsvToBean;
import com.opencsv.bean.CsvToBeanBuilder;
import org.springframework.core.io.ClassPathResource;

import java.io.InputStreamReader;
import java.io.Reader;
import java.util.Arrays;
import java.util.List;

public class LoadDataset {

    public LoadDataset() {
        try {
            ClassPathResource resource = new ClassPathResource("drive1.csv");

            try (Reader reader = new InputStreamReader(resource.getInputStream())) {
                CSVReader csvReader = new CSVReaderBuilder(reader).build();
                List<String[]> rows = csvReader.readAll();

                System.out.println("CSV:");
                for (String[] row : rows) {
                    System.out.println(Arrays.toString(row));
                }

            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }
}

