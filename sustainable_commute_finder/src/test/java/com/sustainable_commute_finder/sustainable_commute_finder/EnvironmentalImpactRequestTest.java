package com.sustainable_commute_finder.sustainable_commute_finder;

import org.junit.jupiter.api.Test;

import com.sustainable_commute_finder.sustainable_commute_finder.requests.EnvironmentalImpactRequest;

import static org.junit.jupiter.api.Assertions.*;

class EnvironmentalImpactRequestTest {

    @Test
    void getCommuteDistance() {
        // Create an instance of EnvironmentalImpactRequest
        EnvironmentalImpactRequest request = new EnvironmentalImpactRequest(10.0, "walking");

        // Test the getCommuteDistance() method
        assertEquals(10.0, request.getCommuteDistance());
    }

    @Test
    void setCommuteDistance() {
        // Create an instance of EnvironmentalImpactRequest
        EnvironmentalImpactRequest request = new EnvironmentalImpactRequest();

        // Test the setCommuteDistance() method
        request.setCommuteDistance(20.0);
        assertEquals(20.0, request.getCommuteDistance());
    }

    @Test
    void getCommuteMode() {
        // Create an instance of EnvironmentalImpactRequest
        EnvironmentalImpactRequest request = new EnvironmentalImpactRequest(15.0, "walking");

        // Test the getCommuteMode() method
        assertEquals("walking", request.getCommuteMode());
    }

    @Test
    void setCommuteMode() {
        // Create an instance of EnvironmentalImpactRequest
        EnvironmentalImpactRequest request = new EnvironmentalImpactRequest();

        // Test the setCommuteMode() method
        request.setCommuteMode("walking");
        assertEquals("walking", request.getCommuteMode());
    }
}