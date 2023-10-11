package com.sustainable_commute_finder.sustainable_commute_finder.utils;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Elements {

    @JsonProperty("distance")
    private Distance distance;
    @JsonProperty("duration")
    private Duration duration;

    public Distance getDistance() {
        return distance;
    }

    public void setDistance(Distance distance) {
        this.distance = distance;
    }

    public Duration getDuration() {
        return duration;
    }

    public void setDuration(Duration duration) {
        this.duration = duration;
    }
}
