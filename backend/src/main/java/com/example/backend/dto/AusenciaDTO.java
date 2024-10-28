package com.example.backend.dto;

import java.time.LocalDate;

import lombok.Data;

@Data
public class AusenciaDTO {

    private Long id;
    private LocalDate data;
    private String motivo;
}
