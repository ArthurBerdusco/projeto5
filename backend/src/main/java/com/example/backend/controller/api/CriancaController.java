package com.example.backend.controller.api;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.example.backend.dto.AusenciaDTO;
import com.example.backend.dto.CriancaDTO;
import com.example.backend.model.Ausencia;
import com.example.backend.model.Crianca;
import com.example.backend.model.Escola;
import com.example.backend.model.Motorista;
import com.example.backend.model.Responsavel;
import com.example.backend.repository.AusenciaRepository;
import com.example.backend.repository.CriancaRepository;
import com.example.backend.repository.EscolaRepository;
import com.example.backend.repository.ResponsavelRepository;

@RestController
public class CriancaController {

    @Autowired
    ResponsavelRepository responsavelRepository;

    @Autowired
    EscolaRepository escolaRepository;

    @Autowired
    CriancaRepository criancaRepository;

    @Autowired
    AusenciaRepository ausenciaRepository;

    @PostMapping
    public void salvar(@RequestBody Crianca crianca) {
        crianca.setStatus("Pendente ativação");
        criancaRepository.save(crianca);
    }

    // Exemplo de endpoint no Spring Boot
    @GetMapping("/crianca/responsavel/{id}")
    public ResponseEntity<List<CriancaDTO>> getCriancasByResponsavel(@PathVariable Long id) {
        List<Crianca> criancas = criancaRepository.findByResponsavelId(id);

        if (criancas == null || criancas.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(java.util.Collections.emptyList());
        }

        // Mapeia cada Crianca para CriancaDTO
        List<CriancaDTO> criancasDTO = criancas.stream().map(crianca -> {
            CriancaDTO criancaDTO = new CriancaDTO();
            criancaDTO.setId(crianca.getId());
            criancaDTO.setIdade(crianca.getIdade());
            criancaDTO.setNome(crianca.getNome());
            criancaDTO.setPeriodo(crianca.getPeriodo());
            criancaDTO.setStatus(crianca.getStatus());

            // Adicione outros campos conforme necessário
            return criancaDTO;
        }).collect(Collectors.toList());

        return ResponseEntity.ok(criancasDTO);
    }

    @GetMapping("/criancas/{id}")
    public ResponseEntity<CriancaDTO> getCrianca(@PathVariable Long id) {
        // Usando Optional para verificar se a criança existe
        Optional<Crianca> criancaOptional = criancaRepository.findById(id);

        if (!criancaOptional.isPresent()) {
            // Retorna 404 se a criança não for encontrada
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        Crianca crianca = criancaOptional.get();
        CriancaDTO criancaDTO = new CriancaDTO();
        criancaDTO.setId(crianca.getId());
        criancaDTO.setIdade(crianca.getIdade());
        criancaDTO.setNome(crianca.getNome());
        criancaDTO.setIdResponsavel(crianca.getResponsavel().getId());

        // Verifica se o motorista está presente, caso contrário, atribui null
        if (crianca.getMotorista() != null) {
            criancaDTO.setIdMotorista(crianca.getMotorista().getId());
            criancaDTO.setNomeMotorista(crianca.getMotorista().getNome());

        } else {
            criancaDTO.setIdMotorista(null); // Explicitamente define como null se não houver motorista
        }

        // Aqui você pode definir o periodo se necessário, por exemplo:
        criancaDTO.setPeriodo(crianca.getPeriodo());

        return ResponseEntity.ok(criancaDTO);
    }

    @PostMapping("/crianca")
    public ResponseEntity<String> cadastroCrianca(@RequestBody CriancaDTO dto) {
        try {
            Crianca crianca = new Crianca();
            crianca.setNome(dto.getNome());
            crianca.setDataNascimento(dto.getDataNascimento());
            crianca.setPeriodo(dto.getPeriodo());
            crianca.setResponsavel(responsavelRepository.findById(dto.getIdResponsavel()).orElseThrow());

            criancaRepository.save(crianca);
            return ResponseEntity.status(HttpStatus.CREATED).body("Crianca cadastrada com sucesso!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao cadastrar a criança.");
        }
    }

    @GetMapping("/crianca/{id}")
    public ResponseEntity<CriancaDTO> buscarCriancaPorId(@PathVariable Long id) {
        try {
            Crianca crianca = criancaRepository.findById(id).get();
            CriancaDTO criancaDTO = new CriancaDTO();
            criancaDTO.setId(crianca.getId());
            criancaDTO.setIdade(crianca.getIdade());
            criancaDTO.setNome(crianca.getNome());

            return ResponseEntity.ok(criancaDTO);
        } catch (ResponseStatusException ex) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Criança não encontrada", ex);
        }
    }

    @PutMapping("/crianca/{id}")
    public ResponseEntity<Crianca> atualizarCrianca(@PathVariable Long id, @RequestBody Crianca criancaAtualizada) {
        // Tenta encontrar a criança pelo ID
        Optional<Crianca> optionalCrianca = criancaRepository.findById(id);

        if (optionalCrianca.isPresent()) {
            Crianca criancaExistente = optionalCrianca.get();

            // Atualiza os campos necessários
            criancaExistente.setNome(criancaAtualizada.getNome());
            criancaExistente.setDataNascimento(criancaAtualizada.getDataNascimento());
            criancaExistente.setPeriodo(criancaAtualizada.getPeriodo());

            // Salva as alterações
            Crianca criancaSalva = criancaRepository.save(criancaExistente);
            return ResponseEntity.ok(criancaSalva);
        } else {
            // Lança exceção se a criança não for encontrada
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Criança não encontrada");
        }
    }

    @PostMapping("/cadastro-crianca/{escolaId}/{responsavelId}")
    public ResponseEntity<String> cadastrarCrianca(@PathVariable Long escolaId, @PathVariable Long responsavelId,
            @RequestBody Crianca crianca) {
        try {
            // Supondo que a crianca seja associado a um responsável
            Optional<Responsavel> optionalResponsavel = responsavelRepository.findById(responsavelId);

            Optional<Escola> optionalEscola = escolaRepository.findById(escolaId);

            if (optionalResponsavel.isPresent() && optionalEscola.isPresent()) {
                Responsavel responsavel = optionalResponsavel.get();
                Escola escola = optionalEscola.get();
                // Cria um novo objeto Endereco e define seus atributos
                Crianca novaCrianca = new Crianca();
                novaCrianca.setNome(crianca.getNome());
                novaCrianca.setIdade(crianca.getIdade());
                novaCrianca.setStatus("Ativo");

                // Associa o endereço ao responsável
                crianca.setResponsavel(responsavel);
                crianca.setEscola(escola);

                // Salva o endereço no banco de dados
                criancaRepository.save(crianca);
                return ResponseEntity.status(HttpStatus.CREATED).body("Crianca cadastrada com sucesso!");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Responsável ou Escola não encontrado.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao cadastrar a criança.");
        }
    }

    @GetMapping("/crianca/{id}/motorista")
    public ResponseEntity<Motorista> getMotoristaCriancaId(@PathVariable Long id) {
        Optional<Crianca> criancaOptional = criancaRepository.findById(id);

        if (!criancaOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        Crianca crianca = criancaOptional.get();

        if (crianca.getMotorista() == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        Motorista motorista = crianca.getMotorista();

        return ResponseEntity.ok(motorista);
    }

    @PostMapping("/crianca/{id}/ausencias") // Endpoint para salvar ausências
    public ResponseEntity<Void> registrarAusencias(@PathVariable Long id, @RequestBody List<Ausencia> ausencias) {
        // Buscar a criança pelo ID
        Crianca crianca = criancaRepository.findById(id).orElse(null);
        if (crianca == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // Criança não encontrada
        }

        // Associar a criança com cada ausência e salvar
        for (Ausencia ausencia : ausencias) {
            ausencia.setCrianca(crianca);
            ausenciaRepository.save(ausencia);
        }

        return ResponseEntity.status(HttpStatus.CREATED).build(); // Retorna 201 Created
    }

    @GetMapping("/ausencias/crianca/{id}")
    public ResponseEntity<List<AusenciaDTO>> getAusenciasPorCrianca(@PathVariable Long id) {
        List<Ausencia> ausencias = ausenciaRepository.findByCriancaId(id);

        if (ausencias == null || ausencias.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(java.util.Collections.emptyList());
        }

        // Mapeia cada Ausencia para AusenciaDTO
        List<AusenciaDTO> ausenciasDTO = ausencias.stream().map(ausencia -> {
            AusenciaDTO dto = new AusenciaDTO();
            dto.setId(ausencia.getId());
            dto.setData(ausencia.getData());
            dto.setMotivo(ausencia.getMotivo());
            return dto;
        }).collect(Collectors.toList());

        return ResponseEntity.ok(ausenciasDTO);
    }

    @DeleteMapping("/ausencias/{id}")
    public ResponseEntity<String> deleteAusencia(@PathVariable Long id) {
        try {
            System.out.println("\n\n\n" + "ENTREI AQUI" + "\n\n\n");
            if (!ausenciaRepository.existsById(id)) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Ausência não encontrada com o ID: " + id);
            }
            ausenciaRepository.deleteById(id);
            return ResponseEntity.ok("Ausência excluída com sucesso.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao excluir a ausência: " + e.getMessage());
        }
    }

    @PatchMapping("/crianca/{id}/status")
    public ResponseEntity<Void> atualizarStatus(@PathVariable Long id, @RequestParam String status) {
        Crianca crianca = criancaRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Criança não encontrada"));

        crianca.setStatus(status);
        criancaRepository.save(crianca);

        return ResponseEntity.ok().build();
    }
}
