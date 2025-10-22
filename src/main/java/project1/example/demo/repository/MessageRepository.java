package project1.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import project1.example.demo.model.Message;

public interface MessageRepository extends JpaRepository<Message, Long> {} 