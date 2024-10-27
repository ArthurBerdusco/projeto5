package com.example.backend.controller.api;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.dto.Login;
import com.example.backend.model.Operador;
import com.example.backend.repository.MotoristaRepository;
import com.example.backend.repository.OperadorRepository;
import com.example.backend.repository.ResponsavelRepository;
import com.example.backend.security.Role;
import com.example.backend.security.Usuario;
import com.example.backend.security.UsuarioRepository;

@RestController
@RequestMapping("/loginapi")
public class LoginController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private OperadorRepository operadorRepository;

    @Autowired
    private MotoristaRepository motoristaRepository;

    @Autowired
    private ResponsavelRepository responsavelRepository;

    @Autowired
    private PasswordEncoder encoder;



    @PostMapping
    public ResponseEntity<?> login(@RequestBody Login login) {

        // Verifica se o usuário existe
        Optional<Usuario> usuarioOptional = usuarioRepository.findByEmailIgnoreCase(login.getEmail());

        if (usuarioOptional.isEmpty()) {
            System.out.println("Usuario não encontrado");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuário não encontrado");
        }

        Usuario usuario = usuarioOptional.get();

        // Verifica se a senha está correta
        if (!encoder.matches(login.getSenha(), usuario.getSenha())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Senha incorreta");
        }

        // Retorna os dados conforme o papel do usuário
        switch (usuario.getRole()) {
            case RESPONSAVEL:
                return responsavelRepository.findByUsuarioId(usuario.getId())
                        .<ResponseEntity<?>>map(responsavel -> ResponseEntity.ok().body(responsavel))
                        .orElse(ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Responsável não encontrado"));
            case MOTORISTA:
                return motoristaRepository.findByUsuarioId(usuario.getId())
                        .<ResponseEntity<?>>map(motorista -> ResponseEntity.ok().body(motorista))
                        .orElse(ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Motorista não encontrado"));
            default:
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Papel do usuário inválido");
        }
    }

    @PostMapping("/admin")
    public void adminPost(){
        Usuario u = new Usuario();
            Operador o = new Operador();
            u = new Usuario();
            u.setEmail("bryan@email.com.br");
            u.setSenha(encoder.encode("1234"));
            u.setRole(Role.OPERADOR);
            u.setStatus("ATIVO");
            o.setUsuario(u);
            usuarioRepository.save(u);
            operadorRepository.save(o);
    }

}
