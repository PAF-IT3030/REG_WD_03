package com.Lifted.Lifted.Fitness.Application.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthorizedEntity {
    private UserEntity user;
    private String token;
}
