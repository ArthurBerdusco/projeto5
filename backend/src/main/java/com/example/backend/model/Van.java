package com.example.backend.model;

import java.time.Year;
import java.util.List;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Entity
@Data // Gera automaticamente getters, setters, toString, equals e hashCode
public class Van {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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

    @ElementCollection
    private List<String> fotosVeiculo;

    @ManyToOne
    @JoinColumn(name = "motorista_id", nullable = false)
    private Motorista motorista;
}
