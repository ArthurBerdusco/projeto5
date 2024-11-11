package com.example.backend.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Lob;
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
    private String sobreMimMotorista;
    private String experienciaMotorista;

    private BigDecimal valor;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy HH:mm:ss")
    private LocalDateTime dataPedido;
    @Lob
    private byte[] imagemMotorista;
    private byte[] imagemVan;

}
