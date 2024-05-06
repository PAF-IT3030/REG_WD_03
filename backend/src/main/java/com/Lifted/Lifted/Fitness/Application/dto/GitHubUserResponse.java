package com.Lifted.Lifted.Fitness.Application.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GitHubUserResponse {

    private String id;
    private String avatar_url;
    private String name;

}
