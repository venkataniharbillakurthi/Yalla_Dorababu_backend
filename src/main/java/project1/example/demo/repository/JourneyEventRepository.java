package project1.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import project1.example.demo.model.JourneyEvent;
import java.util.List;

@Repository
public interface JourneyEventRepository extends JpaRepository<JourneyEvent, Long> {
    
    // Find events by year
    List<JourneyEvent> findByYear(String year);
    
    // Find events ordered by year (newest first)
    List<JourneyEvent> findAllByOrderByYearDesc();
    
    // Find events by year range
    List<JourneyEvent> findByYearBetween(String startYear, String endYear);
    
    // Search events by title (English or Hindi)
    @Query("SELECT j FROM JourneyEvent j WHERE LOWER(j.titleEn) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR LOWER(j.titleHi) LIKE LOWER(CONCAT('%', :searchTerm, '%'))")
    List<JourneyEvent> searchByTitle(@Param("searchTerm") String searchTerm);
    
    // Search events by description (English or Hindi)
    @Query("SELECT j FROM JourneyEvent j WHERE LOWER(j.descriptionEn) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR LOWER(j.descriptionHi) LIKE LOWER(CONCAT('%', :searchTerm, '%'))")
    List<JourneyEvent> searchByDescription(@Param("searchTerm") String searchTerm);
    
    // Find events by date range
    List<JourneyEvent> findByDateBetween(java.time.LocalDate startDate, java.time.LocalDate endDate);
    
    // Find events ordered by sort order
    List<JourneyEvent> findAllByOrderBySortOrderAsc();
} 