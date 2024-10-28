package com.example.backend.dto;

import lombok.Data;


@Data
public class OfertaDTO {

    private Long id;
    private Long idMotorista;
    private String nomeMotorista;
    private Long idEscola;
    private String nomeEscola;
    private Long idCrianca;
    private String nomeCrianca;
    private Long idResponsavel;
    private String nomeResponsavel;
    private String mensagem;
    private String status;
    private String endereco;
    private Double valor;
    

}
