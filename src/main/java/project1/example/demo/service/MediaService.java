package project1.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project1.example.demo.model.Media;
import project1.example.demo.repository.MediaRepository;
import java.util.List;
import java.util.Optional;

@Service
public class MediaService {
    
    @Autowired
    private MediaRepository mediaRepository;
    
    // Get all media
    public List<Media> getAllMedia() {
        return mediaRepository.findAllByOrderByDateDesc();
    }
    
    // Get media by ID
    public Optional<Media> getMediaById(Long id) {
        return mediaRepository.findById(id);
    }
    
    // Get media by type
    public List<Media> getMediaByType(String type) {
        if ("all".equalsIgnoreCase(type)) {
            return getAllMedia();
        }
        return mediaRepository.findByTypeOrderByDateDesc(type);
    }
    
    // Get media by category
    public List<Media> getMediaByCategory(String category) {
        if ("all".equalsIgnoreCase(category)) {
            return getAllMedia();
        }
        return mediaRepository.findByCategoryOrderByDateDesc(category);
    }
    
    // Get featured media
    public List<Media> getFeaturedMedia() {
        return mediaRepository.findByIsFeaturedTrue();
    }
    
    // Get media with video content
    public List<Media> getMediaWithVideo() {
        return mediaRepository.findMediaWithVideo();
    }
    
  
    // Search media
    public List<Media> searchMedia(String searchTerm) {
        if (searchTerm == null || searchTerm.trim().isEmpty()) {
            return getAllMedia();
        }
        
        List<Media> titleResults = mediaRepository.searchByTitle(searchTerm.trim());
        List<Media> descriptionResults = mediaRepository.searchByDescription(searchTerm.trim());
        
        // Combine and remove duplicates
        titleResults.addAll(descriptionResults);
        return titleResults.stream()
                .distinct()
                .sorted((m1, m2) -> m2.getDate().compareTo(m1.getDate()))
                .toList();
    }
    
    // Create new media
    public Media createMedia(Media media) {
        return mediaRepository.save(media);
    }
    
    // Update media
    public Optional<Media> updateMedia(Long id, Media mediaDetails) {
        return mediaRepository.findById(id)
                .map(existingMedia -> {
                    existingMedia.setTitleEn(mediaDetails.getTitleEn());
                    existingMedia.setTitleHi(mediaDetails.getTitleHi());
                    existingMedia.setDate(mediaDetails.getDate());
                    existingMedia.setDescriptionEn(mediaDetails.getDescriptionEn());
                    existingMedia.setDescriptionHi(mediaDetails.getDescriptionHi());
                    existingMedia.setThumbnail(mediaDetails.getThumbnail());
                    existingMedia.setVideoUrl(mediaDetails.getVideoUrl());
                    existingMedia.setAttendees(mediaDetails.getAttendees());
                    existingMedia.setType(mediaDetails.getType());
                    existingMedia.setCategory(mediaDetails.getCategory());
                    existingMedia.setIsFeatured(mediaDetails.getIsFeatured());
                    existingMedia.setSortOrder(mediaDetails.getSortOrder());
                    existingMedia.setImageUrl(mediaDetails.getImageUrl());
                    return mediaRepository.save(existingMedia);
                });
    }
    
    // Delete media
    public boolean deleteMedia(Long id) {
        if (mediaRepository.existsById(id)) {
            mediaRepository.deleteById(id);
            return true;
        }
        return false;
    }
    
    // Get available types
    public List<String> getAvailableTypes() {
        return mediaRepository.findAll().stream()
                .map(Media::getType)
                .distinct()
                .filter(type -> type != null && !type.trim().isEmpty())
                .sorted()
                .toList();
    }
    
    // Get available categories
    public List<String> getAvailableCategories() {
        return mediaRepository.findAll().stream()
                .map(Media::getCategory)
                .distinct()
                .filter(category -> category != null && !category.trim().isEmpty())
                .sorted()
                .toList();
    }
    
    // Get media by date range
    public List<Media> getMediaByDateRange(java.time.LocalDate startDate, java.time.LocalDate endDate) {
        return mediaRepository.findByDateBetween(startDate, endDate);
    }
} 