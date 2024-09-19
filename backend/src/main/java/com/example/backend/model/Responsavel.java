package com.example.backend.model;

import com.example.backend.security.Usuario;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Entity
@Data
@Getter
@Setter
public class Responsavel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    private String nome;
    private String email;
    private String senha;
    private String idade;
    private String cpf;
    private String telefone;
    private String status;

    @OneToOne
    private Usuario usuario;

    @OneToOne
    @JoinColumn(name = "id_endereco")
    private Endereco endereco;
}
