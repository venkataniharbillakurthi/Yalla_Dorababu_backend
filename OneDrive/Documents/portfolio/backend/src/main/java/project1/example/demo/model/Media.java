package project1.example.demo.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "media")
public class Media {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "title_en", nullable = false)
    private String titleEn;
    
    @Column(name = "title_hi")
    private String titleHi;
    
    @Column(name = "date", nullable = false)
    private LocalDate date;
    
    @Column(name = "description_en", columnDefinition = "TEXT")
    private String descriptionEn;
    
    @Column(name = "description_hi", columnDefinition = "TEXT")
    private String descriptionHi;
    
    @Column(name = "thumbnail")
    private String thumbnail;
    
    @Column(name = "video_url")
    private String videoUrl;
    
    @Column(name = "attendees")
    private Integer attendees;
    
    @Column(name = "type", nullable = false)
    private String type; // press_release, interview, podcast, etc.
    
    @Column(name = "category")
    private String category;
    
    @Column(name = "is_featured")
    private Boolean isFeatured = false;
    
    @Column(name = "sort_order")
    private Integer sortOrder = 0;
    
    @Column(name = "image_url")
    private String imageUrl;
    
    // Default constructor
    public Media() {}
    
    // Constructor with all fields (updated)
    public Media(String titleEn, String titleHi, LocalDate date, String descriptionEn, 
                 String descriptionHi, String thumbnail, String videoUrl, Integer attendees,
                 String type, String category, Boolean isFeatured, Integer sortOrder) {
        this.titleEn = titleEn;
        this.titleHi = titleHi;
        this.date = date;
        this.descriptionEn = descriptionEn;
        this.descriptionHi = descriptionHi;
        this.thumbnail = thumbnail;
        this.videoUrl = videoUrl;
        this.attendees = attendees;
        this.type = type;
        this.category = category;
        this.isFeatured = isFeatured;
        this.sortOrder = sortOrder;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
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
    
    public LocalDate getDate() {
        return date;
    }
    
    public void setDate(LocalDate date) {
        this.date = date;
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
    
    public String getThumbnail() {
        return thumbnail;
    }
    
    public void setThumbnail(String thumbnail) {
        this.thumbnail = thumbnail;
    }
    
    public String getVideoUrl() {
        return videoUrl;
    }
    
    public void setVideoUrl(String videoUrl) {
        this.videoUrl = videoUrl;
    }
    
    public Integer getAttendees() {
        return attendees;
    }
    
    public void setAttendees(Integer attendees) {
        this.attendees = attendees;
    }
    
    public String getType() {
        return type;
    }
    
    public void setType(String type) {
        this.type = type;
    }
    
    public String getCategory() {
        return category;
    }
    
    public void setCategory(String category) {
        this.category = category;
    }
    
    public Boolean getIsFeatured() {
        return isFeatured;
    }
    
    public void setIsFeatured(Boolean isFeatured) {
        this.isFeatured = isFeatured;
    }
    
    public Integer getSortOrder() {
        return sortOrder;
    }
    
    public void setSortOrder(Integer sortOrder) {
        this.sortOrder = sortOrder;
    }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
} 