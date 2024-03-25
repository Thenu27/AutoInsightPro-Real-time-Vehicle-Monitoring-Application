package com.autoInsightProDatabase.autoInsightProServer.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
public class DateTimeSave {


        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private int ExpiryId;

        private LocalDate insuranceDate;
        private LocalTime insuranceTime;

        private LocalDate licenseDate;
        private LocalTime licenseTime;


        public int getExpiryId() {
            return ExpiryId;
        }

        public void setExpiryId(int expiryId) {
            ExpiryId = expiryId;
        }

        public LocalDate getLicenseDate() {
            return licenseDate;
        }

        public void setLicenseDate(LocalDate licenseDate) {
            this.licenseDate = licenseDate;
        }

        public LocalTime getLicenseTime() {
            return licenseTime;
        }

        public void setLicenseTime(LocalTime licenseTime) {
            this.licenseTime = licenseTime;
        }


        public LocalDate getInsuranceDate() {
            return insuranceDate;
        }

        public void setInsuranceDate(LocalDate insuranceDate) {
            this.insuranceDate = insuranceDate;
        }

        public LocalTime getInsuranceTime() {
            return insuranceTime;
        }

        public void setInsuranceTime(LocalTime insuranceTime) {
            this.insuranceTime = insuranceTime;
        }


        @Override
        public String toString() {
            return "ExpiryDatesSaveDetails{" +
                    "ExpiryDatesId=" + ExpiryId+
                    ",License Expiration Date="+ licenseDate+
                    ",License Exp Selected Time="+ licenseTime+
                    ",Insurance Expiration Date=" + insuranceDate+
                    ",Insurance Exp Selected Time=" + insuranceTime+
                    '}';

        }
    }




