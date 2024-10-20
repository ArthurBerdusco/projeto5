package com.example.backend.model;

import java.time.LocalDate;
import java.time.Period;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Entity
@Data
public class Crianca {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy")
    private LocalDate dataNascimento;
    private Integer idade;

    private String status;

    @ManyToOne
    @JoinColumn(name = "id_escola")
    private Escola escola;

    @ManyToOne
    @JoinColumn(name = "id_reponsavel")
    private Responsavel responsavel;

    @ManyToOne
    @JoinColumn(name = "id_motorista")
    private Motorista motorista;

    public Integer getIdade(){
       if (dataNascimento != null) {
            LocalDate today = LocalDate.now();
            return Period.between(dataNascimento, today).getYears();
        }
        return 0; 
    }

}
