package com.sustainable_commute_finder.sustainable_commute_finder;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Response {
    private String message;
    public Response(String message) {
        this.message = message;
    }
    public String getMessage() {
        return message;
    }

}
