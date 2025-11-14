package com.findmyleak.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LeakApiResponseDto {
    @JsonProperty("List")
    private Map<String, BreachInfoDto> list;
    
    @JsonProperty("NumOfDatabase")
    private Integer numOfDatabase;
    
    @JsonProperty("NumOfResults")
    private Integer numOfResults;
    
    @JsonProperty("free_requests_left")
    private Integer freeRequestsLeft;
    
    @JsonProperty("price")
    private Double price;
    
    @JsonProperty("search time")
    private Double searchTime;
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class BreachInfoDto {
        @JsonProperty("Data")
        private List<Map<String, Object>> data;
        
        @JsonProperty("InfoLeak")
        private String infoLeak;
        
        @JsonProperty("NumOfResults")
        private Integer numOfResults;
    }
}