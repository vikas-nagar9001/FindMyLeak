package com.findmyleak.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "search_history")
public class SearchHistory {
    @Id
    private String id;
    private String searchQuery;
    private String ipAddress;
    private LocalDateTime searchedAt;
    private Integer totalBreaches;
    private Integer totalRecords;
    private Map<String, Object> apiResponse;
}