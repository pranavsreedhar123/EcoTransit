package com.sustainable_commute_finder.sustainable_commute_finder;

import org.junit.jupiter.api.BeforeEach;
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
public class EnvironmentalImpactControllerTest {

    @Autowired
    private MockMvc mockMvc;



//    @Test
//    public void testCalculateEnvironmentalImpact() throws Exception {
//        double distance = 10.0;
//        String mode = "walking";
//
//        mockMvc.perform(MockMvcRequestBuilders.get("/environmental-impact/{distance}/{mode}", distance, mode)
//                        .contentType(MediaType.APPLICATION_JSON))
//                .andExpect(MockMvcResultMatchers.status().isOk())
//                .andExpect(MockMvcResultMatchers.jsonPath("$.commuteDistance").value(distance))
//                .andExpect(MockMvcResultMatchers.jsonPath("$.commuteMode").value(mode))
//                .andExpect(MockMvcResultMatchers.jsonPath("$.positiveImpact").value(1.0));
//    }
}
