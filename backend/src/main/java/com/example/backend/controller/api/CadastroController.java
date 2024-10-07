package com.example.backend.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.dto.UsuarioDTO;
import com.example.backend.model.Motorista;
import com.example.backend.model.Responsavel;
import com.example.backend.repository.MotoristaRepository;
import com.example.backend.repository.ResponsavelRepository;
import com.example.backend.security.Role;
import com.example.backend.security.Usuario;
import com.example.backend.security.UsuarioRepository;

@RestController
public class CadastroController {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private MotoristaRepository motoristaRepository;

    @Autowired
    private ResponsavelRepository responsaveisRepository;

    @PostMapping("/cadastro")
    public ResponseEntity<?> cadastrar(@RequestBody UsuarioDTO dto) {
        Motorista motorista = null; // Declaração fora do bloco
        Responsavel responsavel = null; // Declaração fora do bloco

        try {
            // Verifica se o email já está cadastrado
            if (usuarioRepository.existsByEmailIgnoringCase(dto.getEmail())) {
                return ResponseEntity.status(HttpStatus.CONFLICT)
                        .body("Erro: O email já está cadastrado.");
            }

            Usuario usuario = new Usuario();
            usuario.setEmail(dto.getEmail());
            usuario.setSenha(passwordEncoder.encode(dto.getSenha()));
            usuario.setStatus("ATIVO");
            usuario.setRole(dto.getRole());
            usuarioRepository.save(usuario);

            // Verifica a role do usuário e cria a entidade correspondente
            if (dto.getRole() == Role.MOTORISTA) {
                if (motoristaRepository.existsByCpf(dto.getCpf())) {
                    return ResponseEntity.status(HttpStatus.CONFLICT)
                            .body("Erro: O CPF já está cadastrado.");
                }
                motorista = new Motorista(); // Inicialização da variável
                motorista.setNome(dto.getNome());
                motorista.setEmail(dto.getEmail());
                motorista.setCpf(dto.getCpf());
                motorista.setTelefone(dto.getTelefone());
                motorista.setIdade(dto.getIdade());
                motorista.setEndereco(dto.getEndereco());
                motorista.setStatus("Pendente ativação");
                motorista.setUsuario(usuario);
                motoristaRepository.save(motorista);
            } else if (dto.getRole() == Role.RESPONSAVEL) {
                if (responsaveisRepository.existsByCpf(dto.getCpf())) {
                    return ResponseEntity.status(HttpStatus.CONFLICT)
                            .body("Erro: O CPF já está cadastrado.");
                }
                responsavel = new Responsavel(); // Inicialização da variável
                responsavel.setNome(dto.getNome());
                responsavel.setEmail(dto.getEmail());
                responsavel.setCpf(dto.getCpf());
                responsavel.setTelefone(dto.getTelefone());
                responsavel.setIdade(dto.getIdade());
                responsavel.setEndereco(dto.getEndereco());
                responsavel.setStatus("Pendente ativação");
                responsavel.setUsuario(usuario);
                responsaveisRepository.save(responsavel);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Papel do usuário inválido");
            }

            // Retorna a resposta com base no tipo de usuário criado
            if (motorista != null) {
                return ResponseEntity.status(HttpStatus.CREATED).body(motorista);
            } else if (responsavel != null) {
                return ResponseEntity.status(HttpStatus.CREATED).body(responsavel);
            }

        } catch (Exception e) {
            // Retorna um status 500 INTERNAL SERVER ERROR em caso de falha
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao cadastrar o usuário.");
        }

        return ResponseEntity.status(HttpStatus.CREATED).body("Usuário cadastrado com sucesso!");
    }

}
