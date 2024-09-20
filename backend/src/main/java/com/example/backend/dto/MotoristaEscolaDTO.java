package com.example.backend.dto;

import lombok.Data;

@Data
public class MotoristaEscolaDTO {
    private Long idUsuario;
    private Long idEscola;
    public MotoristaEscolaDTO() {
    }
    public MotoristaEscolaDTO(Long idUsuario, Long idEscola) {
        this.idUsuario = idUsuario;
        this.idEscola = idEscola;
    }

    
}
