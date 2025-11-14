package com.findmyleak.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "delete_requests")
public class DeleteRequest {
    @Id
    private String id;
    private String email;
    private String phone;
    private String fullName;
    private String reason;
    private String status; // PENDING, PROCESSED, REJECTED
    private LocalDateTime requestedAt;
    private LocalDateTime processedAt;
    private String ipAddress;
}