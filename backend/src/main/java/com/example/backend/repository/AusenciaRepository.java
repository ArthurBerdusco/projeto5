package com.example.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.model.Ausencia;

public interface AusenciaRepository extends JpaRepository<Ausencia, Long>{
    List<Ausencia> findByCriancaId(Long criancaId);

}
