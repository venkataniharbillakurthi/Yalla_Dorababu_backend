package project1.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project1.example.demo.model.Speech;
import project1.example.demo.repository.SpeechRepository;
import java.util.List;
import java.util.Optional;

@Service
public class SpeechService {
    
    @Autowired
    private SpeechRepository speechRepository;
    
    // Get all speeches
    public List<Speech> getAllSpeeches() {
        return speechRepository.findAll();
    }
    
    // Get speech by ID
    public Optional<Speech> getSpeechById(Long id) {
        return speechRepository.findById(id);
    }
    
    // Get speeches by category
    public List<Speech> getSpeechesByCategory(String category) {
        if ("all".equalsIgnoreCase(category)) {
            return getAllSpeeches();
        }
        return speechRepository.findByCategory(category);
    }
    
    // Search speeches
    public List<Speech> searchSpeeches(String searchTerm) {
        if (searchTerm == null || searchTerm.trim().isEmpty()) {
            return getAllSpeeches();
        }
        
        List<Speech> titleResults = speechRepository.searchByTitle(searchTerm.trim());
        List<Speech> descriptionResults = speechRepository.searchByDescription(searchTerm.trim());
        
        // Combine and remove duplicates
        titleResults.addAll(descriptionResults);
        return titleResults.stream()
                .distinct()
                .toList();
    }
    
    // Create new speech
    public Speech createSpeech(Speech speech) {
        return speechRepository.save(speech);
    }
    
    // Update speech
    public Optional<Speech> updateSpeech(Long id, Speech speechDetails) {
        return speechRepository.findById(id)
                .map(existingSpeech -> {
                    existingSpeech.setTitleEn(speechDetails.getTitleEn());
                    existingSpeech.setTitleHi(speechDetails.getTitleHi());
                    existingSpeech.setLocationEn(speechDetails.getLocationEn());
                    existingSpeech.setLocationHi(speechDetails.getLocationHi());
                    existingSpeech.setCategory(speechDetails.getCategory());
                    existingSpeech.setDescriptionEn(speechDetails.getDescriptionEn());
                    existingSpeech.setDescriptionHi(speechDetails.getDescriptionHi());
                    existingSpeech.setThumbnail(speechDetails.getThumbnail());
                    existingSpeech.setVideoUrl(speechDetails.getVideoUrl());
                    return speechRepository.save(existingSpeech);
                });
    }
    
    // Delete speech
    public boolean deleteSpeech(Long id) {
        if (speechRepository.existsById(id)) {
            speechRepository.deleteById(id);
            return true;
        }
        return false;
    }
    
    // Get available categories
    public List<String> getAvailableCategories() {
        return speechRepository.findAll().stream()
                .map(Speech::getCategory)
                .distinct()
                .filter(category -> category != null && !category.trim().isEmpty())
                .sorted()
                .toList();
    }
} 