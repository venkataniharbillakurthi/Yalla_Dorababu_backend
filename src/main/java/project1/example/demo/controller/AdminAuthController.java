package project1.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project1.example.demo.dto.AuthResponse;
import project1.example.demo.dto.LoginRequest;
import project1.example.demo.model.AdminUser;
import project1.example.demo.service.AdminUserService;
import project1.example.demo.service.JwtTokenService;
import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/admin/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminAuthController {
    
    @Autowired
    private AdminUserService adminUserService;
    
    @Autowired
    private JwtTokenService jwtTokenService;
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            AdminUser user = adminUserService.authenticate(request.getUsername(), request.getPassword());
            
            if (user != null) {
                String token = jwtTokenService.generateToken(user.getUsername());
                
                // Update session token in database
                LocalDateTime expiry = LocalDateTime.now().plusHours(1);
                adminUserService.updateSessionToken(user.getUsername(), token, expiry);
                
                AuthResponse response = new AuthResponse(token, user.getUsername(), user.getRole(), "Login successful");
                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.status(401).body(new AuthResponse(null, null, null, "Invalid credentials"));
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body(new AuthResponse(null, null, null, "Server error: " + e.getMessage()));
        }
    }
    
    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestHeader("Authorization") String authHeader) {
        try {
            if (authHeader != null && authHeader.startsWith("Bearer ")) {
                String token = authHeader.substring(7);
                String username = jwtTokenService.extractUsername(token);
                
                if (username != null) {
                    adminUserService.clearSessionToken(username);
                }
            }
            
            return ResponseEntity.ok(new AuthResponse(null, null, null, "Logged out successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(new AuthResponse(null, null, null, "Server error: " + e.getMessage()));
        }
    }
    
    @GetMapping("/validate")
    public ResponseEntity<?> validateToken(@RequestHeader("Authorization") String authHeader) {
        try {
            if (authHeader != null && authHeader.startsWith("Bearer ")) {
                String token = authHeader.substring(7);
                
                if (jwtTokenService.validateToken(token)) {
                    String username = jwtTokenService.extractUsername(token);
                    
                    // Check if session is still valid in database
                    if (adminUserService.isSessionValid(token)) {
                        return ResponseEntity.ok(new AuthResponse(null, username, "ADMIN", "Token is valid"));
                    } else {
                        return ResponseEntity.status(401).body(new AuthResponse(null, null, null, "Session expired"));
                    }
                } else {
                    return ResponseEntity.status(401).body(new AuthResponse(null, null, null, "Invalid token"));
                }
            } else {
                return ResponseEntity.status(401).body(new AuthResponse(null, null, null, "No token provided"));
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body(new AuthResponse(null, null, null, "Server error: " + e.getMessage()));
        }
    }
    
    @PostMapping("/register")
    public ResponseEntity<?> registerAdmin(@RequestBody LoginRequest request) {
        return ResponseEntity.status(403).body(new AuthResponse(null, null, null, "Admin registration is disabled."));
    }
} 