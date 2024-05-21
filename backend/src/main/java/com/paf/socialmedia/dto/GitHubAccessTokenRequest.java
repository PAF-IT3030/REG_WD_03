package com.paf.socialmedia.dto;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GitHubAccessTokenRequest {

    private String client_id;
    private String client_secret;
    private String code;
    private String redirect_uri;

}
