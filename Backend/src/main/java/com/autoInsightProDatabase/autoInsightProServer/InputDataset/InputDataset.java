package com.autoInsightProDatabase.autoInsightProServer.InputDataset;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class InputDataset {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;


    private int ENGINE_RUN_TINE;
    private int ENGINE_RPM;
    private int VEHICLE_SPEED;
    private int THROTTLE;
    private int ENGINE_LOAD;
    private int COOLANT_TEMPERATURE;
    private int LONG_TERM_FUEL_TRIM_BANK_1;
    private int SHORT_TERM_FUEL_TRIM_BANK_1;
    private int INTAKE_MANIFOLD_PRESSURE;
    private int FUEL_TANK;
    private int ABSOLUTE_THROTTLE_B;
    private int PEDAL_D;
    private int PEDAL_E;
    private int COMMANDED_THROTTLE_ACTUATOR;
    private int FUEL_AIR_COMMANDED_EQUIV_RATIO;
    private int ABSOLUTE_BAROMETRIC_PRESSURE;
    private int RELATIVE_THROTTLE_POSITION;
    private int INTAKE_AIR_TEMP;
    private int TIMING_ADVANCE;
    private int CATALYST_TEMPERATURE_BANK1_SENSOR1;
    private int CATALYST_TEMPERATURE_BANK1_SENSOR2;
    private int CONTROL_MODULE_VOLTAGE;
    private int COMMANDED_EVAPORATIVE_PURGE;
    private int TIME_RUN_WITH_MIL_ON;
    private int TIME_SINCE_TROUBLE_CODES_CLEARED;
    private int DISTANCE_TRAVELED_WITH_MIL_ON;
    private int WARM_UPS_SINCE_CODES_CLEARED;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getENGINE_RUN_TINE() {
        return ENGINE_RUN_TINE;
    }

    public void setENGINE_RUN_TINE(int ENGINE_RUN_TINE) {
        this.ENGINE_RUN_TINE = ENGINE_RUN_TINE;
    }

    public int getENGINE_RPM() {
        return ENGINE_RPM;
    }

    public void setENGINE_RPM(int ENGINE_RPM) {
        this.ENGINE_RPM = ENGINE_RPM;
    }

    public int getVEHICLE_SPEED() {
        return VEHICLE_SPEED;
    }

    public void setVEHICLE_SPEED(int VEHICLE_SPEED) {
        this.VEHICLE_SPEED = VEHICLE_SPEED;
    }

    public int getTHROTTLE() {
        return THROTTLE;
    }

    public void setTHROTTLE(int THROTTLE) {
        this.THROTTLE = THROTTLE;
    }

    public int getENGINE_LOAD() {
        return ENGINE_LOAD;
    }

    public void setENGINE_LOAD(int ENGINE_LOAD) {
        this.ENGINE_LOAD = ENGINE_LOAD;
    }

    public int getCOOLANT_TEMPERATURE() {
        return COOLANT_TEMPERATURE;
    }

    public void setCOOLANT_TEMPERATURE(int COOLANT_TEMPERATURE) {
        this.COOLANT_TEMPERATURE = COOLANT_TEMPERATURE;
    }

    public int getLONG_TERM_FUEL_TRIM_BANK_1() {
        return LONG_TERM_FUEL_TRIM_BANK_1;
    }

    public void setLONG_TERM_FUEL_TRIM_BANK_1(int LONG_TERM_FUEL_TRIM_BANK_1) {
        this.LONG_TERM_FUEL_TRIM_BANK_1 = LONG_TERM_FUEL_TRIM_BANK_1;
    }

    public int getSHORT_TERM_FUEL_TRIM_BANK_1() {
        return SHORT_TERM_FUEL_TRIM_BANK_1;
    }

    public void setSHORT_TERM_FUEL_TRIM_BANK_1(int SHORT_TERM_FUEL_TRIM_BANK_1) {
        this.SHORT_TERM_FUEL_TRIM_BANK_1 = SHORT_TERM_FUEL_TRIM_BANK_1;
    }

    public int getINTAKE_MANIFOLD_PRESSURE() {
        return INTAKE_MANIFOLD_PRESSURE;
    }

    public void setINTAKE_MANIFOLD_PRESSURE(int INTAKE_MANIFOLD_PRESSURE) {
        this.INTAKE_MANIFOLD_PRESSURE = INTAKE_MANIFOLD_PRESSURE;
    }

    public int getFUEL_TANK() {
        return FUEL_TANK;
    }

    public void setFUEL_TANK(int FUEL_TANK) {
        this.FUEL_TANK = FUEL_TANK;
    }

    public int getABSOLUTE_THROTTLE_B() {
        return ABSOLUTE_THROTTLE_B;
    }

    public void setABSOLUTE_THROTTLE_B(int ABSOLUTE_THROTTLE_B) {
        this.ABSOLUTE_THROTTLE_B = ABSOLUTE_THROTTLE_B;
    }

    public int getPEDAL_D() {
        return PEDAL_D;
    }

    public void setPEDAL_D(int PEDAL_D) {
        this.PEDAL_D = PEDAL_D;
    }

    public int getPEDAL_E() {
        return PEDAL_E;
    }

    public void setPEDAL_E(int PEDAL_E) {
        this.PEDAL_E = PEDAL_E;
    }

    public int getCOMMANDED_THROTTLE_ACTUATOR() {
        return COMMANDED_THROTTLE_ACTUATOR;
    }

    public void setCOMMANDED_THROTTLE_ACTUATOR(int COMMANDED_THROTTLE_ACTUATOR) {
        this.COMMANDED_THROTTLE_ACTUATOR = COMMANDED_THROTTLE_ACTUATOR;
    }

    public int getFUEL_AIR_COMMANDED_EQUIV_RATIO() {
        return FUEL_AIR_COMMANDED_EQUIV_RATIO;
    }

    public void setFUEL_AIR_COMMANDED_EQUIV_RATIO(int FUEL_AIR_COMMANDED_EQUIV_RATIO) {
        this.FUEL_AIR_COMMANDED_EQUIV_RATIO = FUEL_AIR_COMMANDED_EQUIV_RATIO;
    }

    public int getABSOLUTE_BAROMETRIC_PRESSURE() {
        return ABSOLUTE_BAROMETRIC_PRESSURE;
    }

    public void setABSOLUTE_BAROMETRIC_PRESSURE(int ABSOLUTE_BAROMETRIC_PRESSURE) {
        this.ABSOLUTE_BAROMETRIC_PRESSURE = ABSOLUTE_BAROMETRIC_PRESSURE;
    }

    public int getRELATIVE_THROTTLE_POSITION() {
        return RELATIVE_THROTTLE_POSITION;
    }

    public void setRELATIVE_THROTTLE_POSITION(int RELATIVE_THROTTLE_POSITION) {
        this.RELATIVE_THROTTLE_POSITION = RELATIVE_THROTTLE_POSITION;
    }

    public int getINTAKE_AIR_TEMP() {
        return INTAKE_AIR_TEMP;
    }

    public void setINTAKE_AIR_TEMP(int INTAKE_AIR_TEMP) {
        this.INTAKE_AIR_TEMP = INTAKE_AIR_TEMP;
    }

    public int getTIMING_ADVANCE() {
        return TIMING_ADVANCE;
    }

    public void setTIMING_ADVANCE(int TIMING_ADVANCE) {
        this.TIMING_ADVANCE = TIMING_ADVANCE;
    }

    public int getCATALYST_TEMPERATURE_BANK1_SENSOR1() {
        return CATALYST_TEMPERATURE_BANK1_SENSOR1;
    }

    public void setCATALYST_TEMPERATURE_BANK1_SENSOR1(int CATALYST_TEMPERATURE_BANK1_SENSOR1) {
        this.CATALYST_TEMPERATURE_BANK1_SENSOR1 = CATALYST_TEMPERATURE_BANK1_SENSOR1;
    }

    public int getCATALYST_TEMPERATURE_BANK1_SENSOR2() {
        return CATALYST_TEMPERATURE_BANK1_SENSOR2;
    }

    public void setCATALYST_TEMPERATURE_BANK1_SENSOR2(int CATALYST_TEMPERATURE_BANK1_SENSOR2) {
        this.CATALYST_TEMPERATURE_BANK1_SENSOR2 = CATALYST_TEMPERATURE_BANK1_SENSOR2;
    }

    public int getCONTROL_MODULE_VOLTAGE() {
        return CONTROL_MODULE_VOLTAGE;
    }

    public void setCONTROL_MODULE_VOLTAGE(int CONTROL_MODULE_VOLTAGE) {
        this.CONTROL_MODULE_VOLTAGE = CONTROL_MODULE_VOLTAGE;
    }

    public int getCOMMANDED_EVAPORATIVE_PURGE() {
        return COMMANDED_EVAPORATIVE_PURGE;
    }

    public void setCOMMANDED_EVAPORATIVE_PURGE(int COMMANDED_EVAPORATIVE_PURGE) {
        this.COMMANDED_EVAPORATIVE_PURGE = COMMANDED_EVAPORATIVE_PURGE;
    }

    public int getTIME_RUN_WITH_MIL_ON() {
        return TIME_RUN_WITH_MIL_ON;
    }

    public void setTIME_RUN_WITH_MIL_ON(int TIME_RUN_WITH_MIL_ON) {
        this.TIME_RUN_WITH_MIL_ON = TIME_RUN_WITH_MIL_ON;
    }

    public int getTIME_SINCE_TROUBLE_CODES_CLEARED() {
        return TIME_SINCE_TROUBLE_CODES_CLEARED;
    }

    public void setTIME_SINCE_TROUBLE_CODES_CLEARED(int TIME_SINCE_TROUBLE_CODES_CLEARED) {
        this.TIME_SINCE_TROUBLE_CODES_CLEARED = TIME_SINCE_TROUBLE_CODES_CLEARED;
    }

    public int getDISTANCE_TRAVELED_WITH_MIL_ON() {
        return DISTANCE_TRAVELED_WITH_MIL_ON;
    }

    public void setDISTANCE_TRAVELED_WITH_MIL_ON(int DISTANCE_TRAVELED_WITH_MIL_ON) {
        this.DISTANCE_TRAVELED_WITH_MIL_ON = DISTANCE_TRAVELED_WITH_MIL_ON;
    }

    public int getWARM_UPS_SINCE_CODES_CLEARED() {
        return WARM_UPS_SINCE_CODES_CLEARED;
    }

    public void setWARM_UPS_SINCE_CODES_CLEARED(int WARM_UPS_SINCE_CODES_CLEARED) {
        this.WARM_UPS_SINCE_CODES_CLEARED = WARM_UPS_SINCE_CODES_CLEARED;
    }

    @Override
    public String toString() {
        return "InputDataset{" +
                "id=" + id +
                ", ENGINE_RUN_TINE=" + ENGINE_RUN_TINE +
                ", ENGINE_RPM=" + ENGINE_RPM +
                ", VEHICLE_SPEED=" + VEHICLE_SPEED +
                ", THROTTLE=" + THROTTLE +
                ", ENGINE_LOAD=" + ENGINE_LOAD +
                ", COOLANT_TEMPERATURE=" + COOLANT_TEMPERATURE +
                ", LONG_TERM_FUEL_TRIM_BANK_1=" + LONG_TERM_FUEL_TRIM_BANK_1 +
                ", SHORT_TERM_FUEL_TRIM_BANK_1=" + SHORT_TERM_FUEL_TRIM_BANK_1 +
                ", INTAKE_MANIFOLD_PRESSURE=" + INTAKE_MANIFOLD_PRESSURE +
                ", FUEL_TANK=" + FUEL_TANK +
                ", ABSOLUTE_THROTTLE_B=" + ABSOLUTE_THROTTLE_B +
                ", PEDAL_D=" + PEDAL_D +
                ", PEDAL_E=" + PEDAL_E +
                ", COMMANDED_THROTTLE_ACTUATOR=" + COMMANDED_THROTTLE_ACTUATOR +
                ", FUEL_AIR_COMMANDED_EQUIV_RATIO=" + FUEL_AIR_COMMANDED_EQUIV_RATIO +
                ", ABSOLUTE_BAROMETRIC_PRESSURE=" + ABSOLUTE_BAROMETRIC_PRESSURE +
                ", RELATIVE_THROTTLE_POSITION=" + RELATIVE_THROTTLE_POSITION +
                ", INTAKE_AIR_TEMP=" + INTAKE_AIR_TEMP +
                ", TIMING_ADVANCE=" + TIMING_ADVANCE +
                ", CATALYST_TEMPERATURE_BANK1_SENSOR1=" + CATALYST_TEMPERATURE_BANK1_SENSOR1 +
                ", CATALYST_TEMPERATURE_BANK1_SENSOR2=" + CATALYST_TEMPERATURE_BANK1_SENSOR2 +
                ", CONTROL_MODULE_VOLTAGE=" + CONTROL_MODULE_VOLTAGE +
                ", COMMANDED_EVAPORATIVE_PURGE=" + COMMANDED_EVAPORATIVE_PURGE +
                ", TIME_RUN_WITH_MIL_ON=" + TIME_RUN_WITH_MIL_ON +
                ", TIME_SINCE_TROUBLE_CODES_CLEARED=" + TIME_SINCE_TROUBLE_CODES_CLEARED +
                ", DISTANCE_TRAVELED_WITH_MIL_ON=" + DISTANCE_TRAVELED_WITH_MIL_ON +
                ", WARM_UPS_SINCE_CODES_CLEARED=" + WARM_UPS_SINCE_CODES_CLEARED +
                '}';
    }
}
