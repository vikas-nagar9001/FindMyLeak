package com.findmyleak.repository;

import com.findmyleak.model.BreachData;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BreachDataRepository extends MongoRepository<BreachData, String> {
    List<BreachData> findBySearchQuery(String searchQuery);
    List<BreachData> findBySearchQueryAndBreachName(String searchQuery, String breachName);
}