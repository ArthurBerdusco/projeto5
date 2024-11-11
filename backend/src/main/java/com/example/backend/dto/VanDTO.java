package com.example.backend.dto;

import java.time.Year;

import jakarta.persistence.Lob;
import lombok.Data;

@Data
public class VanDTO {

    private Long id;

    private String placa;
    private String renavam;
    private Year anoFabricacao;
    private String modelo;
    private String fabricante;
    private String cor;
    private int quantidadeAssentos;
    private boolean acessibilidade;
    private boolean arCondicionado;
    private boolean cortinas;
    private boolean tvEntretenimento;
    private boolean camerasSeguranca;
    private boolean cintoSeguranca;

    private boolean extintorIncendio;

    private String cnh;
    private boolean antecedentesCriminais;

    @Lob
    private byte[] imagem;
    
}
