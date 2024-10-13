package com.example.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.model.Crianca;

public interface CriancaRepository extends JpaRepository<Crianca, Long> {

    List<Crianca> findByResponsavelId(Long responsavelId);

    List<Crianca> findByMotoristaIdAndEscolaId(Long motoristaId, Long escolaId);

}
