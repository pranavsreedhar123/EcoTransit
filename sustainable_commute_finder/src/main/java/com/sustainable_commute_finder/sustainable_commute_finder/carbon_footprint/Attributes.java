package com.sustainable_commute_finder.sustainable_commute_finder.carbon_footprint;
import com.fasterxml.jackson.annotation.JsonProperty;

public class Attributes {
    @JsonProperty("distance_value")
    private double distanceValue;

    @JsonProperty("distance_unit")
    private String distanceUnit;

    @JsonProperty("vehicle_make")
    private String vehicleMake;

    @JsonProperty("vehicle_model")
    private String vehicleModel;

    @JsonProperty("vehicle_year")
    private int vehicleYear;

    @JsonProperty("vehicle_model_id")
    private String vehicleModelId;

    @JsonProperty("weight_value")
    private String weightValue;

    @JsonProperty("weight_unit")
    private String weightUnit;

    @JsonProperty("transport_method")
    private String transportMethod;

    @JsonProperty("estimated_at")
    private String estimatedAt;

    @JsonProperty("carbon_g")
    private double carbonG;

    @JsonProperty("carbon_lb")
    private double carbonLb;

    @JsonProperty("carbon_kg")
    private double carbonKg;

    @JsonProperty("carbon_mt")
    private double carbonMt;

    public double getDistanceValue() {
        return distanceValue;
    }

    public void setDistanceValue(double distanceValue) {
        this.distanceValue = distanceValue;
    }

    public String getVehicleMake() {
        return vehicleMake;
    }

    public void setVehicleMake(String vehicleMake) {
        this.vehicleMake = vehicleMake;
    }

    public String getVehicleModel() {
        return vehicleModel;
    }

    public void setVehicleModel(String vehicleModel) {
        this.vehicleModel = vehicleModel;
    }

    public int getVehicleYear() {
        return vehicleYear;
    }

    public void setVehicleYear(int vehicleYear) {
        this.vehicleYear = vehicleYear;
    }

    public String getVehicleModelId() {
        return vehicleModelId;
    }

    public void setVehicleModelId(String vehicleModelId) {
        this.vehicleModelId = vehicleModelId;
    }

    public String getDistanceUnit() {
        return distanceUnit;
    }

    public void setDistanceUnit(String distanceUnit) {
        this.distanceUnit = distanceUnit;
    }

    public String getEstimatedAt() {
        return estimatedAt;
    }

    public void setEstimatedAt(String estimatedAt) {
        this.estimatedAt = estimatedAt;
    }

    public double getCarbonG() {
        return carbonG;
    }

    public void setCarbonG(double carbonG) {
        this.carbonG = carbonG;
    }

    public double getCarbonLb() {
        return carbonLb;
    }

    public void setCarbonLb(double carbonLb) {
        this.carbonLb = carbonLb;
    }

    public double getCarbonKg() {
        return carbonKg;
    }

    public void setCarbonKg(double carbonKg) {
        this.carbonKg = carbonKg;
    }

    public double getCarbonMt() {
        return carbonMt;
    }

    public void setCarbonMt(double carbonMt) {
        this.carbonMt = carbonMt;
    }

    public String getWeightValue() {
        return weightValue;
    }

    public void setWeightValue(String weightValue) {
        this.weightValue = weightValue;
    }

    public String getWeightUnit() {
        return weightUnit;
    }

    public void setWeightUnit(String weightUnit) {
        this.weightUnit = weightUnit;
    }

    public String getTransportMethod() {
        return transportMethod;
    }

    public void setTransportMethod(String transportMethod) {
        this.transportMethod = transportMethod;
    }
}
