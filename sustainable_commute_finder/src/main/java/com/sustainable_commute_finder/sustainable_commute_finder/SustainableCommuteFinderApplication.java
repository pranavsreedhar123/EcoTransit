package com.sustainable_commute_finder.sustainable_commute_finder;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;


@SpringBootApplication
public class SustainableCommuteFinderApplication {

	public static void main(String[] args) {
		SpringApplication.run(SustainableCommuteFinderApplication.class, args);
	}

}

@RestController
class MapController {
	private static final Object API_KEY = "";
	@RequestMapping(method = RequestMethod.GET, value = "/getLocation/{address}")
	public String getMap(@PathVariable String address) {
		UriComponents uri = UriComponentsBuilder.newInstance()
				.scheme("https")
				.host("maps.googleapis.com")
				.path("/maps/api/geocode/json")
				.queryParam("key", API_KEY)
				.queryParam("address", address)
				.build();

		ResponseEntity<Response> response = new RestTemplate().getForEntity(uri.toUriString(), Response.class);
		Response body = response.getBody();
		String location = body.getResult()[0].getGeometry().getLocation().getLat() + ", " + body.getResult()[0].getGeometry().getLocation().getLng();
		System.out.println(location);
//		UriComponents uriMap = UriComponentsBuilder.newInstance()
//				.scheme("https")
//				.host("maps.googleapis.com")
//				.path("/maps/api/staticmap")
//				.queryParam("key", API_KEY)
//				.queryParam("zoom", "12")
//				.queryParam("center", location)
//				.queryParam("size", "300x1000")
//				.build();
//		ResponseEntity<Response> responseMap = new RestTemplate().getForEntity(uriMap.toUriString(), Response.class);
		return location;
//		return "index";
	}
}

