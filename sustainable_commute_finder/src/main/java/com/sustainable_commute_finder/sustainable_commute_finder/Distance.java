package com.sustainable_commute_finder.sustainable_commute_finder;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Distance {
    @JsonProperty("text")
    private String distance;

    public String getDistance() {
        return distance;
    }

    public void setDistance(String distance) {
        this.distance = distance;
    }
}
