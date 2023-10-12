package com.sustainable_commute_finder.sustainable_commute_finder.controllers;

import com.sustainable_commute_finder.sustainable_commute_finder.carbon_footprint.CarbonFootprintTransitRequestBody;
import com.sustainable_commute_finder.sustainable_commute_finder.carbon_footprint.CarbonFootprintVehicleRequestBody;
import com.sustainable_commute_finder.sustainable_commute_finder.carbon_footprint.CarbonFootprintResponseData;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@RestController
@CrossOrigin(origins="http://localhost:3000")
public class CarbonFootprintController {
    RestTemplate restTemplate;

    @Value("${CARBON_INTERFACE_API_KEY}")
    private String API_KEY;


    @PostMapping(value = "/carbonFootprintVehicle",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
//    @ResponseBody
    public CarbonFootprintResponseData getCarbonFootprint(@RequestBody CarbonFootprintVehicleRequestBody vehicleRequestBody) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + API_KEY);

        HttpEntity <CarbonFootprintVehicleRequestBody> vehicleRequest = new HttpEntity(vehicleRequestBody, headers);

        String url = "https://www.carboninterface.com/api/v1/estimates";
        restTemplate = new RestTemplate();
        CarbonFootprintResponseData vehicleResponse = restTemplate.exchange(url,
                                                HttpMethod.POST,
                                                vehicleRequest,
                                                CarbonFootprintResponseData.class).getBody();

        return vehicleResponse;
    }

    @RequestMapping(value = "/carbonFootprintTransit",
            method = RequestMethod.POST,
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public CarbonFootprintResponseData getCarbonFootprint(@RequestBody CarbonFootprintTransitRequestBody transitRequestBody) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + API_KEY);

        HttpEntity <CarbonFootprintTransitRequestBody> transitRequest = new HttpEntity(transitRequestBody, headers);

        String url = "https://www.carboninterface.com/api/v1/estimates";
        restTemplate = new RestTemplate();

        CarbonFootprintResponseData transitResponse = restTemplate.exchange(url,
                HttpMethod.POST,
                transitRequest,
                CarbonFootprintResponseData.class).getBody();

        return transitResponse;
    }
}
