package com.autoInsightProDatabase.autoInsightProServer.Controller;

import com.autoInsightProDatabase.autoInsightProServer.InputDataset.CsvService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class CsvController {

    @Autowired
    private CsvService csvService;

    @GetMapping("/csv/rows")
    public ResponseEntity<List<String[]>> getCsvRows() {
        List<String[]> rows = csvService.readCsv();
        return ResponseEntity.ok(rows);
    }
}
