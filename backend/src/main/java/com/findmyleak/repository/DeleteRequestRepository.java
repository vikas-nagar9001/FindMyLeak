package com.findmyleak.repository;

import com.findmyleak.model.DeleteRequest;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DeleteRequestRepository extends MongoRepository<DeleteRequest, String> {
    List<DeleteRequest> findByEmail(String email);
    List<DeleteRequest> findByPhone(String phone);
    List<DeleteRequest> findByStatus(String status);
}