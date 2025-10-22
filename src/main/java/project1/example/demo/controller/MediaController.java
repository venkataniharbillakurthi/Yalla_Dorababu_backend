package project1.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project1.example.demo.model.Media;
import project1.example.demo.service.MediaService;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/media")
public class MediaController {
    
    @Autowired
    private MediaService mediaService;
    
    // Get all media
    @GetMapping
    public ResponseEntity<List<Media>> getAllMedia() {
        List<Media> media = mediaService.getAllMedia();
        return ResponseEntity.ok(media);
    }
    
    // Get media by ID
    @GetMapping("/{id}")
    public ResponseEntity<Media> getMediaById(@PathVariable Long id) {
        Optional<Media> media = mediaService.getMediaById(id);
        return media.map(ResponseEntity::ok)
                   .orElse(ResponseEntity.notFound().build());
    }
    
    // Get media by type
    @GetMapping("/type/{type}")
    public ResponseEntity<List<Media>> getMediaByType(@PathVariable String type) {
        List<Media> media = mediaService.getMediaByType(type);
        return ResponseEntity.ok(media);
    }
    
    // Get media by category
    @GetMapping("/category/{category}")
    public ResponseEntity<List<Media>> getMediaByCategory(@PathVariable String category) {
        List<Media> media = mediaService.getMediaByCategory(category);
        return ResponseEntity.ok(media);
    }
    
    // Get featured media
    @GetMapping("/featured")
    public ResponseEntity<List<Media>> getFeaturedMedia() {
        List<Media> media = mediaService.getFeaturedMedia();
        return ResponseEntity.ok(media);
    }
    
    // Get media with video content
    @GetMapping("/video")
    public ResponseEntity<List<Media>> getMediaWithVideo() {
        List<Media> media = mediaService.getMediaWithVideo();
        return ResponseEntity.ok(media);
    }
    
    // Search media
    @GetMapping("/search")
    public ResponseEntity<List<Media>> searchMedia(@RequestParam String q) {
        List<Media> media = mediaService.searchMedia(q);
        return ResponseEntity.ok(media);
    }
    
    // Get available types
    @GetMapping("/types")
    public ResponseEntity<List<String>> getAvailableTypes() {
        List<String> types = mediaService.getAvailableTypes();
        return ResponseEntity.ok(types);
    }
    
    // Get available categories
    @GetMapping("/categories")
    public ResponseEntity<List<String>> getAvailableCategories() {
        List<String> categories = mediaService.getAvailableCategories();
        return ResponseEntity.ok(categories);
    }
    
    // Create new media
    @PostMapping
    public ResponseEntity<Media> createMedia(@RequestBody Media media) {
        Media createdMedia = mediaService.createMedia(media);
        return ResponseEntity.ok(createdMedia);
    }
    
    // Update media
    @PutMapping("/{id}")
    public ResponseEntity<Media> updateMedia(@PathVariable Long id, @RequestBody Media mediaDetails) {
        Optional<Media> updatedMedia = mediaService.updateMedia(id, mediaDetails);
        return updatedMedia.map(ResponseEntity::ok)
                          .orElse(ResponseEntity.notFound().build());
    }
    
    // Delete media
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMedia(@PathVariable Long id) {
        boolean deleted = mediaService.deleteMedia(id);
        return deleted ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
    }
} 