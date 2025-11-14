package com.findmyleak.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;


@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "breach_data")
@Data
public class BreachData {
    @Id
    private String id;
    private String searchQuery;
    private String breachName;
    private String infoLeak;
    private Integer numOfResults;
    private List<Map<String, Object>> data;
    private LocalDateTime searchedAt;
    private String searchIp;
}