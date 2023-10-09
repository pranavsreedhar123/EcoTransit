package com.sustainable_commute_finder.sustainable_commute_finder.carbon_footprint;

import com.fasterxml.jackson.annotation.JsonProperty;

public class TransitAttributes {

    @JsonProperty("distance_value")
    private String distanceValue;

    @JsonProperty("distance_unit")
    private String distanceUnit;

    @JsonProperty("weight_value")
    private String weightValue;

    @JsonProperty("weight_unit")
    private String weightUnit;

    @JsonProperty("transport_method")
    private String transportMethod;

    @JsonProperty("estimated_at")
    private String time;

    @JsonProperty("carbon_g")
    private double carbonG;

    @JsonProperty("carbon_lb")
    private double carbonLb;

    @JsonProperty("carbon_kg")
    private double carbonKg;

    @JsonProperty("carbon_mt")
    private double carbonMt;

    public String getDistanceValue() {
        return distanceValue;
    }

    public void setDistanceValue(String distanceValue) {
        this.distanceValue = distanceValue;
    }

    public String getDistanceUnit() {
        return distanceUnit;
    }

    public void setDistanceUnit(String distanceUnit) {
        this.distanceUnit = distanceUnit;
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

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
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
}
