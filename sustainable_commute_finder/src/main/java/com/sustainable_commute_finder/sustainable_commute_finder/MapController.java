package com.sustainable_commute_finder.sustainable_commute_finder;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

@RestController
@CrossOrigin(origins="http://localhost:3000")

public class MapController {
    @Value("${GOOGLE_MAPS_API_KEY}")
    private String API_KEY = "";
    @RequestMapping(method = RequestMethod.GET, value = "/getLocation/{dest_address}/{origin_address}")
    public String getMap(@PathVariable String dest_address, @PathVariable String origin_address) {
        UriComponents uriDest = UriComponentsBuilder.newInstance()
                .scheme("https")
                .host("maps.googleapis.com")
                .path("/maps/api/geocode/json")
                .queryParam("key", API_KEY)
                .queryParam("address", dest_address)
                .build();
        UriComponents uriOrigin = UriComponentsBuilder.newInstance()
                .scheme("https")
                .host("maps.googleapis.com")
                .path("/maps/api/geocode/json")
                .queryParam("key", API_KEY)
                .queryParam("address", origin_address)
                .build();

        ResponseEntity<ResponseLocation> responseDest = new RestTemplate().getForEntity(uriDest.toUriString(), ResponseLocation.class);
        ResponseLocation bodyDest = responseDest.getBody();
        String locationDest = bodyDest.getResult()[0].getGeometry().getLocation().getLat() + ", " + bodyDest.getResult()[0].getGeometry().getLocation().getLng();
        ResponseEntity<ResponseLocation> responseOrigin = new RestTemplate().getForEntity(uriOrigin.toUriString(), ResponseLocation.class);
        ResponseLocation bodyOrigin = responseOrigin.getBody();
        String locationOrigin = bodyOrigin.getResult()[0].getGeometry().getLocation().getLat() + ", " + bodyOrigin.getResult()[0].getGeometry().getLocation().getLng();

        UriComponents uriD = UriComponentsBuilder.newInstance()
                .scheme("https")
                .host("maps.googleapis.com")
                .path("/maps/api/distancematrix/json")
                .queryParam("key", API_KEY)
                .queryParam("origins", origin_address)
                .queryParam("destinations", dest_address)
                .queryParam("units", "imperial")
                .queryParam("mode", "driving")
                .build();
        ResponseEntity<ResponseRoute> responseD = new RestTemplate().getForEntity(uriD.toUriString(), ResponseRoute.class);
        ResponseRoute bodyD = responseD.getBody();

        UriComponents uriW = UriComponentsBuilder.newInstance()
                .scheme("https")
                .host("maps.googleapis.com")
                .path("/maps/api/distancematrix/json")
                .queryParam("key", API_KEY)
                .queryParam("origins", origin_address)
                .queryParam("destinations", dest_address)
                .queryParam("units", "imperial")
                .queryParam("mode", "walking")
                .build();
        ResponseEntity<ResponseRoute> responseW = new RestTemplate().getForEntity(uriW.toUriString(), ResponseRoute.class);
        ResponseRoute bodyW = responseW.getBody();

        UriComponents uriT = UriComponentsBuilder.newInstance()
                .scheme("https")
                .host("maps.googleapis.com")
                .path("/maps/api/distancematrix/json")
                .queryParam("key", API_KEY)
                .queryParam("origins", origin_address)
                .queryParam("destinations", dest_address)
                .queryParam("units", "imperial")
                .queryParam("mode", "transit")
                .build();
        ResponseEntity<ResponseRoute> responseT = new RestTemplate().getForEntity(uriT.toUriString(), ResponseRoute.class);
        ResponseRoute bodyT = responseT.getBody();
        String resp = "{\"originlat\":\"" + bodyOrigin.getResult()[0].getGeometry().getLocation().getLat() + "\",\"originlng\":\"" + bodyOrigin.getResult()[0].getGeometry().getLocation().getLng() + "\"," + "\"destinationlat\":\"" + bodyDest.getResult()[0].getGeometry().getLocation().getLat() + "\",\"destinationlng\":\"" + bodyDest.getResult()[0].getGeometry().getLocation().getLng() + "\",\"distanceD\":\"" + bodyD.getRow()[0].getElements()[0].getDistance().getDistance() + "\",\"durationD\":\"" + bodyD.getRow()[0].getElements()[0].getDuration().getTime() + "\",\"distanceW\":\"" + bodyW.getRow()[0].getElements()[0].getDistance().getDistance() + "\",\"durationW\":\"" + bodyW.getRow()[0].getElements()[0].getDuration().getTime() + "\",\"distanceT\":\"" + bodyT.getRow()[0].getElements()[0].getDistance().getDistance() + "\",\"durationT\":\"" + bodyT.getRow()[0].getElements()[0].getDuration().getTime() + "\"}";
        System.out.println(resp);
        return resp;
    }
}
