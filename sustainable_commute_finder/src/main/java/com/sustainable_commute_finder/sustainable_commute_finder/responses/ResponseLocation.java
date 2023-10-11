package com.sustainable_commute_finder.sustainable_commute_finder.responses;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.sustainable_commute_finder.sustainable_commute_finder.utils.Result;

public class ResponseLocation {
    @JsonProperty("results")
    private Result[] result;

    public Result[] getResult() {
        return result;
    }

    public void setResult(Result[] result) {
        this.result = result;
    }
}
