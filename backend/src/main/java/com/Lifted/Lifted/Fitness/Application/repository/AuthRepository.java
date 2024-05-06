package com.Lifted.Lifted.Fitness.Application.repository;

import com.Lifted.Lifted.Fitness.Application.entity.SocialUserEntity;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface AuthRepository extends MongoRepository<SocialUserEntity, String> {
    Optional<SocialUserEntity> findByGoogleId(String id);
    Optional<SocialUserEntity> findByGitId(String id);
}
