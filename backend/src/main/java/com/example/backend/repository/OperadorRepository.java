package com.example.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.model.Operador;

public interface OperadorRepository extends JpaRepository<Operador, Long>{
    
}
