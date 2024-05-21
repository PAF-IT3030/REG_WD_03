package com.paf.socialmedia.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class AuthResponse {
    private String error;
    private String data;
    private String accessToken;
}
