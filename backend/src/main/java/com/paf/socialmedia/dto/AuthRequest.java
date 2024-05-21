package com.paf.socialmedia.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthRequest {
    private String userEmail;
    private String googleId;
    private String name;
    private String icon;
}
