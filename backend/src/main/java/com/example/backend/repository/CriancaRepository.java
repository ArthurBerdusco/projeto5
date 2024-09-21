package com.example.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.model.Crianca;


public interface CriancaRepository extends JpaRepository<Crianca, Long> {
        
}
