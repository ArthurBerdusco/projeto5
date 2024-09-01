package com.example.backend.controller.api;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.dto.Login;
import com.example.backend.model.Motorista;

@RestController
@RequestMapping("login")
public class LoginController {

    @PostMapping
    public ResponseEntity<String> login(@RequestBody Login login) {
        System.out.println(login);
        return ResponseEntity.ok("Logado com sucesso");
    }

}
