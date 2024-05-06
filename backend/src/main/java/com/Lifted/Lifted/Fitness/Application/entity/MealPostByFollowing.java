package com.Lifted.Lifted.Fitness.Application.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MealPostByFollowing
{

        private UserEntity user;
        private MealPlanPostEntity post;

}
