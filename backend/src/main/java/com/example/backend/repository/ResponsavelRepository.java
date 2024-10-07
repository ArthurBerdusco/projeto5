package com.example.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.model.Responsavel;

public interface ResponsavelRepository extends JpaRepository<Responsavel, Long>{
    Optional<Responsavel> findByUsuarioId(Long usuarioId);
    boolean existsByCpf(String cpf);
}
