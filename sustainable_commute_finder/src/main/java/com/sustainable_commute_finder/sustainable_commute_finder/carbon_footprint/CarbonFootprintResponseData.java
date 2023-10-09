package com.sustainable_commute_finder.sustainable_commute_finder.carbon_footprint;

import com.fasterxml.jackson.annotation.JsonProperty;

public class CarbonFootprintResponseData {
    @JsonProperty("data")
    private CarbonFootprintVehicleResponseBody data;

    public CarbonFootprintVehicleResponseBody getData() {
        return data;
    }

    public void setData(CarbonFootprintVehicleResponseBody data) {
        this.data = data;
    }
}
