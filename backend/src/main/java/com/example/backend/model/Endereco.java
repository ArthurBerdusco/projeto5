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
public class Endereco {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
<<<<<<< HEAD

    private string rua;
    private string numero;
    private string bairro;
    private string cidade;
    private string cep;
    private string estado;
    private string complemento;

=======
    private String rua;
    private String numero;
    private String bairro;
    private String cidade;
    private String cep;
    private String estado;
    private String complemento;
    
>>>>>>> 9c67acc (corrigido bugs na tela de atendimento de escola e adicionado classes commit eliseu)
    @OneToOne
    @JoinColumn(name = "id_reponsavel")
    private Responsavel responsavel;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRua() {
        return rua;
    }

    public void setRua(String rua) {
        this.rua = rua;
    }

    public String getNumero() {
        return numero;
    }

    public void setNumero(String numero) {
        this.numero = numero;
    }

    public String getBairro() {
        return bairro;
    }

    public void setBairro(String bairro) {
        this.bairro = bairro;
    }

    public String getCidade() {
        return cidade;
    }

    public void setCidade(String cidade) {
        this.cidade = cidade;
    }

    public String getCep() {
        return cep;
    }

    public void setCep(String cep) {
        this.cep = cep;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public String getComplemento() {
        return complemento;
    }

    public void setComplemento(String complemento) {
        this.complemento = complemento;
    }

    public Responsavel getResponsavel() {
        return responsavel;
    }

    public void setResponsavel(Responsavel responsavel) {
        this.responsavel = responsavel;
    }
}
