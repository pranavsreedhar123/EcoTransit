package com.sustainable_commute_finder.sustainable_commute_finder.utils;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Elements {

    @JsonProperty("distance")
    private Distance distance;
    @JsonProperty("duration")
    private Duration duration;

    public Distance getDistance() {
        if (distance == null) {
            Distance d = new Distance();
            d.setDistance("N/A");
            return d;
        }
        return distance;
    }

    public void setDistance(Distance distance) {
        this.distance = distance;
    }

    public Duration getDuration() {
        if (duration == null) {
            Duration d = new Duration();
            d.setTime("N/A");
            return d;
        }
        return duration;
    }

    public void setDuration(Duration duration) {
        this.duration = duration;
    }
}
