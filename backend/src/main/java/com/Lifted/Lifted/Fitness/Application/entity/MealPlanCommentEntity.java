package com.Lifted.Lifted.Fitness.Application.entity;

import org.springframework.data.annotation.Id;

import java.time.Instant;

public class MealPlanCommentEntity {
    @Id
    private String id;

    private String userId;

    private String userFullname;

    private String content;

    private Instant createdAt;
}
