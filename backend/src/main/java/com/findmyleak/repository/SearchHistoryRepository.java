package com.findmyleak.repository;

import com.findmyleak.model.SearchHistory;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SearchHistoryRepository extends MongoRepository<SearchHistory, String> {
    List<SearchHistory> findBySearchQuery(String searchQuery);
    List<SearchHistory> findByIpAddress(String ipAddress);
}