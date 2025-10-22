package project1.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project1.example.demo.model.GalleryPhoto;
import project1.example.demo.repository.GalleryPhotoRepository;
import java.util.List;
import java.util.Optional;

@Service
public class GalleryPhotoService {
    
    @Autowired
    private GalleryPhotoRepository galleryPhotoRepository;
    
    // Get all photos
    public List<GalleryPhoto> getAllPhotos() {
        return galleryPhotoRepository.findAllByOrderBySortOrderAsc();
    }
    
    // Get photo by ID
    public Optional<GalleryPhoto> getPhotoById(Long id) {
        return galleryPhotoRepository.findById(id);
    }
    
    // Get photos by category
    public List<GalleryPhoto> getPhotosByCategory(String category) {
        if ("all".equalsIgnoreCase(category)) {
            return getAllPhotos();
        }
        return galleryPhotoRepository.findByCategoryOrderBySortOrderAsc(category);
    }
    
    // Get featured photos
    public List<GalleryPhoto> getFeaturedPhotos() {
        return galleryPhotoRepository.findByIsFeaturedTrue();
    }
    
    // Search photos
    public List<GalleryPhoto> searchPhotos(String searchTerm) {
        if (searchTerm == null || searchTerm.trim().isEmpty()) {
            return getAllPhotos();
        }
        
        List<GalleryPhoto> titleResults = galleryPhotoRepository.searchByTitle(searchTerm.trim());
        List<GalleryPhoto> descriptionResults = galleryPhotoRepository.searchByDescription(searchTerm.trim());
        List<GalleryPhoto> tagResults = galleryPhotoRepository.searchByTags(searchTerm.trim());
        
        // Combine and remove duplicates
        titleResults.addAll(descriptionResults);
        titleResults.addAll(tagResults);
        return titleResults.stream()
                .distinct()
                .sorted((p1, p2) -> Integer.compare(p1.getSortOrder(), p2.getSortOrder()))
                .toList();
    }
    
    // Create new photo
    public GalleryPhoto createPhoto(GalleryPhoto photo) {
        return galleryPhotoRepository.save(photo);
    }
    
    // Update photo
    public Optional<GalleryPhoto> updatePhoto(Long id, GalleryPhoto photoDetails) {
        return galleryPhotoRepository.findById(id)
                .map(existingPhoto -> {
                    existingPhoto.setTitleEn(photoDetails.getTitleEn());
                    existingPhoto.setTitleHi(photoDetails.getTitleHi());
                    existingPhoto.setCategory(photoDetails.getCategory());
                    existingPhoto.setUrl(photoDetails.getUrl());
                    existingPhoto.setThumbnail(photoDetails.getThumbnail());
                    existingPhoto.setDescriptionEn(photoDetails.getDescriptionEn());
                    existingPhoto.setDescriptionHi(photoDetails.getDescriptionHi());
                    existingPhoto.setDate(photoDetails.getDate());
                    existingPhoto.setLocation(photoDetails.getLocation());
                    existingPhoto.setPhotographer(photoDetails.getPhotographer());
                    existingPhoto.setTags(photoDetails.getTags());
                    existingPhoto.setIsFeatured(photoDetails.getIsFeatured());
                    existingPhoto.setSortOrder(photoDetails.getSortOrder());
                    return galleryPhotoRepository.save(existingPhoto);
                });
    }
    
    // Delete photo
    public boolean deletePhoto(Long id) {
        if (galleryPhotoRepository.existsById(id)) {
            galleryPhotoRepository.deleteById(id);
            return true;
        }
        return false;
    }
    
    // Get available categories
    public List<String> getAvailableCategories() {
        return galleryPhotoRepository.findAll().stream()
                .map(GalleryPhoto::getCategory)
                .distinct()
                .filter(category -> category != null && !category.trim().isEmpty())
                .sorted()
                .toList();
    }
    
    // Get photos by photographer
    public List<GalleryPhoto> getPhotosByPhotographer(String photographer) {
        return galleryPhotoRepository.findByPhotographerContainingIgnoreCase(photographer);
    }
    
    // Get photos by location
    public List<GalleryPhoto> getPhotosByLocation(String location) {
        return galleryPhotoRepository.findByLocationContainingIgnoreCase(location);
    }
    
    // Get photos by date range
    public List<GalleryPhoto> getPhotosByDateRange(java.time.LocalDate startDate, java.time.LocalDate endDate) {
        return galleryPhotoRepository.findByDateBetween(startDate, endDate);
    }

    public void reorderPhotos(List<GalleryPhoto> photos) {
        for (GalleryPhoto photo : photos) {
            galleryPhotoRepository.findById(photo.getId()).ifPresent(existing -> {
                existing.setSortOrder(photo.getSortOrder());
                galleryPhotoRepository.save(existing);
            });
        }
    }
} 