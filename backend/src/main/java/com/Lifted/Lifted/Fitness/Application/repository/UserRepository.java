package com.Lifted.Lifted.Fitness.Application.repository;

import java.util.Optional;

import com.Lifted.Lifted.Fitness.Application.entity.UserEntity;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends MongoRepository<UserEntity, String> {

    Optional<UserEntity> findByEmail(String email);

}
