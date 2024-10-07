package com.example.backend.model;
import java.util.Date;
import java.util.List;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.Data;

@Entity
@Data // Gera automaticamente getters, setters, toString, equals e hashCode
public class Van {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String placa;
    private String renavam;
    private String anoFabricacao;
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

    @Temporal(TemporalType.DATE)
    private Date manutencaoRegular; // Data da última manutenção

    private boolean extintorIncendio;

    @Temporal(TemporalType.DATE)
    private Date certificacaoInspecao; // Data de validade da certificação

    private String cnh;
    private boolean antecedentesCriminais;

    @ElementCollection
    private List<String> fotosVeiculo; // URLs ou paths das fotos do veículo

    @ManyToOne
    @JoinColumn(name = "motorista_id", nullable = false)
    private Motorista motorista;
}
