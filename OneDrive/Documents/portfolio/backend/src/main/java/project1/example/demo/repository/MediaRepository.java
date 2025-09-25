package project1.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import project1.example.demo.model.Media;
import java.util.List;

@Repository
public interface MediaRepository extends JpaRepository<Media, Long> {
    
    // Find media by type
    List<Media> findByType(String type);
    
    // Find media by type (case insensitive)
    List<Media> findByTypeIgnoreCase(String type);
    
    // Find media by category
    List<Media> findByCategory(String category);
    
    // Find media by category (case insensitive)
    List<Media> findByCategoryIgnoreCase(String category);
    
    // Find featured media
    List<Media> findByIsFeaturedTrue();
    
    // Find media by type ordered by date (newest first)
    List<Media> findByTypeOrderByDateDesc(String type);
    
    // Find media by category ordered by date (newest first)
    List<Media> findByCategoryOrderByDateDesc(String category);
    
    // Find all media ordered by date (newest first)
    List<Media> findAllByOrderByDateDesc();
    
    // Search media by title (English or Hindi)
    @Query("SELECT m FROM Media m WHERE LOWER(m.titleEn) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR LOWER(m.titleHi) LIKE LOWER(CONCAT('%', :searchTerm, '%'))")
    List<Media> searchByTitle(@Param("searchTerm") String searchTerm);
    
    // Search media by description (English or Hindi)
    @Query("SELECT m FROM Media m WHERE LOWER(m.descriptionEn) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR LOWER(m.descriptionHi) LIKE LOWER(CONCAT('%', :searchTerm, '%'))")
    List<Media> searchByDescription(@Param("searchTerm") String searchTerm);
    
    // Find media by date range
    List<Media> findByDateBetween(java.time.LocalDate startDate, java.time.LocalDate endDate);
    
    // Find media with video content
    @Query("SELECT m FROM Media m WHERE m.videoUrl IS NOT NULL AND m.videoUrl != ''")
    List<Media> findMediaWithVideo();
} 