package com.findmyleak.controller;

import com.findmyleak.dto.ScanRequestDto;
import com.findmyleak.exception.ExternalApiException;
import com.findmyleak.service.LeakScanService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;
import java.util.Map;

@RestController
@RequestMapping("/api/scan")
@RequiredArgsConstructor
@Slf4j
public class ScanController {
    
    private final LeakScanService leakScanService;
    
    @PostMapping
    public ResponseEntity<Map<String, Object>> scanForLeaks(
            @RequestBody ScanRequestDto request,
            HttpServletRequest httpRequest) {
        
        try {
            String clientIp = getClientIpAddress(httpRequest);
            log.info("Received scan request for query: {} from IP: {}", request.getQuery(), clientIp);
            
            if (request.getQuery() == null || request.getQuery().trim().isEmpty()) {
                return ResponseEntity.badRequest().body(
                    Map.of("error", true, "message", "Search query is required")
                );
            }
            
            Map<String, Object> result = leakScanService.scanForLeaks(request.getQuery(), clientIp);
            return ResponseEntity.ok(result);
            
        } catch (ExternalApiException e) {
            log.error("External API error: {} (Status: {})", e.getMessage(), e.getStatusCode());
            
            // Map external API status codes to appropriate HTTP responses
            HttpStatus responseStatus;
            if (e.getStatusCode() >= 400 && e.getStatusCode() < 500) {
                responseStatus = HttpStatus.BAD_REQUEST;
            } else if (e.getStatusCode() >= 500) {
                responseStatus = HttpStatus.BAD_GATEWAY;
            } else {
                responseStatus = HttpStatus.SERVICE_UNAVAILABLE;
            }
            
            return ResponseEntity.status(responseStatus).body(Map.of(
                "error", true, 
                "message", "External service error: " + e.getMessage(),
                "externalStatusCode", e.getStatusCode(),
                "timestamp", java.time.LocalDateTime.now().toString()
            ));
            
        } catch (Exception e) {
            log.error("Error processing scan request: {}", e.getMessage(), e);
            return ResponseEntity.internalServerError().body(
                Map.of("error", true, "message", "Internal server error: " + e.getMessage())
            );
        }
    }
    
    private String getClientIpAddress(HttpServletRequest request) {
        String[] headers = {"X-Forwarded-For", "X-Real-IP", "Proxy-Client-IP", 
                           "WL-Proxy-Client-IP", "HTTP_X_FORWARDED_FOR", "HTTP_X_FORWARDED", 
                           "HTTP_X_CLUSTER_CLIENT_IP", "HTTP_CLIENT_IP", "HTTP_FORWARDED_FOR", 
                           "HTTP_FORWARDED", "HTTP_VIA", "REMOTE_ADDR"};
        
        for (String header : headers) {
            String ip = request.getHeader(header);
            if (ip != null && !ip.isEmpty() && !"unknown".equalsIgnoreCase(ip)) {
                return ip.split(",")[0];
            }
        }
        
        return request.getRemoteAddr();
    }
}