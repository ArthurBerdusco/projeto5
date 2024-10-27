package com.example.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.model.Oferta;

public interface OfertaRepository extends JpaRepository<Oferta, Long> {
    List<Oferta> findByMotoristaId(Long motoristaId);

    List<Oferta> findByCriancaId(Long criancaId);

    boolean existsByCriancaId(Long criancaId);

}
