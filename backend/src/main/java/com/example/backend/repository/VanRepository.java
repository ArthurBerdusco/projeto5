package com.example.backend.repository;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.model.Van;
public interface VanRepository extends JpaRepository<Van, Long>{
    Optional<Van> findByMotoristaId(Long idMotorista);
}