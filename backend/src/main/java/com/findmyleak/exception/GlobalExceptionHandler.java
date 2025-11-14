package com.findmyleak.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.LocalDateTime;
import java.util.Map;

@ControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    @ExceptionHandler(ExternalApiException.class)
    public ResponseEntity<Map<String, Object>> handleExternalApiException(ExternalApiException e) {
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
            "timestamp", LocalDateTime.now().toString()
        ));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, Object>> handleGenericException(Exception e) {
        log.error("Unexpected error: {}", e.getMessage(), e);
        
        return ResponseEntity.internalServerError().body(Map.of(
            "error", true, 
            "message", "Internal server error occurred",
            "timestamp", LocalDateTime.now().toString()
        ));
    }
}