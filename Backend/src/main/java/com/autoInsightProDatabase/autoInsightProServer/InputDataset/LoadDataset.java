package com.autoInsightProDatabase.autoInsightProServer.InputDataset;
//
//import com.opencsv.bean.CsvToBean;
//import com.opencsv.bean.CsvToBeanBuilder;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.core.io.ResourceLoader;
//
//import java.io.IOException;
//import java.io.Reader;
//import java.nio.file.Files;
//import java.nio.file.Paths;
//import java.util.List;
//
//public class LoadDataset {
//
////    @Autowired
////    private ResourceLoader resourceLoader;
//
//    public LoadDataset() throws IOException {
//        String csvFilePath = "drive1.csv";
//
//        try (Reader reader = Files.newBufferedReader(Paths.get(csvFilePath))) {
//            CsvToBean<InputDataset> csvToBean = new CsvToBeanBuilder<InputDataset>(reader)
//                    .withType(InputDataset.class)
//                    .withIgnoreLeadingWhiteSpace(true)
//                    .build();
//
//            List<InputDataset> dataRow = csvToBean.parse();
//
//
//            dataRow.forEach(System.out::println);
//        } catch (Exception ex) {
//            ex.printStackTrace();
//        }
//    }
//
//
//}

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

//    public LoadDataset() {
//        try {
//            ClassPathResource resource = new ClassPathResource("drive1.csv");
//
//            try (Reader reader = new InputStreamReader(resource.getInputStream())) {
//                CsvToBean<InputDataset> csvToBean = new CsvToBeanBuilder<InputDataset>(reader)
//                        .withType(InputDataset.class)
//                        .withIgnoreLeadingWhiteSpace(true)
//                        .build();
//
//                List<InputDataset> dataRow = csvToBean.parse();
//
//                dataRow.forEach(System.out::println);
//
////                for (InputDataset dataRows : dataRow) {
////                    System.out.println(dataRows);
////                }
//            }
//        } catch (Exception ex) {
//            ex.printStackTrace();
//        }
//    }

    public LoadDataset() {
        try {
            ClassPathResource resource = new ClassPathResource("drive1.csv");

            try (Reader reader = new InputStreamReader(resource.getInputStream())) {
                // Parse CSV data
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

