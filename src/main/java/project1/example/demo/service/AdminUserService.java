package project1.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import project1.example.demo.model.AdminUser;
import project1.example.demo.repository.AdminUserRepository;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class AdminUserService {
    
    @Autowired
    private AdminUserRepository adminUserRepository;
    
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    
    public AdminUser authenticate(String username, String password) {
        Optional<AdminUser> userOpt = adminUserRepository.findByUsernameAndActiveTrue(username);
        
        if (userOpt.isPresent()) {
            AdminUser user = userOpt.get();
            if (passwordEncoder.matches(password, user.getPasswordHash())) {
                // Update last login
                user.setLastLogin(LocalDateTime.now());
                adminUserRepository.save(user);
                return user;
            }
        }
        return null;
    }
    
    public AdminUser createAdminUser(String username, String password) {
        if (adminUserRepository.existsByUsername(username)) {
            throw new RuntimeException("Username already exists");
        }
        
        String hashedPassword = passwordEncoder.encode(password);
        AdminUser adminUser = new AdminUser(username, hashedPassword);
        return adminUserRepository.save(adminUser);
    }
    
    public Optional<AdminUser> findByUsername(String username) {
        return adminUserRepository.findByUsername(username);
    }
    
    public Optional<AdminUser> findBySessionToken(String sessionToken) {
        return adminUserRepository.findBySessionToken(sessionToken);
    }
    
    public void updateSessionToken(String username, String sessionToken, LocalDateTime expiry) {
        Optional<AdminUser> userOpt = adminUserRepository.findByUsername(username);
        if (userOpt.isPresent()) {
            AdminUser user = userOpt.get();
            user.setSessionToken(sessionToken);
            user.setSessionExpiry(expiry);
            adminUserRepository.save(user);
        }
    }
    
    public void clearSessionToken(String username) {
        Optional<AdminUser> userOpt = adminUserRepository.findByUsername(username);
        if (userOpt.isPresent()) {
            AdminUser user = userOpt.get();
            user.setSessionToken(null);
            user.setSessionExpiry(null);
            adminUserRepository.save(user);
        }
    }
    
    public boolean isSessionValid(String sessionToken) {
        Optional<AdminUser> userOpt = adminUserRepository.findBySessionToken(sessionToken);
        if (userOpt.isPresent()) {
            AdminUser user = userOpt.get();
            return user.getSessionExpiry() != null && 
                   user.getSessionExpiry().isAfter(LocalDateTime.now());
        }
        return false;
    }
} 