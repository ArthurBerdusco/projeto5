package com.example.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.model.Motorista;

public interface MotoristaRepository extends JpaRepository<Motorista, Long>{
    
}
