package com.sustainable_commute_finder.sustainable_commute_finder;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Response {

    @JsonProperty("results")
    private Result[] result;

    public Result[] getResult() {
        return result;
    }

    public void setResult(Result[] result) {
        this.result = result;
    }


}
