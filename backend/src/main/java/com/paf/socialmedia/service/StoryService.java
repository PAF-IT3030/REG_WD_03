package com.paf.socialmedia.service;

import com.paf.socialmedia.dto.CommentDTO;
import com.paf.socialmedia.dto.StoryDTO;
import com.paf.socialmedia.dto.StoryDTO;
import com.paf.socialmedia.model.Comment;
import com.paf.socialmedia.model.Story;
import com.paf.socialmedia.model.Story;
import com.paf.socialmedia.model.User;
import com.paf.socialmedia.repository.CommentRepository;
import com.paf.socialmedia.repository.StoryRepository;
import com.paf.socialmedia.repository.StoryRepository;
import com.paf.socialmedia.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class StoryService {
    @Autowired
    private StoryRepository storyRepository;

    @Autowired
    private UserRepository userRepository;

    public ResponseEntity<?> getStoryById(String id){
        Optional<Story> story =  storyRepository.findById(id);
        if(story.isPresent()){
            return new ResponseEntity<>(story.get(), HttpStatus.OK);
        }else{
            return new ResponseEntity<>("No Story Found",HttpStatus.NOT_FOUND);
        }
    }
    public ResponseEntity<?> getStorys(){
        List<Story> storys = storyRepository.findAll();

        List<StoryDTO> storyDTOList = new ArrayList<>();

        for (Story story:storys) {
            StoryDTO storyDTO = new StoryDTO();
            storyDTO.setId(story.getId());
            storyDTO.setCaption(story.getCaption());
            storyDTO.setImgLink(story.getImgLink());
            storyDTO.setUpdatedAt(story.getUpdatedAt());
            storyDTO.setCreatedAt(story.getCreatedAt());
            storyDTO.setUserId(story.getUserId());

            Optional<User> user =  userRepository.findById(story.getUserId());
            if(user.isPresent()) {
                storyDTO.setUsername(user.get().getUsername());
                storyDTO.setProfileImage(user.get().getProfileImage());
            }
            if(user.isPresent()) {
                storyDTOList.add(storyDTO);
            }

        }

        return new ResponseEntity<List<StoryDTO>>(storyDTOList, HttpStatus.OK);
    }

    public ResponseEntity<?> getStorysByUserId(String userId) {
        List<Story> storys = storyRepository.findByUserId(userId);
        List<StoryDTO> storyDTOList = new ArrayList<>();

        for (Story story:storys) {
            StoryDTO storyDTO = new StoryDTO();
            storyDTO.setId(story.getId());
            storyDTO.setCaption(story.getCaption());
            storyDTO.setImgLink(story.getImgLink());
            storyDTO.setUpdatedAt(story.getUpdatedAt());
            storyDTO.setCreatedAt(story.getCreatedAt());
            storyDTO.setUserId(story.getUserId());

            Optional<User> user =  userRepository.findById(story.getUserId());
            if(user.isPresent()) {
                storyDTO.setUsername(user.get().getUsername());
                storyDTO.setProfileImage(user.get().getProfileImage());
            }

            if(user.isPresent()) {
                storyDTOList.add(storyDTO);
            }

        }

        return new ResponseEntity<List<StoryDTO>>(storyDTOList, HttpStatus.OK);
    }
    public ResponseEntity<?> saveStory(Story storyShare){
        try{
            storyShare.setCreatedAt(new Date(System.currentTimeMillis()));
            storyShare.setUpdatedAt(new Date(System.currentTimeMillis()));
            storyRepository.save(storyShare);
            return new ResponseEntity<Story>(storyShare, HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<?> updateStoryById(String id,Story story){
        Optional<Story> existingStory =  storyRepository.findById(id);
        if(existingStory.isPresent()){
            Story updateStory = existingStory.get();
            if(story.getCaption() != null) {
                updateStory.setCaption(story.getCaption());
            }
            if(story.getImgLink() != null) {
                updateStory.setImgLink(story.getImgLink());
            }
            updateStory.setUpdatedAt(new Date(System.currentTimeMillis()));
            return new ResponseEntity<>(storyRepository.save(updateStory), HttpStatus.OK);
        }else{
            return new ResponseEntity<>("Story Update Error",HttpStatus.NOT_FOUND);
        }
    }
    public ResponseEntity<?> deleteStoryById(String id){
        try{
            storyRepository.deleteById(id);
            return new ResponseEntity<>("Success deleted with " + id,HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.NOT_FOUND);
        }
    }
}
