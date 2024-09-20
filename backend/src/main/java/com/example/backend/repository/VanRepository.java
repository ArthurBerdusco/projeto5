package com.example.backend.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.backend.model.Van;
public interface VanRepository extends JpaRepository<Van, Long>{
    
}