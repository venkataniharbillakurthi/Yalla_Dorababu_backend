package project1.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project1.example.demo.model.JourneyEvent;
import project1.example.demo.service.JourneyEventService;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/journey-events")
public class JourneyEventController {
    
    @Autowired
    private JourneyEventService journeyEventService;
    
    // Get all events
    @GetMapping
    public ResponseEntity<List<JourneyEvent>> getAllEvents() {
        List<JourneyEvent> events = journeyEventService.getAllEvents();
        return ResponseEntity.ok(events);
    }
    
    // Get event by ID
    @GetMapping("/{id}")
    public ResponseEntity<JourneyEvent> getEventById(@PathVariable Long id) {
        Optional<JourneyEvent> event = journeyEventService.getEventById(id);
        return event.map(ResponseEntity::ok)
                   .orElse(ResponseEntity.notFound().build());
    }
    
    // Get events by year
    @GetMapping("/year/{year}")
    public ResponseEntity<List<JourneyEvent>> getEventsByYear(@PathVariable String year) {
        List<JourneyEvent> events = journeyEventService.getEventsByYear(year);
        return ResponseEntity.ok(events);
    }
    
    // Get events by year range
    @GetMapping("/year-range")
    public ResponseEntity<List<JourneyEvent>> getEventsByYearRange(
            @RequestParam String startYear, 
            @RequestParam String endYear) {
        List<JourneyEvent> events = journeyEventService.getEventsByYearRange(startYear, endYear);
        return ResponseEntity.ok(events);
    }
    
    // Create new event
    @PostMapping
    public ResponseEntity<JourneyEvent> createEvent(@RequestBody JourneyEvent event) {
        JourneyEvent createdEvent = journeyEventService.createEvent(event);
        return ResponseEntity.ok(createdEvent);
    }
    
    // Update event
    @PutMapping("/{id}")
    public ResponseEntity<JourneyEvent> updateEvent(@PathVariable Long id, @RequestBody JourneyEvent eventDetails) {
        Optional<JourneyEvent> updatedEvent = journeyEventService.updateEvent(id, eventDetails);
        return updatedEvent.map(ResponseEntity::ok)
                          .orElse(ResponseEntity.notFound().build());
    }
    
    // Delete event
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEvent(@PathVariable Long id) {
        boolean deleted = journeyEventService.deleteEvent(id);
        return deleted ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
    }
} 