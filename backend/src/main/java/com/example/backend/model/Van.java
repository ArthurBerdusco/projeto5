package com.example.backend.model;

import java.time.Year;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;

@Entity
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

    @OneToOne
    @JoinColumn(name = "motorista_id", referencedColumnName = "id")
    private Motorista motorista;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPlaca() {
        return placa;
    }

    public void setPlaca(String placa) {
        this.placa = placa;
    }

    public String getRenavam() {
        return renavam;
    }

    public void setRenavam(String renavam) {
        this.renavam = renavam;
    }

    public Year getAnoFabricacao() {
        return anoFabricacao;
    }

    public void setAnoFabricacao(Year anoFabricacao) {
        this.anoFabricacao = anoFabricacao;
    }

    public String getModelo() {
        return modelo;
    }

    public void setModelo(String modelo) {
        this.modelo = modelo;
    }

    public String getFabricante() {
        return fabricante;
    }

    public void setFabricante(String fabricante) {
        this.fabricante = fabricante;
    }

    public String getCor() {
        return cor;
    }

    public void setCor(String cor) {
        this.cor = cor;
    }

    public int getQuantidadeAssentos() {
        return quantidadeAssentos;
    }

    public void setQuantidadeAssentos(int quantidadeAssentos) {
        this.quantidadeAssentos = quantidadeAssentos;
    }

    public boolean isAcessibilidade() {
        return acessibilidade;
    }

    public void setAcessibilidade(boolean acessibilidade) {
        this.acessibilidade = acessibilidade;
    }

    public boolean isArCondicionado() {
        return arCondicionado;
    }

    public void setArCondicionado(boolean arCondicionado) {
        this.arCondicionado = arCondicionado;
    }

    public boolean isCortinas() {
        return cortinas;
    }

    public void setCortinas(boolean cortinas) {
        this.cortinas = cortinas;
    }

    public boolean isTvEntretenimento() {
        return tvEntretenimento;
    }

    public void setTvEntretenimento(boolean tvEntretenimento) {
        this.tvEntretenimento = tvEntretenimento;
    }

    public boolean isCamerasSeguranca() {
        return camerasSeguranca;
    }

    public void setCamerasSeguranca(boolean camerasSeguranca) {
        this.camerasSeguranca = camerasSeguranca;
    }

    public boolean isCintoSeguranca() {
        return cintoSeguranca;
    }

    public void setCintoSeguranca(boolean cintoSeguranca) {
        this.cintoSeguranca = cintoSeguranca;
    }

    public boolean isExtintorIncendio() {
        return extintorIncendio;
    }

    public void setExtintorIncendio(boolean extintorIncendio) {
        this.extintorIncendio = extintorIncendio;
    }

    public String getCnh() {
        return cnh;
    }

    public void setCnh(String cnh) {
        this.cnh = cnh;
    }

    public boolean isAntecedentesCriminais() {
        return antecedentesCriminais;
    }

    public void setAntecedentesCriminais(boolean antecedentesCriminais) {
        this.antecedentesCriminais = antecedentesCriminais;
    }

    public Motorista getMotorista() {
        return motorista;
    }

    public void setMotorista(Motorista motorista) {
        this.motorista = motorista;
    }

    @Override
    public String toString() {
        return "Van [id=" + id + ", placa=" + placa + ", renavam=" + renavam + ", anoFabricacao=" + anoFabricacao
                + ", modelo=" + modelo + ", fabricante=" + fabricante + ", cor=" + cor + ", quantidadeAssentos="
                + quantidadeAssentos + ", acessibilidade=" + acessibilidade + ", arCondicionado=" + arCondicionado
                + ", cortinas=" + cortinas + ", tvEntretenimento=" + tvEntretenimento + ", camerasSeguranca="
                + camerasSeguranca + ", cintoSeguranca=" + cintoSeguranca + ", extintorIncendio=" + extintorIncendio
                + ", cnh=" + cnh + ", antecedentesCriminais=" + antecedentesCriminais + "]";
    }

    
}
