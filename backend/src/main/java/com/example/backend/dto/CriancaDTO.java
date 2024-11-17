package com.example.backend.dto;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
public class CriancaDTO {
    private Long id;
    private String nome;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy")
    private LocalDate dataNascimento;
    private Integer idade;
    private Long idResponsavel;
    private Long idMotorista;
    private String nomeMotorista;
    private String periodo;

    private String nomeResponsavel;
    private String telefoneResponsavel;
    private String nomeEscola;
    private String status;
}
