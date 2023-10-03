package com.sustainable_commute_finder.sustainable_commute_finder;

public class CarbonFootprintRequestBody {
        private String type;
        private String distance_unit;
        private double distance_value;
        private String vehicle_model_id;

        public String getType() {
                return type;
        }

        public void setType(String type) {
                this.type = type;
        }

        public String getDistance_unit() {
                return distance_unit;
        }

        public void setDistance_unit(String distance_unit) {
                this.distance_unit = distance_unit;
        }

        public double getDistance_value() {
                return distance_value;
        }

        public void setDistance_value(double distance_value) {
                this.distance_value = distance_value;
        }

        public String getVehicle_model_id() {
                return vehicle_model_id;
        }

        public void setVehicle_model_id(String vehicle_model_id) {
                this.vehicle_model_id = vehicle_model_id;
        }
}
