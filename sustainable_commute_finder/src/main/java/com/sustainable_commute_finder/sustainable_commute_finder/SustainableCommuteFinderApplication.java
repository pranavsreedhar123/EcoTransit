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

