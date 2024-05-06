package com.Lifted.Lifted.Fitness.Application.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserSignInEntity {
    private String email;
    private String password;
}

