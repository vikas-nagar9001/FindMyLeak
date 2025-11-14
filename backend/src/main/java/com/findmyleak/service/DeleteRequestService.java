package com.findmyleak.service;

import com.findmyleak.dto.DeleteRequestDto;
import com.findmyleak.model.DeleteRequest;
import com.findmyleak.repository.DeleteRequestRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class DeleteRequestService {
    
    private final DeleteRequestRepository deleteRequestRepository;
    
    public DeleteRequest createDeleteRequest(DeleteRequestDto requestDto, String clientIp) {
        try {
            DeleteRequest deleteRequest = new DeleteRequest();
            deleteRequest.setEmail(requestDto.getEmail());
            deleteRequest.setPhone(requestDto.getPhone());
            deleteRequest.setFullName(requestDto.getFullName());
            deleteRequest.setReason(requestDto.getReason());
            deleteRequest.setStatus("PENDING");
            deleteRequest.setRequestedAt(LocalDateTime.now());
            deleteRequest.setIpAddress(clientIp);
            
            DeleteRequest saved = deleteRequestRepository.save(deleteRequest);
            log.info("Created delete request with ID: {} for email: {}", saved.getId(), requestDto.getEmail());
            
            return saved;
        } catch (Exception e) {
            log.error("Error creating delete request for email: {}", requestDto.getEmail(), e);
            throw new RuntimeException("Failed to create delete request: " + e.getMessage());
        }
    }
    
    public List<DeleteRequest> getAllDeleteRequests() {
        return deleteRequestRepository.findAll();
    }
    
    public List<DeleteRequest> getDeleteRequestsByStatus(String status) {
        return deleteRequestRepository.findByStatus(status);
    }
    
    public DeleteRequest updateDeleteRequestStatus(String requestId, String status) {
        try {
            DeleteRequest deleteRequest = deleteRequestRepository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Delete request not found"));
            
            deleteRequest.setStatus(status);
            if ("PROCESSED".equals(status) || "REJECTED".equals(status)) {
                deleteRequest.setProcessedAt(LocalDateTime.now());
            }
            
            DeleteRequest updated = deleteRequestRepository.save(deleteRequest);
            log.info("Updated delete request {} status to: {}", requestId, status);
            
            return updated;
        } catch (Exception e) {
            log.error("Error updating delete request status for ID: {}", requestId, e);
            throw new RuntimeException("Failed to update delete request: " + e.getMessage());
        }
    }
}