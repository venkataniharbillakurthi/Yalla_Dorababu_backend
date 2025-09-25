package project1.example.demo.dto;

public class AuthResponse {
    private String token;
    private String username;
    private String role;
    private String message;
    
    // Default constructor
    public AuthResponse() {}
    
    // Constructor with token and username
    public AuthResponse(String token, String username) {
        this.token = token;
        this.username = username;
        this.role = "ADMIN";
        this.message = "Login successful";
    }
    
    // Constructor with all fields
    public AuthResponse(String token, String username, String role, String message) {
        this.token = token;
        this.username = username;
        this.role = role;
        this.message = message;
    }
    
    // Getters and Setters
    public String getToken() {
        return token;
    }
    
    public void setToken(String token) {
        this.token = token;
    }
    
    public String getUsername() {
        return username;
    }
    
    public void setUsername(String username) {
        this.username = username;
    }
    
    public String getRole() {
        return role;
    }
    
    public void setRole(String role) {
        this.role = role;
    }
    
    public String getMessage() {
        return message;
    }
    
    public void setMessage(String message) {
        this.message = message;
    }
} 