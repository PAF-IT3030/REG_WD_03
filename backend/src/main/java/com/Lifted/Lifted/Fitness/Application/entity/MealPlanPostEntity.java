package com.Lifted.Lifted.Fitness.Application.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "MealPost")
public class MealPlanPostEntity {
    @Id
    private String id;

    private String userId;

    private String originalUserId;

    private String content;

    private String image;

    private Instant createdAt;

    List<String> love = new ArrayList<>();

    List<String> share = new ArrayList<>();

    List<MealPlanCommentEntity> comment = new ArrayList<>();

    public void setId(Object o) {
    }

    public void setLove(List<String> objects) {
    }

    public void setShare(List<String> objects) {
    }

    public void setComment(ArrayList<Object> objects) {
    }
}
