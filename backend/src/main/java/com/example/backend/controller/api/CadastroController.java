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
    public ResponseEntity<String> cadastrar(@RequestBody UsuarioDTO dto) {

        try {
            Usuario usuario = new Usuario();
            usuario.setEmail(dto.getEmail());
            usuario.setSenha(passwordEncoder.encode(dto.getSenha()));
            usuario.setStatus("ATIVO");
            usuario.setRole(dto.getRole());
            usuarioRepository.save(usuario);

            // Verifica a role do usuário e cria a entidade correspondente
            if (dto.getRole() == Role.MOTORISTA) {
                Motorista motorista = new Motorista();
                motorista.setNome(dto.getNome());
                motorista.setEmail(dto.getEmail());
                motorista.setCpf(dto.getCpf());
                motorista.setTelefone(dto.getTelefone());
                motorista.setIdade(dto.getIdade());
                motorista.setStatus("Pendente ativação");
                motorista.setUsuario(usuario);

                motoristaRepository.save(motorista);
            } else if (usuario.getRole() == Role.RESPONSAVEL) {
                Responsavel responsavel = new Responsavel();
                responsavel.setNome(dto.getNome());
                responsavel.setEmail(dto.getEmail());
                responsavel.setCpf(dto.getCpf());
                responsavel.setTelefone(dto.getTelefone());
                responsavel.setIdade(dto.getIdade());
                responsavel.setStatus("Pendente ativação");
                responsavel.setUsuario(usuario);
                responsaveisRepository.save(responsavel);
            }
            // Retorna um status 201 CREATED se o cadastro for bem-sucedido
            return ResponseEntity.status(HttpStatus.CREATED).body("Cadastro realizado com sucesso!");

        } catch (Exception e) {
            // Retorna um status 500 INTERNAL SERVER ERROR em caso de falha
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao cadastrar o usuário.");
        }
    }

}
