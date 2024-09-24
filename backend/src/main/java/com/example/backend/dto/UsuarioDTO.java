package com.example.backend.dto;

import com.example.backend.security.Role;

import lombok.Data;

@Data
public class UsuarioDTO {
    private String nome;
    private String email;
    private String senha;
    private Integer idade;
    private String cpf;
    private String telefone;
    private Role role;
}
