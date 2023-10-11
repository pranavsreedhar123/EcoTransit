package com.sustainable_commute_finder.sustainable_commute_finder.responses;

public class EnvironmentalImpactResponse {

    private double commuteDistance;
    private String commuteMode;
    private double positiveImpact;

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

    public double getPositiveImpact() {
        return positiveImpact;
    }

    public void setPositiveImpact(double positiveImpact) {
        this.positiveImpact = positiveImpact;
    }
}
