package com.sustainable_commute_finder.sustainable_commute_finder;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

@RestController
class MapController {
    private static final Object API_KEY = "AIzaSyC4LzT70To0xGNed07uFGE3Uz4gSpXck0s";
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

        ResponseEntity<Response> responseDest = new RestTemplate().getForEntity(uriDest.toUriString(), Response.class);
        Response bodyDest = responseDest.getBody();
        String locationDest = bodyDest.getResult()[0].getGeometry().getLocation().getLat() + ", " + bodyDest.getResult()[0].getGeometry().getLocation().getLng();
//		System.out.println(location);
        ResponseEntity<Response> responseOrigin = new RestTemplate().getForEntity(uriOrigin.toUriString(), Response.class);
        Response bodyOrigin = responseOrigin.getBody();
        String locationOrigin = bodyOrigin.getResult()[0].getGeometry().getLocation().getLat() + ", " + bodyOrigin.getResult()[0].getGeometry().getLocation().getLng();
//		System.out.println(location);

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
        System.out.println(bodyD.getDest_address()[0]);
        String resp = "Origin Address: " +  bodyD.getOrigin_address()[0] + "\nOrigin Address (coordinates): " + locationOrigin + "\n\nDestination Address: " + bodyD.getDest_address()[0] +  "\nDestination Address (coordinates): " + locationDest + "\n\nDuration: " + bodyD.getRow()[0].getElements()[0].getDuration().getTime() + "\nDistance: " + bodyD.getRow()[0].getElements()[0].getDistance().getDistance() + "\nMode: Driving" + "\n\nDuration: " + bodyW.getRow()[0].getElements()[0].getDuration().getTime() + "\nDistance: " + bodyW.getRow()[0].getElements()[0].getDistance().getDistance() + "\nMode: Walking" +  "\n\nDuration: " + bodyT.getRow()[0].getElements()[0].getDuration().getTime() + "\nDistance: " + bodyT.getRow()[0].getElements()[0].getDistance().getDistance() + "\nMode: Transit (If Available, else Driving)";

        return resp;
    }
}

