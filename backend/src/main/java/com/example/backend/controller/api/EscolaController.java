package com.example.backend.controller.api;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.dto.MotoristaEscolaDTO;
import com.example.backend.model.Escola;
import com.example.backend.model.Motorista;
import com.example.backend.model.MotoristaEscola;
import com.example.backend.repository.EscolaRepository;
import com.example.backend.repository.MotoristaEscolaRepository;
import com.example.backend.repository.MotoristaRepository;

import jakarta.transaction.Transactional;

@RestController
@RequestMapping("api")
public class EscolaController {

    @Autowired
    EscolaRepository escolaRepository;

    @Autowired
    MotoristaRepository motoristaRepository;

    @Autowired
    MotoristaEscolaRepository motoristaEscolaRepository;

    @GetMapping("escolas")
    public List<Escola> getAllEscolas() {
        List<Escola> escolas = escolaRepository.findAll();
        return escolas;
    }

    @PostMapping("escolas/atendidas")
    public List<Escola> getEscolasAtendidas(@RequestBody MotoristaEscolaDTO motoristaDTO) {
        // Buscar o motorista pelo ID do usuário
        Motorista motorista = motoristaRepository.findByUsuarioId(motoristaDTO.getIdUsuario())
                .orElseThrow(() -> new RuntimeException("Motorista não encontrado"));
    
        // Buscar as associações MotoristaEscola (que contém os IDs das escolas atendidas)
        List<MotoristaEscola> motoristaIdEscolas = motoristaEscolaRepository.findByMotoristaId(motorista.getId());

        List<Long> idsEscolasAtendidas = new ArrayList<>();

        for(MotoristaEscola motoristaIdEsc : motoristaIdEscolas){
            idsEscolasAtendidas.add(motoristaIdEsc.getEscola().getId());
        }

    
        // Buscar as escolas que correspondem aos IDs
        List<Escola> escolasAtendidas = escolaRepository.findByIdIn(idsEscolasAtendidas);
    
        // Converter as entidades Escola para DTOs (se necessário)
        return escolasAtendidas;
    }
    


    @GetMapping("escolas/{id}")
    public Escola getEscola(@PathVariable Long id) {
        return escolaRepository.findById(id).get();
    }

    @PostMapping("escolas/motorista")
    public ResponseEntity<String> atenderEscola(@RequestBody MotoristaEscolaDTO request) {
        try {

            MotoristaEscola motoristaEscola = new MotoristaEscola();
            motoristaEscola.setEscola(escolaRepository.findById(request.getIdEscola()).orElseThrow(() -> new RuntimeException("Escola não encontrada")));
            motoristaEscola.setMotorista(motoristaRepository.findByUsuarioId(request.getIdUsuario()).orElseThrow(() -> new RuntimeException("Motorista não encontrado")));

            motoristaEscolaRepository.save(motoristaEscola);
            return ResponseEntity.ok("Atendimento registrado com sucesso.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao registrar atendimento: " + e.getMessage());
        }
    }

    @Transactional
    @DeleteMapping("escolas/motorista")
    public void pararDeAtender(@RequestBody MotoristaEscolaDTO request) {
        
        Motorista motorista = motoristaRepository.findByUsuarioId(request.getIdUsuario()).orElseThrow(() -> new RuntimeException("Motorista não encontrado"));
        System.out.println("\n\n\nMOTORISTA ID: " + motorista.getId()+ ", ESCOLA ID: " + request.getIdEscola() + "\n\n\n");
        
        motoristaEscolaRepository.deleteByMotoristaIdAndEscolaId(motorista.getId(), request.getIdEscola());

    }

    @GetMapping("escolas/motorista/atende/{idUsuario}/{idEscola}")
public ResponseEntity<Boolean> verificaAtendimento(@PathVariable Long idUsuario, @PathVariable Long idEscola) {
    
    try {
        Motorista motorista = motoristaRepository.findByUsuarioId(idUsuario)
                .orElseThrow(() -> new RuntimeException("Motorista não encontrado"));
        List<MotoristaEscola> motoristaEscola = motoristaEscolaRepository.findByMotoristaIdAndEscolaId(motorista.getId(), idEscola);

        boolean atende = !motoristaEscola.isEmpty();
        return ResponseEntity.ok(atende);
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(false);
    }
}

}
