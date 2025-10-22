package project1.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import project1.example.demo.model.AdminUser;
import java.util.Optional;

@Repository
public interface AdminUserRepository extends JpaRepository<AdminUser, Long> {
    
    Optional<AdminUser> findByUsername(String username);
    
    Optional<AdminUser> findBySessionToken(String sessionToken);
    
    boolean existsByUsername(String username);
    
    Optional<AdminUser> findByUsernameAndActiveTrue(String username);
} 