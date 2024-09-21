package com.example.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.model.Responsavel;

public interface ResponsaveisRepository extends JpaRepository<Responsavel, Long>{
    Optional<Responsavel> findByUsuarioId(Long usuarioId);
}
