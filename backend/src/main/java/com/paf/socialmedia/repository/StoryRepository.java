package com.paf.socialmedia.repository;

import com.paf.socialmedia.model.Post;
import com.paf.socialmedia.model.Story;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StoryRepository extends MongoRepository<Story,String> {
    List<Story> findByUserId(String userId);
}
