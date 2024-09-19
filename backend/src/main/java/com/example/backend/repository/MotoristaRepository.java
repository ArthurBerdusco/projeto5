package com.example.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.model.Motorista;

public interface MotoristaRepository extends JpaRepository<Motorista, Long>{
    Optional<Motorista> findByUsuarioId(Long usuarioId);
}
