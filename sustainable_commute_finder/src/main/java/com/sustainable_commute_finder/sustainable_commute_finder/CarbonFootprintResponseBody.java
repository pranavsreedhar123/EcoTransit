package com.sustainable_commute_finder.sustainable_commute_finder;

import com.fasterxml.jackson.annotation.JsonProperty;

public class CarbonFootprintResponseBody {
    @JsonProperty("type")
    private String type;

    @JsonProperty("id")
    private String id;

    @JsonProperty("attributes")
    private VehicleAttributes attributes;

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }


    public VehicleAttributes getAttributes() {
        return attributes;
    }

    public void setAttributes(VehicleAttributes attributes) {
        this.attributes = attributes;
    }
}
