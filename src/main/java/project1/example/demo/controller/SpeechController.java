package project1.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project1.example.demo.model.Speech;
import project1.example.demo.service.SpeechService;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/speeches")
public class SpeechController {
    
    @Autowired
    private SpeechService speechService;
    
    // Get all speeches
    @GetMapping
    public ResponseEntity<List<Speech>> getAllSpeeches() {
        List<Speech> speeches = speechService.getAllSpeeches();
        return ResponseEntity.ok(speeches);
    }
    
    // Get speech by ID
    @GetMapping("/{id}")
    public ResponseEntity<Speech> getSpeechById(@PathVariable Long id) {
        Optional<Speech> speech = speechService.getSpeechById(id);
        return speech.map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
    }
    
    // Get speeches by category
    @GetMapping("/category/{category}")
    public ResponseEntity<List<Speech>> getSpeechesByCategory(@PathVariable String category) {
        List<Speech> speeches = speechService.getSpeechesByCategory(category);
        return ResponseEntity.ok(speeches);
    }
    
    // Search speeches
    @GetMapping("/search")
    public ResponseEntity<List<Speech>> searchSpeeches(@RequestParam String q) {
        List<Speech> speeches = speechService.searchSpeeches(q);
        return ResponseEntity.ok(speeches);
    }
    
    // Get available categories
    @GetMapping("/categories")
    public ResponseEntity<List<String>> getAvailableCategories() {
        List<String> categories = speechService.getAvailableCategories();
        return ResponseEntity.ok(categories);
    }
    
    // Create new speech
    @PostMapping
    public ResponseEntity<Speech> createSpeech(@RequestBody Speech speech) {
        Speech createdSpeech = speechService.createSpeech(speech);
        return ResponseEntity.ok(createdSpeech);
    }
    
    // Update speech
    @PutMapping("/{id}")
    public ResponseEntity<Speech> updateSpeech(@PathVariable Long id, @RequestBody Speech speechDetails) {
        Optional<Speech> updatedSpeech = speechService.updateSpeech(id, speechDetails);
        return updatedSpeech.map(ResponseEntity::ok)
                          .orElse(ResponseEntity.notFound().build());
    }
    
    // Delete speech
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSpeech(@PathVariable Long id) {
        boolean deleted = speechService.deleteSpeech(id);
        return deleted ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
    }
} 