package com.paf.socialmedia.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "SocialUser")
public class SocialUserEntity {

    @Id
    private String id;
    private String googleId;
    private String userEmail;
    private String icon;
    private String gitId;
    private String name;

}
