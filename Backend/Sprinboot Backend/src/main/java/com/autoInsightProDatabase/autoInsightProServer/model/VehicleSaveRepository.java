package com.autoInsightProDatabase.autoInsightProServer.model;

import jakarta.transaction.Transactional;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.beans.Transient;
import java.util.Optional;

@Repository
public interface VehicleSaveRepository extends CrudRepository<VehicleSave,Integer>{
    boolean existsByVehicleNum(String vehicleNum);

//    Optional<Object> findFirstByOrderByCreatedAtDesc();

//    Optional<VehicleSave> findFirstByOrderByCreatedAtDesc();
}

