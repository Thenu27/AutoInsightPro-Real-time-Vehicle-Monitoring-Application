package com.autoInsightProDatabase.autoInsightProServer.model;

import jakarta.transaction.Transactional;
import org.hibernate.annotations.Parameter;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.beans.Transient;
import java.util.Optional;

@Repository
public interface VehicleSaveRepository extends CrudRepository<VehicleSave,Integer>{
    boolean existsByVehicleNum(String vehicleNum);

      boolean existsById(int vehicleID) ;


      boolean deleteById(int vehicleID) ;

      @Modifying
    @Transactional
    @Query("DELETE FROM VehicleSave v WHERE v.vehicleNum = :vehicleNum ")
    void deleteByVehicleNum(@Param("vehicleNum")String vehicleNum);
    }
/*@Modifying
    @Transactional
    @Query("DELETE FROM VehicleSave v WHERE v.vehicleNum = :vehicleNum") // Delete by vehicle number
    void deleteByVehicleNum(@Param("vehicleNum") String vehicleNum);*/



