package com.paf.socialmedia.controller;

import com.paf.socialmedia.model.Story;
import com.paf.socialmedia.service.StoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/story")
public class StoryController {
    @Autowired
    private StoryService postService;
    @PostMapping
    public ResponseEntity<?> saveStory(@RequestBody Story post){
        return postService.saveStory(post);
    }
    @GetMapping
    public ResponseEntity<?> getStorys(){
        return postService.getStorys();
    }
    @GetMapping("/user/{id}")
    public ResponseEntity<?> getStorysByUserId(@PathVariable String id){
        return postService.getStorysByUserId(id);
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> getStoryById(@PathVariable String id){
        return postService.getStoryById(id);
    }
    @PutMapping("/{id}")
    public ResponseEntity<?> updateStoryById(@PathVariable String id, @RequestBody Story post){
        return  postService.updateStoryById(id,post);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteStoryById(@PathVariable String id){
        return postService.deleteStoryById(id);
    }
}

