package com.example.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.model.Escola;

public interface EscolaRepository extends JpaRepository<Escola, Long>{
    
}
