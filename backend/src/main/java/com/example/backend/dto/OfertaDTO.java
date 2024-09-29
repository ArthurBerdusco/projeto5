package com.example.backend.dto;

public class OfertaDTO {

    private Long responsavelId;
    private Long motoristaId;
    private Long criancaId;
    private Long escolaId;

    private String mensagem;

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

}
