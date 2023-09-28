package com.sustainable_commute_finder.sustainable_commute_finder;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/hello")
@CrossOrigin(origins="http://localhost:3000")
public class HelloWorldController {
    
    @GetMapping
    public Response helloWorld() {
        return new Response("Hello, world!");
    }
}
