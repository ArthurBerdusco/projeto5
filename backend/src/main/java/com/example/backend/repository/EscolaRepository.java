package com.example.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.model.Escola;

public interface EscolaRepository extends JpaRepository<Escola, Long>{
    List<Escola> findByIdIn(List<Long> escolaId);

}