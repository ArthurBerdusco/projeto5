package com.example.backend.controller.api;

import java.util.List;
import java.util.stream.Collectors;

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
import com.example.backend.repository.MotoristaRepository; // Importando o modelo de Escola

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
    public List<MotoristaEscolaDTO> getEscolasAtendidas(@RequestBody MotoristaEscolaDTO motoristaDTO) {
        Motorista motorista = motoristaRepository.findByUsuarioId(motoristaDTO.getIdUsuario())
                .orElseThrow(() -> new RuntimeException("Motorista não encontrado"));

        List<MotoristaEscola> escolasAtendidas = motoristaEscolaRepository.findByMotoristaId(motorista.getId());

        // Mapeia a lista de MotoristaEscola para MotoristaEscolaDTO
        List<MotoristaEscolaDTO> result = escolasAtendidas.stream()
                .map(motoristaEscola -> {
                    MotoristaEscolaDTO dto = new MotoristaEscolaDTO();
                    dto.setIdUsuario(motorista.getId());  // Pode ser redundante, pode ser removido se não precisar
                    dto.setIdEscola(motoristaEscola.getEscola().getId());
                    return dto;
                })
                .collect(Collectors.toList());

        return result;
    }


    @GetMapping("escolas/{id}")
    public Escola getEscola(@PathVariable Long id) {
        return escolaRepository.findById(id).get();
    }

    @PostMapping("escolas/motorista")
    public ResponseEntity<String> atenderEscola(@RequestBody MotoristaEscolaDTO request) {
        try {

            System.out.println("\n\n\n" + request.getIdUsuario() + "\n\n\n");
            MotoristaEscola motoristaEscola = new MotoristaEscola();
            motoristaEscola.setEscola(escolaRepository.findById(request.getIdEscola()).orElseThrow(() -> new RuntimeException("Escola não encontrada")));
            motoristaEscola.setMotorista(motoristaRepository.findByUsuarioId(request.getIdUsuario()).orElseThrow(() -> new RuntimeException("Motorista não encontrado")));

            motoristaEscolaRepository.save(motoristaEscola);
            return ResponseEntity.ok("Atendimento registrado com sucesso.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao registrar atendimento: " + e.getMessage());
        }
    }

    @DeleteMapping("escolas/motorista")
    public Escola pararDeAtender(@RequestBody MotoristaEscola request) {
        System.out.println("\n\n\n" + request + "\n\n\n");
        return null;
    }
}
