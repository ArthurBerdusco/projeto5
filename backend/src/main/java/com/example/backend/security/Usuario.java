package com.example.backend.security;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private String email;
    private String senha;
    private String idade;
    private String cpf;
    private String telefone;

    @Enumerated(EnumType.STRING)
    private Role role;

    public enum Role {
        OPERADOR,
        MOTORISTA,
        RESPONSAVEL
    }

}
