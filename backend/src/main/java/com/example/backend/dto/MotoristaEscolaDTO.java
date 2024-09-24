package com.example.backend.dto;

import lombok.Data;

@Data
public class MotoristaEscolaDTO {
    private Long idMotorista;
    private Long idEscola;
    public MotoristaEscolaDTO() {
    }
    public MotoristaEscolaDTO(Long idMotorista, Long idEscola) {
        this.idMotorista = idMotorista;
        this.idEscola = idEscola;
    }

    
}
