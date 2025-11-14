package com.findmyleak.service;

import com.findmyleak.dto.LeakApiResponseDto;
import com.findmyleak.exception.ExternalApiException;
import com.findmyleak.model.BreachData;
import com.findmyleak.model.SearchHistory;
import com.findmyleak.repository.BreachDataRepository;
import com.findmyleak.repository.SearchHistoryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class LeakScanService {
    
    private final BreachDataRepository breachDataRepository;
    private final SearchHistoryRepository searchHistoryRepository;
    private final RestTemplate restTemplate = new RestTemplate();
    
    @Value("${leak.api.url}")
    private String leakApiUrl;
    
    @Value("${leak.api.token}")
    private String leakApiToken;
    
    public Map<String, Object> scanForLeaks(String query, String clientIp) throws ExternalApiException {
        log.info("Starting leak scan for query: {}", query);
        
        // Check if we have recent data in database
        List<BreachData> existingData = breachDataRepository.findBySearchQuery(query);
        if (!existingData.isEmpty() && isRecentData(existingData.get(0).getSearchedAt())) {
            log.info("Returning cached data for query: {}", query);
            return buildResponseFromCachedData(existingData);
        }

        // Call external API
        LeakApiResponseDto apiResponse = callLeakApi(query);
        
        // Save to database
        saveBreachData(query, apiResponse, clientIp);
        
        // Save search history
        saveSearchHistory(query, clientIp, apiResponse);
        
        // Transform response for frontend
        return transformApiResponse(apiResponse);
    }
    
    private LeakApiResponseDto callLeakApi(String query) throws ExternalApiException {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        
        Map<String, String> requestBody = new HashMap<>();
        requestBody.put("token", leakApiToken);
        requestBody.put("request", query);
        
        HttpEntity<Map<String, String>> request = new HttpEntity<>(requestBody, headers);
        
        try {
            ResponseEntity<LeakApiResponseDto> response = restTemplate.exchange(
                leakApiUrl,
                HttpMethod.POST,
                request,
                LeakApiResponseDto.class
            );
            
            if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
                return response.getBody();
            } else {
                throw new ExternalApiException("API returned empty response or error status", 
                    response.getStatusCode().value());
            }
        } catch (HttpClientErrorException e) {
            log.error("External API client error (4xx): {}", e.getMessage());
            throw new ExternalApiException("External API client error: " + e.getMessage(), 
                e.getStatusCode().value(), e.getResponseBodyAsString());
        } catch (HttpServerErrorException e) {
            log.error("External API server error (5xx): {}", e.getMessage());
            throw new ExternalApiException("External API server error: " + e.getMessage(), 
                e.getStatusCode().value(), e.getResponseBodyAsString());
        } catch (Exception e) {
            log.error("Unexpected error calling leak API: {}", e.getMessage());
            throw new ExternalApiException("Failed to connect to leak API: " + e.getMessage(), 503);
        }
    }
    
    private void saveBreachData(String query, LeakApiResponseDto apiResponse, String clientIp) {
        if (apiResponse.getList() != null) {
            List<BreachData> breachDataList = new ArrayList<>();
            
            apiResponse.getList().forEach((breachName, breachInfo) -> {
                BreachData breachData = new BreachData();
                breachData.setSearchQuery(query);
                breachData.setBreachName(breachName);
                breachData.setInfoLeak(breachInfo.getInfoLeak());
                breachData.setNumOfResults(breachInfo.getNumOfResults());
                breachData.setData(breachInfo.getData());
                breachData.setSearchedAt(LocalDateTime.now());
                breachData.setSearchIp(clientIp);
                
                breachDataList.add(breachData);
            });
            
            breachDataRepository.saveAll(breachDataList);
            log.info("Saved {} breach records for query: {}", breachDataList.size(), query);
        }
    }
    
    private void saveSearchHistory(String query, String clientIp, LeakApiResponseDto apiResponse) {
        SearchHistory searchHistory = new SearchHistory();
        searchHistory.setSearchQuery(query);
        searchHistory.setIpAddress(clientIp);
        searchHistory.setSearchedAt(LocalDateTime.now());
        searchHistory.setTotalBreaches(apiResponse.getNumOfDatabase());
        searchHistory.setTotalRecords(apiResponse.getNumOfResults());
        
        // Convert to Map for storage
        Map<String, Object> responseMap = new HashMap<>();
        responseMap.put("numOfDatabase", apiResponse.getNumOfDatabase());
        responseMap.put("numOfResults", apiResponse.getNumOfResults());
        responseMap.put("freeRequestsLeft", apiResponse.getFreeRequestsLeft());
        responseMap.put("price", apiResponse.getPrice());
        responseMap.put("searchTime", apiResponse.getSearchTime());
        searchHistory.setApiResponse(responseMap);
        
        searchHistoryRepository.save(searchHistory);
        log.info("Saved search history for query: {}", query);
    }
    
    private Map<String, Object> transformApiResponse(LeakApiResponseDto apiResponse) {
        Map<String, Object> response = new HashMap<>();
        
        if (apiResponse.getList() != null) {
            Map<String, Object> transformedList = new HashMap<>();
            
            apiResponse.getList().forEach((breachName, breachInfo) -> {
                Map<String, Object> breachData = new HashMap<>();
                breachData.put("Data", breachInfo.getData());
                breachData.put("InfoLeak", breachInfo.getInfoLeak());
                breachData.put("NumOfResults", breachInfo.getNumOfResults());
                
                transformedList.put(breachName, breachData);
            });
            
            response.put("List", transformedList);
        }
        
        response.put("NumOfDatabase", apiResponse.getNumOfDatabase());
        response.put("NumOfResults", apiResponse.getNumOfResults());
        response.put("free_requests_left", apiResponse.getFreeRequestsLeft());
        response.put("price", apiResponse.getPrice());
        response.put("search time", apiResponse.getSearchTime());
        
        return response;
    }
    
    private Map<String, Object> buildResponseFromCachedData(List<BreachData> cachedData) {
        Map<String, Object> response = new HashMap<>();
        Map<String, Object> list = new HashMap<>();
        
        int totalResults = 0;
        for (BreachData breach : cachedData) {
            Map<String, Object> breachInfo = new HashMap<>();
            breachInfo.put("Data", breach.getData());
            breachInfo.put("InfoLeak", breach.getInfoLeak());
            breachInfo.put("NumOfResults", breach.getNumOfResults());
            
            list.put(breach.getBreachName(), breachInfo);
            totalResults += breach.getNumOfResults();
        }
        
        response.put("List", list);
        response.put("NumOfDatabase", cachedData.size());
        response.put("NumOfResults", totalResults);
        response.put("free_requests_left", 99);
        response.put("price", 0);
        response.put("search time", 0.0);
        response.put("cached", true);
        
        return response;
    }
    
    private boolean isRecentData(LocalDateTime searchedAt) {
        // Consider data recent if it's less than 1 hour old
        return searchedAt.isAfter(LocalDateTime.now().minusHours(1));
    }
}