package com.sustainable_commute_finder.sustainable_commute_finder.carbon_footprint;

import com.fasterxml.jackson.annotation.JsonProperty;

public class CarbonFootprintResponseData {
    @JsonProperty("data")
    private CarbonFootprintResponseBody data;
}
