package com.example.backend.dto;

import com.example.backend.model.Endereco;

import lombok.Data;

@Data
public class EnderecoDTO {

    // Construtor vazio (padrão)
    public EnderecoDTO() {}


    public EnderecoDTO(Endereco endereco) {
        if (endereco != null) {
            this.id = endereco.getId();
            this.rua = endereco.getRua();
            this.numero = endereco.getNumero();
            this.bairro = endereco.getBairro();
            this.cidade = endereco.getCidade();
            this.cep = endereco.getCep();
            this.estado = endereco.getEstado();
            this.complemento = endereco.getComplemento();
        }
    }

    private Long id;
    private String rua;
    private String numero;
    private String bairro;
    private String cidade;
    private String cep;
    private String estado;
    private String complemento;
}
