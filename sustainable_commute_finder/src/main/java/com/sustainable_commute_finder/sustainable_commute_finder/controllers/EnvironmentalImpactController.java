package com.sustainable_commute_finder.sustainable_commute_finder.controllers;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import com.sustainable_commute_finder.sustainable_commute_finder.responses.EnvironmentalImpactResponse;

import java.text.DecimalFormat;

@RestController
@CrossOrigin(origins={"http://localhost:3000", "https://ecotransit-frontend.uc.r.appspot.com"})
public class EnvironmentalImpactController {

    @Value("${GOOGLE_MAPS_API_KEY}")
    private String API_KEY;

    @GetMapping("/environmental-impact/{difference}")
    public EnvironmentalImpactResponse calculateEnvironmentalImpact(
            @PathVariable double difference) {

        // Calculate environmental impact based on distance and commute mode
        double impact = calculateImpact(difference);

        // Create a response object with the impact information
        EnvironmentalImpactResponse response = new EnvironmentalImpactResponse();
        response.setPositiveImpact(impact);

        return response;
    }

    private static final DecimalFormat df = new DecimalFormat("0.00");
    private double calculateImpact(double difference) {
        // Implement logic to calculate environmental impact here

        // Default impact value
        double impact = 0.0;

        impact = difference/26;

        return Double.parseDouble(df.format(impact));
    }
}