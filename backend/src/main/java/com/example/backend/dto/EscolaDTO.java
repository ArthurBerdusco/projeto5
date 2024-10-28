package com.example.backend.dto;

import lombok.Data;

@Data
public class EscolaDTO {
    
    private Long id;
    private String nome;
    private String rua;
    private String numero;
    private String telefone;
    private String status;
    private byte[] dados;
    
}
