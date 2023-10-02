package com.sustainable_commute_finder.sustainable_commute_finder;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ResponseRoute {
    @JsonProperty("destination_addresses")
    private String[] dest_address;
    @JsonProperty("origin_addresses")
    private String[] origin_address;
    @JsonProperty("rows")
    private Row[] row;

    public String[] getDest_address() {
        return dest_address;
    }

    public void setDest_address(String[] dest_address) {
        this.dest_address = dest_address;
    }

    public String[] getOrigin_address() {
        return origin_address;
    }

    public void setOrigin_address(String[] origin_address) {
        this.origin_address = origin_address;
    }

    public Row[] getRow() {
        return row;
    }

    public void setRow(Row[] row) {
        this.row = row;
    }
}
