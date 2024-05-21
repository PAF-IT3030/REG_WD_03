package com.paf.socialmedia.dto;

import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class StoryDTO {
    private String id;
    private String userId;
    private String username;
    private String profileImage;
    private List<String> imgLink;
    private String caption;
    private Date createdAt;
    private Date updatedAt;
}
