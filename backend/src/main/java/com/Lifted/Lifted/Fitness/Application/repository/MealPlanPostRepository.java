package com.Lifted.Lifted.Fitness.Application.repository;

import java.util.List;
import java.util.Optional;

import com.Lifted.Lifted.Fitness.Application.entity.MealPlanPostEntity;
import com.Lifted.Lifted.Fitness.Application.entity.MealPlanPostEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MealPlanPostRepository extends MongoRepository<MealPlanPostEntity, String> {
    Optional<List<MealPlanPostEntity>> findByUserId(String id);
    Optional<List<MealPlanPostEntity>> findByUserIdOrderByCreatedAtDesc(String id);

}
