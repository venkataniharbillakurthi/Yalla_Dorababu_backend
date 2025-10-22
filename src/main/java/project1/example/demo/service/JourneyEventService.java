package project1.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project1.example.demo.model.JourneyEvent;
import project1.example.demo.repository.JourneyEventRepository;
import java.util.List;
import java.util.Optional;

@Service
public class JourneyEventService {
    
    @Autowired
    private JourneyEventRepository journeyEventRepository;
    
    // Get all events
    public List<JourneyEvent> getAllEvents() {
        return journeyEventRepository.findAllByOrderBySortOrderAsc();
    }
    
    // Get event by ID
    public Optional<JourneyEvent> getEventById(Long id) {
        return journeyEventRepository.findById(id);
    }
    
    // Get events by year
    public List<JourneyEvent> getEventsByYear(String year) {
        return journeyEventRepository.findByYear(year);
    }
    
    // Get events by year range
    public List<JourneyEvent> getEventsByYearRange(String startYear, String endYear) {
        return journeyEventRepository.findByYearBetween(startYear, endYear);
    }
    
    // Create new event
    public JourneyEvent createEvent(JourneyEvent event) {
        return journeyEventRepository.save(event);
    }
    
    // Update event
    public Optional<JourneyEvent> updateEvent(Long id, JourneyEvent eventDetails) {
        return journeyEventRepository.findById(id)
                .map(existingEvent -> {
                    existingEvent.setYear(eventDetails.getYear());
                    existingEvent.setTitleEn(eventDetails.getTitleEn());
                    existingEvent.setTitleHi(eventDetails.getTitleHi());
                    existingEvent.setDescriptionEn(eventDetails.getDescriptionEn());
                    existingEvent.setDescriptionHi(eventDetails.getDescriptionHi());
                    existingEvent.setImage(eventDetails.getImage());
                    existingEvent.setSortOrder(eventDetails.getSortOrder());
                    existingEvent.setDate(eventDetails.getDate());
                    return journeyEventRepository.save(existingEvent);
                });
    }
    
    // Delete event
    public boolean deleteEvent(Long id) {
        if (journeyEventRepository.existsById(id)) {
            journeyEventRepository.deleteById(id);
            return true;
        }
        return false;
    }
    
    // Get available years
    public List<String> getAvailableYears() {
        return journeyEventRepository.findAll().stream()
                .map(JourneyEvent::getYear)
                .distinct()
                .filter(year -> year != null && !year.trim().isEmpty())
                .sorted()
                .toList();
    }
    
    // Get events by date range
    public List<JourneyEvent> getEventsByDateRange(java.time.LocalDate startDate, java.time.LocalDate endDate) {
        return journeyEventRepository.findByDateBetween(startDate, endDate);
    }
} 