package project1.example.demo.model;

import jakarta.persistence.*;

@Entity
@Table(name = "speeches")
public class Speech {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "title_en", nullable = false)
    private String titleEn;
    
    @Column(name = "title_hi")
    private String titleHi;
    
    @Column(name = "location_en")
    private String locationEn;
    
    @Column(name = "location_hi")
    private String locationHi;
    
    @Column(name = "category")
    private String category;
    
    @Column(name = "description_en", columnDefinition = "TEXT")
    private String descriptionEn;
    
    @Column(name = "description_hi", columnDefinition = "TEXT")
    private String descriptionHi;
    
    @Column(name = "thumbnail")
    private String thumbnail;
    
    @Column(name = "video_url")
    private String videoUrl;
    

   
    
    // Default constructor
    public Speech() {}
    
    // Constructor with all fields (updated)
    public Speech(String titleEn, String titleHi, String locationEn, 
                  String locationHi, String category, String descriptionEn, String descriptionHi,
                  String thumbnail, String videoUrl) {
        this.titleEn = titleEn;
        this.titleHi = titleHi;
        this.locationEn = locationEn;
        this.locationHi = locationHi;
        this.category = category;
        this.descriptionEn = descriptionEn;
        this.descriptionHi = descriptionHi;
        this.thumbnail = thumbnail;
        this.videoUrl = videoUrl;
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
    
    public String getLocationEn() {
        return locationEn;
    }
    
    public void setLocationEn(String locationEn) {
        this.locationEn = locationEn;
    }
    
    public String getLocationHi() {
        return locationHi;
    }
    
    public void setLocationHi(String locationHi) {
        this.locationHi = locationHi;
    }
    
    public String getCategory() {
        return category;
    }
    
    public void setCategory(String category) {
        this.category = category;
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
    

    
} 