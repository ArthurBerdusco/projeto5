package com.example.backend.dto;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
public class CriancaDTO {
    private String nome;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy")
    private LocalDate dataNascimento;
    private Integer idade;
    private Long idResponsavel;
    private String periodo;
}
