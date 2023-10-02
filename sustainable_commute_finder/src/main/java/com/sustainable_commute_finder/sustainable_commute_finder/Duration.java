package com.sustainable_commute_finder.sustainable_commute_finder;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Duration {
    @JsonProperty("text")
    private String time;
    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }


}
