package com.sustainable_commute_finder.sustainable_commute_finder.utils;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Geometry {

    @JsonProperty("location")
    private Location location;
    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }


}