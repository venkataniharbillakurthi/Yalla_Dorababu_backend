package project1.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import project1.example.demo.model.GalleryPhoto;
import java.util.List;

@Repository
public interface GalleryPhotoRepository extends JpaRepository<GalleryPhoto, Long> {
    
    // Find photos by category
    List<GalleryPhoto> findByCategory(String category);
    
    // Find photos by category (case insensitive)
    List<GalleryPhoto> findByCategoryIgnoreCase(String category);
    
    // Find featured photos
    List<GalleryPhoto> findByIsFeaturedTrue();
    
    // Find photos by category ordered by sort order
    List<GalleryPhoto> findByCategoryOrderBySortOrderAsc(String category);
    
    // Find all photos ordered by sort order
    List<GalleryPhoto> findAllByOrderBySortOrderAsc();
    
    // Search photos by title (English or Hindi)
    @Query("SELECT g FROM GalleryPhoto g WHERE LOWER(g.titleEn) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR LOWER(g.titleHi) LIKE LOWER(CONCAT('%', :searchTerm, '%'))")
    List<GalleryPhoto> searchByTitle(@Param("searchTerm") String searchTerm);
    
    // Search photos by description (English or Hindi)
    @Query("SELECT g FROM GalleryPhoto g WHERE LOWER(g.descriptionEn) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR LOWER(g.descriptionHi) LIKE LOWER(CONCAT('%', :searchTerm, '%'))")
    List<GalleryPhoto> searchByDescription(@Param("searchTerm") String searchTerm);
    
    // Search photos by tags
    @Query("SELECT g FROM GalleryPhoto g WHERE LOWER(g.tags) LIKE LOWER(CONCAT('%', :searchTerm, '%'))")
    List<GalleryPhoto> searchByTags(@Param("searchTerm") String searchTerm);
    
    // Find photos by date range
    List<GalleryPhoto> findByDateBetween(java.time.LocalDate startDate, java.time.LocalDate endDate);
    
    // Find photos by photographer
    List<GalleryPhoto> findByPhotographerContainingIgnoreCase(String photographer);
    
    // Find photos by location
    List<GalleryPhoto> findByLocationContainingIgnoreCase(String location);
} 