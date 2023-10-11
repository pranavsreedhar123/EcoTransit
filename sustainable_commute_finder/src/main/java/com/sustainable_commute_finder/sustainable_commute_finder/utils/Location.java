package com.sustainable_commute_finder.sustainable_commute_finder.utils;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Location {
    @JsonProperty("lat")
    private double lat ;
    @JsonProperty("lng")
    private double lng;
    public double getLat() {
        return lat;
    }

    public void setLat(double lat) {
        this.lat = lat;
    }

    public double getLng() {
        return lng;
    }

    public void setLng(double lng) {
        this.lng = lng;
    }


}