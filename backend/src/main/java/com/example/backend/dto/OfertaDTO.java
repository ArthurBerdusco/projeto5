package com.example.backend.dto;

public class OfertaDTO {

    private Long id;
    private Long motoristaId;
    private Long escolaId;
    private String escolaNome;
    private Long criancaId;
    private String criancaNome;
    private Long responsavelId;
    private String responsavelNome;
    private String mensagem;

    public String getEscolaNome() {
        return escolaNome;
    }

    public void setEscolaNome(String escolaNome) {
        this.escolaNome = escolaNome;
    }

    public String getCriancaNome() {
        return criancaNome;
    }

    public void setCriancaNome(String criancaNome) {
        this.criancaNome = criancaNome;
    }

    public String getResponsavelNome() {
        return responsavelNome;
    }

    public void setResponsavelNome(String responsavelNome) {
        this.responsavelNome = responsavelNome;
    }

    public Long getResponsavelId() {
        return responsavelId;
    }

    public void setResponsavelId(Long responsavelId) {
        this.responsavelId = responsavelId;
    }

    public Long getMotoristaId() {
        return motoristaId;
    }

    public void setMotoristaId(Long motoristaId) {
        this.motoristaId = motoristaId;
    }

    public Long getCriancaId() {
        return criancaId;
    }

    public void setCriancaId(Long criancaId) {
        this.criancaId = criancaId;
    }

    public Long getEscolaId() {
        return escolaId;
    }

    public void setEscolaId(Long escolaId) {
        this.escolaId = escolaId;
    }

    public String getMensagem() {
        return mensagem;
    }

    public void setMensagem(String mensagem) {
        this.mensagem = mensagem;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

}
