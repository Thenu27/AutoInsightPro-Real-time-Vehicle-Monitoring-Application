package com.autoInsightProDatabase.autoInsightProServer.model;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class DateTimeSaveDAO {

    @Autowired
    private DateTimeSaveRepository repository;

    public void saveDate(DateTimeSave date) {
        repository.save(date);
    }

    public List<DateTimeSave> getAllDateTime() {
        List<DateTimeSave> DateTime = new ArrayList<>();
        repository.findAll().forEach(DateTime::add);
        return DateTime;
    }

}