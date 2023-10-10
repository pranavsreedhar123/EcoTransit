package com.sustainable_commute_finder.sustainable_commute_finder.carbon_footprint;

import com.fasterxml.jackson.annotation.JsonProperty;

public class CarbonFootprintTransitRequestBody {

    @JsonProperty("type")
    private String type;

    @JsonProperty("weight_unit")
    private String weightUnit;

    @JsonProperty("weight_value")
    private double weightValue;

    @JsonProperty("distance_unit")
    private String distanceUnit;

    @JsonProperty("distance_value")
    private double distanceValue;

    @JsonProperty("transport_method")
    private String transportMethod;

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getWeightUnit() {
        return weightUnit;
    }

    public void setWeightUnit(String weightUnit) {
        this.weightUnit = weightUnit;
    }

    public double getWeightValue() {
        return weightValue;
    }

    public void setWeightValue(double weightValue) {
        this.weightValue = weightValue;
    }

    public String getDistanceUnit() {
        return distanceUnit;
    }

    public void setDistanceUnit(String distanceUnit) {
        this.distanceUnit = distanceUnit;
    }

    public double getDistanceValue() {
        return distanceValue;
    }

    public void setDistanceValue(double distanceValue) {
        this.distanceValue = distanceValue;
    }

    public String getTransportMethod() {
        return transportMethod;
    }

    public void setTransportMethod(String transportMethod) {
        this.transportMethod = transportMethod;
    }
}
