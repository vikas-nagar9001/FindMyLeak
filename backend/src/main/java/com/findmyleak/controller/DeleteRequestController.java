package com.findmyleak.controller;

import com.findmyleak.dto.DeleteRequestDto;
import com.findmyleak.model.DeleteRequest;
import com.findmyleak.service.DeleteRequestService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/delete-request")
@RequiredArgsConstructor
@Slf4j
public class DeleteRequestController {
    
    private final DeleteRequestService deleteRequestService;
    
    @PostMapping
    public ResponseEntity<Map<String, Object>> createDeleteRequest(
            @RequestBody DeleteRequestDto request,
            HttpServletRequest httpRequest) {
        
        try {
            String clientIp = getClientIpAddress(httpRequest);
            log.info("Received delete request from IP: {} for email: {}", clientIp, request.getEmail());
            
            // Basic validation
            if ((request.getEmail() == null || request.getEmail().trim().isEmpty()) &&
                (request.getPhone() == null || request.getPhone().trim().isEmpty())) {
                return ResponseEntity.badRequest().body(
                    Map.of("error", true, "message", "Either email or phone is required")
                );
            }
            
            DeleteRequest deleteRequest = deleteRequestService.createDeleteRequest(request, clientIp);
            
            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Delete request submitted successfully",
                "requestId", deleteRequest.getId(),
                "status", deleteRequest.getStatus()
            ));
            
        } catch (Exception e) {
            log.error("Error processing delete request: {}", e.getMessage(), e);
            return ResponseEntity.internalServerError().body(
                Map.of("error", true, "message", "Internal server error: " + e.getMessage())
            );
        }
    }
    
    @GetMapping
    public ResponseEntity<List<DeleteRequest>> getAllDeleteRequests() {
        try {
            List<DeleteRequest> requests = deleteRequestService.getAllDeleteRequests();
            return ResponseEntity.ok(requests);
        } catch (Exception e) {
            log.error("Error fetching delete requests: {}", e.getMessage(), e);
            return ResponseEntity.internalServerError().build();
        }
    }
    
    @GetMapping("/status/{status}")
    public ResponseEntity<List<DeleteRequest>> getDeleteRequestsByStatus(@PathVariable String status) {
        try {
            List<DeleteRequest> requests = deleteRequestService.getDeleteRequestsByStatus(status);
            return ResponseEntity.ok(requests);
        } catch (Exception e) {
            log.error("Error fetching delete requests by status: {}", e.getMessage(), e);
            return ResponseEntity.internalServerError().build();
        }
    }
    
    @PutMapping("/{requestId}/status/{status}")
    public ResponseEntity<Map<String, Object>> updateDeleteRequestStatus(
            @PathVariable String requestId,
            @PathVariable String status) {
        
        try {
            if (!isValidStatus(status)) {
                return ResponseEntity.badRequest().body(
                    Map.of("error", true, "message", "Invalid status. Valid values: PENDING, PROCESSED, REJECTED")
                );
            }
            
            DeleteRequest updated = deleteRequestService.updateDeleteRequestStatus(requestId, status);
            
            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Delete request status updated successfully",
                "requestId", updated.getId(),
                "status", updated.getStatus()
            ));
            
        } catch (Exception e) {
            log.error("Error updating delete request status: {}", e.getMessage(), e);
            return ResponseEntity.internalServerError().body(
                Map.of("error", true, "message", "Internal server error: " + e.getMessage())
            );
        }
    }
    
    private boolean isValidStatus(String status) {
        return "PENDING".equals(status) || "PROCESSED".equals(status) || "REJECTED".equals(status);
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