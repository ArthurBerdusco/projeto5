package com.example.backend.controller.api;

import java.util.ArrayList;
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

import com.example.backend.dto.CriancaDTO;
import com.example.backend.dto.EscolaDTO;
import com.example.backend.dto.MotoristaDTO;
import com.example.backend.dto.MotoristaEscolaDTO;
import com.example.backend.model.Crianca;
import com.example.backend.model.Escola;
import com.example.backend.model.Motorista;
import com.example.backend.model.MotoristaEscola;
import com.example.backend.repository.CriancaRepository;
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

    @Autowired
    CriancaRepository criancaRepository;

    @GetMapping("escolas")
    public List<EscolaDTO> getAllEscolas() {
        List<Escola> escolas = escolaRepository.findAll();
        return escolas.stream()
                .map(escola -> {
                    EscolaDTO dto = new EscolaDTO();
                    dto.setId(escola.getId());
                    dto.setNome(escola.getNome());
                    dto.setRua(escola.getRua());
                    dto.setNumero(escola.getNumero());
                    return dto;
                })
                .collect(Collectors.toList());
    }

    @GetMapping("escolas/atendidas/{idMotorista}")
    public List<EscolaDTO> getEscolasAtendidas(@PathVariable Long idMotorista) {
        // Buscar o motorista pelo ID do usuário
        Motorista motorista = motoristaRepository.findById(idMotorista)
                .orElseThrow(() -> new RuntimeException("Motorista não encontrado"));

        // Buscar as associações MotoristaEscola que contêm os IDs das escolas atendidas
        List<MotoristaEscola> motoristaIdEscolas = motoristaEscolaRepository.findByMotoristaId(motorista.getId());

        // Extrair os IDs das escolas atendidas
        List<Long> idsEscolasAtendidas = motoristaIdEscolas.stream()
                .map(motoristaIdEsc -> motoristaIdEsc.getEscola().getId())
                .collect(Collectors.toList());

        // Buscar as escolas que correspondem aos IDs
        List<Escola> escolasAtendidas = escolaRepository.findByIdIn(idsEscolasAtendidas);

        // Converter as entidades Escola para DTOs
        return escolasAtendidas.stream().map(escola -> {
            EscolaDTO dto = new EscolaDTO();
            dto.setId(escola.getId());
            dto.setNome(escola.getNome());
            dto.setRua(escola.getRua());
            dto.setNumero(escola.getNumero());
            dto.setTelefone(escola.getTelefone());
            dto.setStatus(escola.getStatus());
            dto.setDados(escola.getImagem() != null ? escola.getImagem().getDados() : null);
            return dto;
        }).collect(Collectors.toList());
    }

    @GetMapping("escolas/{id}")
    public Escola getEscola(@PathVariable Long id) {
        return escolaRepository.findById(id).get();
    }

    @PostMapping("escolas/motorista")
    public ResponseEntity<String> atenderEscola(@RequestBody MotoristaEscolaDTO request) {
        try {

            MotoristaEscola motoristaEscola = new MotoristaEscola();
            motoristaEscola.setEscola(escolaRepository.findById(request.getIdEscola())
                    .orElseThrow(() -> new RuntimeException("Escola não encontrada")));
            motoristaEscola.setMotorista(motoristaRepository.findById(request.getIdMotorista())
                    .orElseThrow(() -> new RuntimeException("Motorista não encontrado")));

            motoristaEscolaRepository.save(motoristaEscola);
            return ResponseEntity.ok("Atendimento registrado com sucesso.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao registrar atendimento: " + e.getMessage());
        }
    }

    @Transactional
    @DeleteMapping("escolas/motorista")
    public void pararDeAtender(@RequestBody MotoristaEscolaDTO request) {

        Motorista motorista = motoristaRepository.findById(request.getIdMotorista())
                .orElseThrow(() -> new RuntimeException("Motorista não encontrado"));

        motoristaEscolaRepository.deleteByMotoristaIdAndEscolaId(motorista.getId(), request.getIdEscola());

    }

    @GetMapping("escolas/motorista/atende/{idMotorista}/{idEscola}")
    public ResponseEntity<Boolean> verificaAtendimento(@PathVariable Long idMotorista, @PathVariable Long idEscola) {

        try {
            Motorista motorista = motoristaRepository.findById(idMotorista)
                    .orElseThrow(() -> new RuntimeException("Motorista não encontrado"));
            List<MotoristaEscola> motoristaEscola = motoristaEscolaRepository
                    .findByMotoristaIdAndEscolaId(motorista.getId(), idEscola);

            boolean atende = !motoristaEscola.isEmpty();
            return ResponseEntity.ok(atende);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(false);
        }
    }

    @GetMapping("/motoristas/escola/{id}")
    public List<MotoristaDTO> getMotoristasEscola(@PathVariable Long id) {

        // Buscar todas as associações MotoristaEscola para a escola com o ID fornecido
        List<MotoristaEscola> motoristasEscola = motoristaEscolaRepository.findByEscolaId(id);

        // Criar uma lista para armazenar os MotoristaDTOs
        List<MotoristaDTO> motoristasDTO = new ArrayList<>();

        // Iterar sobre as associações e adicionar os motoristas na lista de MotoristaDTO
        for (MotoristaEscola motoristaEscola : motoristasEscola) {
            Motorista motorista = motoristaEscola.getMotorista();

            // Criar o MotoristaDTO e mapear os campos
            MotoristaDTO motoristaDTO = new MotoristaDTO();
            motoristaDTO.setId(motorista.getId());
            motoristaDTO.setNome(motorista.getNome());
            motoristaDTO.setTelefone(motorista.getTelefone());
            motoristaDTO.setEmail(motorista.getEmail());

            // Adicionar o MotoristaDTO na lista
            motoristasDTO.add(motoristaDTO);
        }

        // Retornar a lista de MotoristaDTO
        return motoristasDTO;
    }

    @GetMapping("/escolas/{idEscola}/motorista/{idMotorista}/criancas")
    public ResponseEntity<List<CriancaDTO>> getCriancaMotoristaEscola(@PathVariable Long idEscola,
            @PathVariable Long idMotorista) {
        try {
            // Busca os atendimentos do motorista na escola
            List<MotoristaEscola> atendimentos = motoristaEscolaRepository.findByMotoristaIdAndEscolaId(idMotorista, idEscola);

            // Verifica se não existem atendimentos para o motorista e escola especificados
            if (atendimentos.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ArrayList<>());
            }

            // Busca as crianças relacionadas ao motorista e escola
            List<Crianca> criancas = criancaRepository.findByMotoristaIdAndEscolaId(idMotorista, idEscola);

            // Mapeia as crianças para o DTO
            List<CriancaDTO> criancaDTOs = criancas.stream().map(crianca -> {
                CriancaDTO criancaDTO = new CriancaDTO();
                criancaDTO.setId(crianca.getId());
                criancaDTO.setNome(crianca.getNome());
                criancaDTO.setIdade(crianca.getIdade());
                criancaDTO.setPeriodo(crianca.getPeriodo());
                criancaDTO.setNomeResponsavel(crianca.getResponsavel().getNome());
                criancaDTO.setTelefoneResponsavel(crianca.getResponsavel().getTelefone());
                criancaDTO.setNomeEscola(crianca.getEscola().getNome());
                return criancaDTO;
            }).collect(Collectors.toList());

            // Retorna a lista de CriancaDTOs
            return ResponseEntity.ok(criancaDTOs);
        } catch (Exception e) {
            // Retorna erro caso ocorra alguma exceção
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ArrayList<>());
        }
    }

    @GetMapping("/escolas/{idEscola}/motorista/{idMotorista}/criancas/count")
    public ResponseEntity<Integer> countCriancaMotoristaEscola(@PathVariable Long idEscola,
            @PathVariable Long idMotorista) {
        try {
            List<MotoristaEscola> atendimentos = motoristaEscolaRepository.findByMotoristaIdAndEscolaId(idMotorista,
                    idEscola);

            if (atendimentos.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(0);
            }

            int count = criancaRepository.findByMotoristaIdAndEscolaId(idMotorista, idEscola).size();
            return ResponseEntity.ok(count);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(0);
        }
    }
}
