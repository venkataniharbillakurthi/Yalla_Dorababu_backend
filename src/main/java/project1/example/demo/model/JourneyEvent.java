package project1.example.demo.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "journey_events")
public class JourneyEvent {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "year", nullable = false)
    private String year;
    
    @Column(name = "title_en", nullable = false)
    private String titleEn;
    
    @Column(name = "title_hi")
    private String titleHi;
    
    @Column(name = "description_en", columnDefinition = "TEXT")
    private String descriptionEn;
    
    @Column(name = "description_hi", columnDefinition = "TEXT")
    private String descriptionHi;
    
    @Column(name = "image")
    private String image;
    
    @Column(name = "sort_order")
    private Integer sortOrder = 0;
    
    @Column(name = "date")
    private LocalDate date;
    
    // Default constructor
    public JourneyEvent() {}
    
    // Constructor with all fields (updated)
    public JourneyEvent(String year, String titleEn, String titleHi, String descriptionEn, 
                       String descriptionHi, String image, Integer sortOrder, LocalDate date) {
        this.year = year;
        this.titleEn = titleEn;
        this.titleHi = titleHi;
        this.descriptionEn = descriptionEn;
        this.descriptionHi = descriptionHi;
        this.image = image;
        this.sortOrder = sortOrder;
        this.date = date;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getYear() {
        return year;
    }
    
    public void setYear(String year) {
        this.year = year;
    }
    
    public String getTitleEn() {
        return titleEn;
    }
    
    public void setTitleEn(String titleEn) {
        this.titleEn = titleEn;
    }
    
    public String getTitleHi() {
        return titleHi;
    }
    
    public void setTitleHi(String titleHi) {
        this.titleHi = titleHi;
    }
    
    public String getDescriptionEn() {
        return descriptionEn;
    }
    
    public void setDescriptionEn(String descriptionEn) {
        this.descriptionEn = descriptionEn;
    }
    
    public String getDescriptionHi() {
        return descriptionHi;
    }
    
    public void setDescriptionHi(String descriptionHi) {
        this.descriptionHi = descriptionHi;
    }
    
    public String getImage() {
        return image;
    }
    
    public void setImage(String image) {
        this.image = image;
    }
    
    public Integer getSortOrder() {
        return sortOrder;
    }
    
    public void setSortOrder(Integer sortOrder) {
        this.sortOrder = sortOrder;
    }
    
    public LocalDate getDate() {
        return date;
    }
    
    public void setDate(LocalDate date) {
        this.date = date;
    }
} 