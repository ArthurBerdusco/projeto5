package com.example.backend.model;

<<<<<<< HEAD
import com.example.backend.security.Usuario;

=======
>>>>>>> 9c67acc (corrigido bugs na tela de atendimento de escola e adicionado classes commit eliseu)
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
<<<<<<< HEAD
=======
import jakarta.persistence.JoinColumn;
>>>>>>> 9c67acc (corrigido bugs na tela de atendimento de escola e adicionado classes commit eliseu)
import jakarta.persistence.OneToOne;
import lombok.Data;

@Entity
@Data
public class Van {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
<<<<<<< HEAD

    private string placa;
    private string renavam;
    private string anoVeiculo;
    private string cnh;
    private int quantidadeAcentos;

=======
    private String placa;
    private String renavam;
    private String anoVeiculo;
    private String cnh;
    private int quantidadeAcentos;
>>>>>>> 9c67acc (corrigido bugs na tela de atendimento de escola e adicionado classes commit eliseu)
    private boolean arCondicionado;
    private boolean cortina;
    private boolean tv;
    private boolean camera;
    private boolean acessibilidade;

    @OneToOne
    @JoinColumn(name = "id_motorista")
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

    public int getQuantidadeAcentos() {
        return quantidadeAcentos;
    }

    public void setQuantidadeAcentos(int quantidadeAcentos) {
        this.quantidadeAcentos = quantidadeAcentos;
    }

    public String getRenavam() {
        return renavam;
    }

    public void setRenavam(String renavam) {
        this.renavam = renavam;
    }

    public String getAnoVeiculo() {
        return anoVeiculo;
    }

    public void setAnoVeiculo(String anoVeiculo) {
        this.anoVeiculo = anoVeiculo;
    }

    public String getCnh() {
        return cnh;
    }

    public void setCnh(String cnh) {
        this.cnh = cnh;
    }

    public boolean isArCondicionado() {
        return arCondicionado;
    }

    public void setArCondicionado(boolean arCondicionado) {
        this.arCondicionado = arCondicionado;
    }

    public boolean isCortina() {
        return cortina;
    }

    public void setCortina(boolean cortina) {
        this.cortina = cortina;
    }

    public boolean isTv() {
        return tv;
    }

    public void setTv(boolean tv) {
        this.tv = tv;
    }

    public boolean isCamera() {
        return camera;
    }

    public void setCamera(boolean camera) {
        this.camera = camera;
    }

    public boolean isAcessibilidade() {
        return acessibilidade;
    }

    public void setAcessibilidade(boolean acessibilidade) {
        this.acessibilidade = acessibilidade;
    }

    public Motorista getMotorista() {
        return motorista;
    }

    public void setMotorista(Motorista motorista) {
        this.motorista = motorista;
    }
<<<<<<< HEAD
}
=======
}
>>>>>>> 9c67acc (corrigido bugs na tela de atendimento de escola e adicionado classes commit eliseu)
