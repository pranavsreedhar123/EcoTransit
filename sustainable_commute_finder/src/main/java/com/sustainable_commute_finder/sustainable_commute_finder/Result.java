package com.sustainable_commute_finder.sustainable_commute_finder;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Result {
    @JsonProperty("formatted_address")
    private String address;
    @JsonProperty("geometry")
    private Geometry geometry;
    public Geometry getGeometry() {
        return geometry;
    }

    public void setGeometry(Geometry geometry) {
        this.geometry = geometry;
    }


    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }


}
