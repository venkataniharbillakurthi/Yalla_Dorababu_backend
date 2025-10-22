package project1.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project1.example.demo.model.GalleryPhoto;
import project1.example.demo.service.GalleryPhotoService;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/gallery")
public class GalleryPhotoController {
    
    @Autowired
    private GalleryPhotoService galleryPhotoService;
    
    // Get all photos
    @GetMapping
    public ResponseEntity<List<GalleryPhoto>> getAllPhotos() {
        List<GalleryPhoto> photos = galleryPhotoService.getAllPhotos();
        return ResponseEntity.ok(photos);
    }
    
    // Get photo by ID
    @GetMapping("/{id}")
    public ResponseEntity<GalleryPhoto> getPhotoById(@PathVariable Long id) {
        Optional<GalleryPhoto> photo = galleryPhotoService.getPhotoById(id);
        return photo.map(ResponseEntity::ok)
                   .orElse(ResponseEntity.notFound().build());
    }
    
    // Get photos by category
    @GetMapping("/category/{category}")
    public ResponseEntity<List<GalleryPhoto>> getPhotosByCategory(@PathVariable String category) {
        List<GalleryPhoto> photos = galleryPhotoService.getPhotosByCategory(category);
        return ResponseEntity.ok(photos);
    }
    
    // Get featured photos
    @GetMapping("/featured")
    public ResponseEntity<List<GalleryPhoto>> getFeaturedPhotos() {
        List<GalleryPhoto> photos = galleryPhotoService.getFeaturedPhotos();
        return ResponseEntity.ok(photos);
    }
    
    // Search photos
    @GetMapping("/search")
    public ResponseEntity<List<GalleryPhoto>> searchPhotos(@RequestParam String q) {
        List<GalleryPhoto> photos = galleryPhotoService.searchPhotos(q);
        return ResponseEntity.ok(photos);
    }
    
    // Get available categories
    @GetMapping("/categories")
    public ResponseEntity<List<String>> getAvailableCategories() {
        List<String> categories = galleryPhotoService.getAvailableCategories();
        return ResponseEntity.ok(categories);
    }
    
    // Get photos by photographer
    @GetMapping("/photographer/{photographer}")
    public ResponseEntity<List<GalleryPhoto>> getPhotosByPhotographer(@PathVariable String photographer) {
        List<GalleryPhoto> photos = galleryPhotoService.getPhotosByPhotographer(photographer);
        return ResponseEntity.ok(photos);
    }
    
    // Get photos by location
    @GetMapping("/location/{location}")
    public ResponseEntity<List<GalleryPhoto>> getPhotosByLocation(@PathVariable String location) {
        List<GalleryPhoto> photos = galleryPhotoService.getPhotosByLocation(location);
        return ResponseEntity.ok(photos);
    }
    
    // Create new photo
    @PostMapping
    public ResponseEntity<GalleryPhoto> createPhoto(@RequestBody GalleryPhoto photo) {
        GalleryPhoto createdPhoto = galleryPhotoService.createPhoto(photo);
        return ResponseEntity.ok(createdPhoto);
    }
    
    // Update photo
    @PutMapping("/{id}")
    public ResponseEntity<GalleryPhoto> updatePhoto(@PathVariable Long id, @RequestBody GalleryPhoto photoDetails) {
        Optional<GalleryPhoto> updatedPhoto = galleryPhotoService.updatePhoto(id, photoDetails);
        return updatedPhoto.map(ResponseEntity::ok)
                          .orElse(ResponseEntity.notFound().build());
    }
    
    // Delete photo
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePhoto(@PathVariable Long id) {
        boolean deleted = galleryPhotoService.deletePhoto(id);
        return deleted ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
    }

    @PostMapping("/reorder")
    public ResponseEntity<Void> reorderPhotos(@RequestBody List<GalleryPhoto> photos) {
        galleryPhotoService.reorderPhotos(photos);
        return ResponseEntity.ok().build();
    }
} 