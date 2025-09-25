package project1.example.demo.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "gallery_photos")
public class GalleryPhoto {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "title_en", nullable = false)
    private String titleEn;
    
    @Column(name = "title_hi")
    private String titleHi;
    
    @Column(name = "category")
    private String category;
    
    @Column(name = "type", nullable = false)
    private String type = "photo"; // "photo" or "video"
    
    @Column(name = "url", nullable = false)
    private String url;
    
    @Column(name = "thumbnail")
    private String thumbnail;
    
    @Column(name = "description_en", columnDefinition = "TEXT")
    private String descriptionEn;
    
    @Column(name = "description_hi", columnDefinition = "TEXT")
    private String descriptionHi;
    
    @Column(name = "date")
    private LocalDate date;
    
    @Column(name = "location")
    private String location;
    
    @Column(name = "photographer")
    private String photographer;
    
    @Column(name = "tags")
    private String tags; // Comma-separated tags
    
    @Column(name = "is_featured")
    private Boolean isFeatured = false;
    
    @Column(name = "sort_order")
    private Integer sortOrder = 0;
    
    // Default constructor
    public GalleryPhoto() {}
    
    // Constructor with all fields
    public GalleryPhoto(String titleEn, String titleHi, String category, String type, String url, 
                       String thumbnail, String descriptionEn, String descriptionHi,
                       LocalDate date, String location, String photographer, 
                       String tags, Boolean isFeatured, Integer sortOrder) {
        this.titleEn = titleEn;
        this.titleHi = titleHi;
        this.category = category;
        this.type = type;
        this.url = url;
        this.thumbnail = thumbnail;
        this.descriptionEn = descriptionEn;
        this.descriptionHi = descriptionHi;
        this.date = date;
        this.location = location;
        this.photographer = photographer;
        this.tags = tags;
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
    
    public String getCategory() {
        return category;
    }
    
    public void setCategory(String category) {
        this.category = category;
    }
    
    public String getType() {
        return type;
    }
    
    public void setType(String type) {
        this.type = type;
    }
    
    public String getUrl() {
        return url;
    }
    
    public void setUrl(String url) {
        this.url = url;
    }
    
    public String getThumbnail() {
        return thumbnail;
    }
    
    public void setThumbnail(String thumbnail) {
        this.thumbnail = thumbnail;
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
    
    public LocalDate getDate() {
        return date;
    }
    
    public void setDate(LocalDate date) {
        this.date = date;
    }
    
    public String getLocation() {
        return location;
    }
    
    public void setLocation(String location) {
        this.location = location;
    }
    
    public String getPhotographer() {
        return photographer;
    }
    
    public void setPhotographer(String photographer) {
        this.photographer = photographer;
    }
    
    public String getTags() {
        return tags;
    }
    
    public void setTags(String tags) {
        this.tags = tags;
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
} 