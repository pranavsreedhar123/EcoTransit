package com.sustainable_commute_finder.sustainable_commute_finder.controllers;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import com.sustainable_commute_finder.sustainable_commute_finder.responses.EnvironmentalImpactResponse;

import java.text.DecimalFormat;

@RestController
@CrossOrigin(origins="http://localhost:3000")
public class EnvironmentalImpactController {

    @Value("${GOOGLE_MAPS_API_KEY}")
    private String API_KEY;

    @GetMapping("/environmental-impact/{distance}/{mode}")
    public EnvironmentalImpactResponse calculateEnvironmentalImpact(
            @PathVariable double distance,
            @PathVariable String mode) {

        // Calculate environmental impact based on distance and commute mode
        double impact = calculateImpact(distance, mode);

        // Create a response object with the impact information
        EnvironmentalImpactResponse response = new EnvironmentalImpactResponse();
        response.setCommuteDistance(distance);
        response.setCommuteMode(mode);
        response.setPositiveImpact(impact);

        return response;
    }

    private static final DecimalFormat df = new DecimalFormat("0.00");
    private double calculateImpact(double distance, String mode) {
        // Implement logic to calculate environmental impact here

        // Default impact value
        double impact = 0.0;

        if ("walking".equalsIgnoreCase(mode)) {
            impact = distance * 0.1; // 0.1 trees planted per mile walked
        } else if ("driving".equalsIgnoreCase(mode)) {
            impact = distance * 0.02; // 0.02 trees planted per mile driven
        } else if ("public transit".equalsIgnoreCase(mode)) {
            impact = distance * 0.05; // 0.05 trees planted per mile using public transport
        } else if ("bicycling".equalsIgnoreCase(mode)) {
            impact = distance * 0.1; // 0.1 trees planted per mile cycled
        } else if ("flying".equalsIgnoreCase(mode)) {
            impact = distance * 0.03; // 0.03 trees planted per mile of flying
        }

        return Double.parseDouble(df.format(impact));
    }
}