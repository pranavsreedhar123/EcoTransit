package com.sustainable_commute_finder.sustainable_commute_finder;

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
public class CarbonFootprintController {
    RestTemplate restTemplate;

    @Value("${CARBON_INTERFACE_API_KEY}")
    private String API_KEY;

    @RequestMapping(value = "/carbonFootprint",
            method = RequestMethod.POST,
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String getCarbonFootprint(@RequestBody CarbonFootprintVehicleRequestBody vehicleRequestBody,
                                     @RequestBody CarbonFootprintTransitRequestBody transitRequestBody) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + API_KEY);

        HttpEntity <CarbonFootprintVehicleRequestBody> vehicleRequest = new HttpEntity(vehicleRequestBody, headers);
        HttpEntity <CarbonFootprintTransitRequestBody> transitRequest = new HttpEntity(transitRequestBody, headers);

        String url = "https://www.carboninterface.com/api/v1/estimates";
        restTemplate = new RestTemplate();
        CarbonFootprintResponseData vehicleResponse = restTemplate.exchange(url,
                                                HttpMethod.POST,
                                                vehicleRequest,
                                                CarbonFootprintResponseData.class).getBody();

        CarbonFootprintResponseData transitResponse = restTemplate.exchange(url,
                                                HttpMethod.POST,
                                                transitRequest,
                                                CarbonFootprintResponseData.class).getBody();

        String response = vehicleResponse.getData().getType() + " Carbon footprint: "
                + vehicleResponse.getData().getAttributes().getCarbonKg() + "\n" +
                transitResponse.getData().getAttributes().getTransportMethod() + " Carbon footprint: "
                + transitResponse.getData().getAttributes().getCarbonKg();
        return response;
    }
}