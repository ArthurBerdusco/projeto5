package com.example.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import lombok.Data;

@Entity
@Data
public class Crianca {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    private Integer idade;

    private String status;

    @ManyToOne
    @JoinColumn(name = "id_escola")
    private Escola escola;

    @ManyToOne
    @JoinColumn(name = "id_reponsavel")
    private Responsavel responsavel;

    @OneToOne
    @JoinColumn(name = "id_motorista")
    private Motorista motorista;

}
