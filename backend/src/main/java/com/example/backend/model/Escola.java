package com.example.backend.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import lombok.Data;

@Entity
@Data
public class Escola {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    private String nome;
    private String rua;
    private String numero;
    private String telefone;
    private String status;

    @JsonIgnore
    @ManyToMany(mappedBy = "escolas")
    private List<Motorista> motoristas;
    
}
