package com.autoInsightProDatabase.autoInsightProServer.InputDataset;

import com.autoInsightProDatabase.autoInsightProServer.InputDataset.InputDataset;
import com.autoInsightProDatabase.autoInsightProServer.PerformanceAnalyzer.Performance;
import com.autoInsightProDatabase.autoInsightProServer.PerformanceAnalyzer.PerformanceDAO;
import com.opencsv.CSVReader;
import com.opencsv.CSVReaderBuilder;
import com.opencsv.CSVWriter;
import com.opencsv.bean.CsvToBean;
import com.opencsv.bean.CsvToBeanBuilder;
import com.opencsv.exceptions.CsvException;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import java.io.*;
import java.util.Arrays;
import java.util.List;

//import static java.lang.VersionProps.println;

@Component
public class LoadDataset {

    private PerformanceDAO performanceDAO;

    @Autowired
    public LoadDataset(PerformanceDAO performanceDAO) {
        this.performanceDAO = performanceDAO;
    }

    @PostConstruct
    public void init() {
        new LoadDataset();
        savePerformanceFromCSV();
    }


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

                healthReport(rows);
                savePerformance(rows);
//                savePerformanceFromCSV();
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }


    private void healthReport(List<String[]> rows) {
        try (Writer writer = new FileWriter("Health_Report_File.csv")) {
            CSVWriter csvWriter = new CSVWriter(writer);

            for (String[] row : rows) {
                String[] newRow = new String[6];
                newRow[0] = row[6];  // Column 6
                newRow[1] = row[2];  // Column 2
                newRow[2] = row[3];  // Column 3
                newRow[3] = row[18]; // Column 18
                newRow[4] = row[8];  // Column 8
                newRow[5] = row[7];  // Column 7

                csvWriter.writeNext(newRow);
            }

            System.out.println("Health Report CSV file created successfully.");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public void savePerformance(List<String[]> rows) {
        try (Writer writer = new FileWriter("Performance_Report_File.csv")) {
            CSVWriter csvWriter = new CSVWriter(writer);

            double[] maxValues = new double[5];
            Arrays.fill(maxValues, Double.MIN_VALUE);

            for (String[] row : rows) {
                try {
                    double value = Double.parseDouble(row[5]); // Column 5
                    if (value > maxValues[0]) {
                        maxValues[0] = value;
                    }
                } catch (NumberFormatException ignored) {
                }

                try {
                    double value = Double.parseDouble(row[1]); // Column 1
                    if (value > maxValues[1]) {
                        maxValues[1] = value;
                    }
                } catch (NumberFormatException ignored) {
                }

                try {
                    double value = Double.parseDouble(row[2]); // Column 2
                    if (value > maxValues[2]) {
                        maxValues[2] = value;
                    }
                } catch (NumberFormatException ignored) {
                }

                try {
                    double value = Double.parseDouble(row[3]); // Column 3
                    if (value > maxValues[3]) {
                        maxValues[3] = value;
                    }
                } catch (NumberFormatException ignored) {
                }
            }


            csvWriter.writeNext(new String[]{
                    String.valueOf(maxValues[0]), // Column 5
                    String.valueOf(maxValues[1]), // Column 1
                    String.valueOf(maxValues[2]), // Column 2
                    String.valueOf(maxValues[3])  // Column 3
            });

            System.out.println("Performance Report CSV file created successfully.");

        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    public void savePerformanceFromCSV() {
        String filePath = "Performance_Report_File.csv";
        try (Reader reader = new FileReader(filePath)) {
            CSVReader csvReader = new CSVReader(reader);
            List<String[]> rows = csvReader.readAll();

            System.out.println("Performance Report Data:");
            for (String[] row : rows) {

                Performance performance = new Performance();
                performance.setHighestSpeed((int) Double.parseDouble(row[3]));
                performance.setHighestRPM((int) Double.parseDouble(row[2]));
                performance.setHighestCoolTemp((int) Double.parseDouble(row[0]));
                performance.setHighestThrottle((int) Double.parseDouble(row[1]));

                performanceDAO.savePA(performance);

                System.out.println(Arrays.toString(row));
            }
        } catch (IOException | CsvException e) {
            e.printStackTrace();
        }
    }

}

