package com.sustainable_commute_finder.sustainable_commute_finder;

import com.sustainable_commute_finder.sustainable_commute_finder.carbon_footprint.CarbonFootprintRequestBody;
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
    public CarbonFootprintResponseData getCarbonFootprint(@RequestBody CarbonFootprintRequestBody requestBody) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + API_KEY);

        HttpEntity <CarbonFootprintRequestBody> request = new HttpEntity(requestBody, headers);
        String url = "https://www.carboninterface.com/api/v1/estimates";
        restTemplate = new RestTemplate();
        CarbonFootprintResponseData response = restTemplate.exchange(url,
                                                HttpMethod.POST,
                                                request,
                                                CarbonFootprintResponseData.class).getBody();
        System.out.println(response);
        return response;
    }
}
