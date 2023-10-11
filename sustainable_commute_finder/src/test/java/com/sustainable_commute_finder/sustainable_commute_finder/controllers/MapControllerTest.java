package com.sustainable_commute_finder.sustainable_commute_finder.controllers;

import com.sustainable_commute_finder.sustainable_commute_finder.controllers.MapController;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

@SpringBootTest
@AutoConfigureMockMvc
class MapControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void getMap() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/getLocation/{dest_address}/{origin_address}", "New York", "Nashville")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.originlat").isNumber())
                .andExpect(MockMvcResultMatchers.jsonPath("$.originlng").isNumber())
                .andExpect(MockMvcResultMatchers.jsonPath("$.destinationlat").isNumber())
                .andExpect(MockMvcResultMatchers.jsonPath("$.destinationlng").isNumber())
                .andExpect(MockMvcResultMatchers.jsonPath("$.distanceD").isString())
                .andExpect(MockMvcResultMatchers.jsonPath("$.durationD").isString())
                .andExpect(MockMvcResultMatchers.jsonPath("$.distanceW").isString())
                .andExpect(MockMvcResultMatchers.jsonPath("$.durationW").isString())
                .andExpect(MockMvcResultMatchers.jsonPath("$.distanceT").isString())
                .andExpect(MockMvcResultMatchers.jsonPath("$.durationT").isString())
                .andExpect(MockMvcResultMatchers.jsonPath("$.distanceC").isString())
                .andExpect(MockMvcResultMatchers.jsonPath("$.durationC").isString());
    }
}