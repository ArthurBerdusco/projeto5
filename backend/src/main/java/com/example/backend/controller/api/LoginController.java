package com.example.backend.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.dto.Login;
import com.example.backend.security.Usuario;
import com.example.backend.security.UsuarioRepository;

@RestController
@RequestMapping("/loginapi")
public class LoginController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder encoder;

    @PostMapping
    public ResponseEntity<?> login(@RequestBody Login login) {
        // Verifica se o usuário existe
        Usuario usuario = usuarioRepository.findByEmail(login.getEmail()).get();

        if (usuario == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuário não encontrado");
        }

        // Verifica se a senha está correta
        boolean senhaCorreta = encoder.matches(login.getSenha(), usuario.getSenha());

        if (senhaCorreta) {
            return ResponseEntity.ok(usuario);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Senha incorreta");
        }
    }
}
