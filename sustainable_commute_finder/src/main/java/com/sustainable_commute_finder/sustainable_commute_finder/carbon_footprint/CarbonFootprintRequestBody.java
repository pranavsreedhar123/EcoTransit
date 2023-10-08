package com.sustainable_commute_finder.sustainable_commute_finder.carbon_footprint;

import com.fasterxml.jackson.annotation.JsonProperty;

public class CarbonFootprintRequestBody {
        @JsonProperty("type")
        private String type;

        @JsonProperty("distance_unit")
        private String distanceUnit;

        @JsonProperty("distance_value")
        private double distanceValue;

        @JsonProperty("vehicle_model_id")
        private String vehicleModelId;

        public String getType() {
                return type;
        }

        public void setType(String type) {
                this.type = type;
        }


        public String getDistanceUnit() {
                return distanceUnit;
        }

        public void setDistanceUnit(String distanceUnit) {
                this.distanceUnit = distanceUnit;
        }

        public double getDistanceValue() {
                return distanceValue;
        }

        public void setDistanceValue(double distanceValue) {
                this.distanceValue = distanceValue;
        }

        public String getVehicleModelId() {
                return vehicleModelId;
        }

        public void setVehicleModelId(String vehicleModelId) {
                this.vehicleModelId = vehicleModelId;
        }
}
