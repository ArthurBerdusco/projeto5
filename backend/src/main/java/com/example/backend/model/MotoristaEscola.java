package com.example.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Table(name = "motorista_escolas")
@Entity
@Getter
@Setter
public class MotoristaEscola {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne // Adicione esta anotação
    @JoinColumn(name = "motorista_id")
    private Motorista motorista;

    @ManyToOne // Adicione esta anotação
    @JoinColumn(name = "escola_id")
    private Escola escola;
}
