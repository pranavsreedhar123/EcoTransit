package com.sustainable_commute_finder.sustainable_commute_finder;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sustainable_commute_finder.sustainable_commute_finder.carbon_footprint.CarbonFootprintTransitRequestBody;
import com.sustainable_commute_finder.sustainable_commute_finder.carbon_footprint.CarbonFootprintVehicleRequestBody;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

@SpringBootTest
@AutoConfigureMockMvc
class CarbonFootprintControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
    }

    @AfterEach
    void tearDown() {
    }

    @Test
    public void testGetCarbonFootprintVehicle() throws Exception {
        CarbonFootprintVehicleRequestBody requestBody = new CarbonFootprintVehicleRequestBody();
        requestBody.setType("vehicle");
        requestBody.setVehicleModelId("7268a9b7-17e8-4c8d-acca-57059252afe9");
        requestBody.setDistanceValue(2000);
        requestBody.setDistanceUnit("km");

        mockMvc.perform(MockMvcRequestBuilders
                .post("/carbonFootprintVehicle")
                .contentType("application/json")
                .content(objectMapper.writeValueAsString(requestBody)))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    public void testGetCarbonFootprintTransit() throws Exception {
        CarbonFootprintTransitRequestBody requestBody = new CarbonFootprintTransitRequestBody();
        requestBody.setType("shipping");
        requestBody.setWeightUnit("g");
        requestBody.setWeightValue(200);
        requestBody.setDistanceValue(2000);
        requestBody.setDistanceUnit("km");
        requestBody.setTransportMethod("truck");

        mockMvc.perform(MockMvcRequestBuilders
                .post("/carbonFootprintTransit")
                .contentType("application/json")
                .content(objectMapper.writeValueAsString(requestBody)))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }
}