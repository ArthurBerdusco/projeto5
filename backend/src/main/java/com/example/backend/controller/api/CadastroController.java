package com.example.backend.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.security.Usuario;
import com.example.backend.security.UsuarioRepository;

@RestController
public class CadastroController {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @PostMapping("/cadastro")
    public ResponseEntity<String> cadastrar(@RequestBody Usuario usuario) {

        try {
            usuario.setSenha(passwordEncoder.encode(usuario.getSenha()));
            // Tenta salvar o usuário no banco de dados
            usuarioRepository.save(usuario);

            // Retorna um status 201 CREATED se o cadastro for bem-sucedido
            return ResponseEntity.status(HttpStatus.CREATED).body("Cadastro realizado com sucesso!");

        } catch (Exception e) {
            // Retorna um status 500 INTERNAL SERVER ERROR em caso de falha
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao cadastrar o usuário.");
        }
    }

}
