package com.example.backend.controller.api;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.example.backend.model.Motorista;
import com.example.backend.model.Van;
import com.example.backend.repository.MotoristaRepository;
import com.example.backend.repository.VanRepository;
import com.example.backend.security.Usuario;
import com.example.backend.security.UsuarioRepository;

@RestController
@RequestMapping("/motorista")
public class MotoristaController {

    @Autowired
    MotoristaRepository motoristaRepository;

    @Autowired
    UsuarioRepository usuarioRepository;

    @Autowired
    VanRepository vanRepository;

    @PostMapping
    public void salvar(@RequestBody Motorista motorista) {
        motorista.setStatus("Pendente ativação");
        motoristaRepository.save(motorista);
    }

    @GetMapping("/van/{idMotorista}")
    public ResponseEntity<?> obterVanMotoristaId(@PathVariable Long idMotorista) {
        try {
            // Busca a van pelo id do motorista
            Van van = vanRepository.findByMotoristaId(idMotorista)
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                            "Van não encontrada para o motorista com ID: " + idMotorista));

 
            // Retorna status OK (200) com a van encontrada
            return ResponseEntity.ok(van);

        } catch (ResponseStatusException e) {
            // Retorna status NOT_FOUND (404) quando a van não for encontrada
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());

        } catch (Exception e) {
            // Loga a exceção no console e retorna um erro interno do servidor (500)
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao obter van: " + e.getMessage());
        }
    }

    @PostMapping("/cadastro-van/{idMotorista}")
    public ResponseEntity<?> cadastrar(@PathVariable Long idMotorista, @RequestBody Van van) {
        try {
            Motorista motorista = motoristaRepository.findById(idMotorista)
                    .orElseThrow(() -> new Exception("Motorista não encontrado"));

            van.setMotorista(motorista);

            vanRepository.save(van);

            Usuario usuario = motorista.getUsuario();
            usuario.setStatus("ATIVADO");
            motorista.setStatus("ATIVADO");

            usuarioRepository.save(usuario);

            return ResponseEntity.status(HttpStatus.CREATED).body("Cadastro realizado com sucesso!");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao cadastrar a van: " + e.getMessage());
        }
    }

    @PostMapping("/van/atualizar/{id}")
    public ResponseEntity<?> atualizarVan(@PathVariable Long id, @RequestBody Van vanAtualizada) {
        try {

            // Verifica se a van com o ID fornecido existe
            Van vanExistente = vanRepository.findById(id)
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                            "Van não encontrada com ID: " + id));

            // Verifica se o ID no corpo da requisição corresponde ao ID na URL
            if (!vanAtualizada.getId().equals(id)) {

                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "ID da van inconsistente com a URL");
            }

            // Atualiza os dados da van existente
            vanExistente = vanAtualizada;

            // Atualize outros campos conforme necessário...
            // Salva a van atualizada no banco de dados
            vanRepository.save(vanExistente);

            // Retorna status OK (200) com os dados da van atualizada
            return ResponseEntity.ok(vanExistente);

        } catch (ResponseStatusException e) {
            // Retorna o status apropriado e a mensagem da exceção
            return ResponseEntity.status(e.getStatusCode()).body(e.getReason());

        } catch (Exception e) {
            // Loga a exceção no console e retorna um erro interno do servidor (500)
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao atualizar a van: " + e.getMessage());
        }
    }

    @GetMapping("{id}")
    public ResponseEntity<?> getMotoristaById(@PathVariable Long id) {
        try {
            Optional<Motorista> motorista = motoristaRepository.findById(id);
            if (motorista.isPresent()) {
                return ResponseEntity.ok(motorista.get());
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Motorista não encontrado.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro interno do servidor.");
        }
    }

    
    @PostMapping("/atualizar/{id}")
    public ResponseEntity<Motorista> atualizarmotorista(@PathVariable Long id,
            @RequestBody Motorista motoristaAtualizado) {
        Optional<Motorista> motoristaExistente = motoristaRepository.findById(id);

        if (motoristaExistente.isPresent()) {
            Motorista motorista = motoristaExistente.get();

            // Atualizar os campos do responsável
            motorista.setNome(motoristaAtualizado.getNome());
            motorista.setEmail(motoristaAtualizado.getEmail());
            motorista.setCpf(motoristaAtualizado.getCpf());
            motorista.setTelefone(motoristaAtualizado.getTelefone());
            motorista.setEndereco(motoristaAtualizado.getEndereco());
            motorista.setSobreMim(motoristaAtualizado.getSobreMim());
            motorista.setExperiencia(motoristaAtualizado.getExperiencia());

            Motorista motoristaSalvo = motoristaRepository.save(motorista);
            return ResponseEntity.ok(motoristaSalvo);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
}
