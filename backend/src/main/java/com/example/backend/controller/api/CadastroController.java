package com.example.backend.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.model.Motorista;
import com.example.backend.model.Responsavel;
import com.example.backend.repository.MotoristaRepository;
import com.example.backend.repository.ResponsaveisRepository;
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
    private ResponsaveisRepository responsaveisRepository;

    @PostMapping("/cadastro")
    public ResponseEntity<String> cadastrar(@RequestBody Usuario usuario) {

        try {
            usuario.setSenha(passwordEncoder.encode(usuario.getSenha()));
            usuarioRepository.save(usuario);

            // Verifica a role do usuário e cria a entidade correspondente
            if (usuario.getRole() == Usuario.Role.MOTORISTA) {
                Motorista motorista = new Motorista();
                motorista.setNome(usuario.getNome());
                motorista.setEmail(usuario.getEmail());
                motorista.setCpf(usuario.getCpf());
                motorista.setTelefone(usuario.getTelefone());
                motorista.setSenha(usuario.getSenha());
                motorista.setIdade(usuario.getIdade());
                motorista.setStatus("Pendente ativação");
                motorista.setUsuario(usuario);

                motoristaRepository.save(motorista);
            } else if (usuario.getRole() == Usuario.Role.RESPONSAVEL) {
                Responsavel responsavel = new Responsavel();
                responsavel.setNome(usuario.getNome());
                responsavel.setEmail(usuario.getEmail());
                responsavel.setCpf(usuario.getCpf());
                responsavel.setTelefone(usuario.getTelefone());
                responsavel.setSenha(usuario.getSenha());
                responsavel.setIdade(usuario.getIdade());
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
