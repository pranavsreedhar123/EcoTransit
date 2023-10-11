package com.sustainable_commute_finder.sustainable_commute_finder.requests;

public class EnvironmentalImpactRequest {
    private double commuteDistance;
    private String commuteMode;

    // Constructors
    public EnvironmentalImpactRequest() {
        // Default constructor
    }

    public EnvironmentalImpactRequest(double commuteDistance, String commuteMode) {
        this.commuteDistance = commuteDistance;
        this.commuteMode = commuteMode;
    }

    // Getters and Setters
    public double getCommuteDistance() {
        return commuteDistance;
    }

    public void setCommuteDistance(double commuteDistance) {
        this.commuteDistance = commuteDistance;
    }

    public String getCommuteMode() {
        return commuteMode;
    }

    public void setCommuteMode(String commuteMode) {
        this.commuteMode = commuteMode;
    }
}