package project1.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import project1.example.demo.model.Speech;
import java.util.List;

@Repository
public interface SpeechRepository extends JpaRepository<Speech, Long> {
    
    // Find speeches by category
    List<Speech> findByCategory(String category);
    
    // Find speeches by category (case insensitive)
    List<Speech> findByCategoryIgnoreCase(String category);
    
    // Search speeches by title (English or Hindi)
    @Query("SELECT s FROM Speech s WHERE LOWER(s.titleEn) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR LOWER(s.titleHi) LIKE LOWER(CONCAT('%', :searchTerm, '%'))")
    List<Speech> searchByTitle(@Param("searchTerm") String searchTerm);
    
    // Search speeches by description (English or Hindi)
    @Query("SELECT s FROM Speech s WHERE LOWER(s.descriptionEn) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR LOWER(s.descriptionHi) LIKE LOWER(CONCAT('%', :searchTerm, '%'))")
    List<Speech> searchByDescription(@Param("searchTerm") String searchTerm);
} 