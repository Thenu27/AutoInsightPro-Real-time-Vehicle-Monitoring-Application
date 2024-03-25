package com.autoInsightProDatabase.autoInsightProServer.PerformanceAnalyzer;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PerformanceRepository extends CrudRepository<Performance, Integer> {
}
