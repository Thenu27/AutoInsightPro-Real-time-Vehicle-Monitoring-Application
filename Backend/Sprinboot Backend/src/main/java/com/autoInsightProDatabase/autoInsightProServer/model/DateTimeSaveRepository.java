package com.autoInsightProDatabase.autoInsightProServer.model;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DateTimeSaveRepository  extends CrudRepository<DateTimeSave,Integer> {
}
