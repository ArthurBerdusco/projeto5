package com.example.backend.model;

import java.util.List;

import com.example.backend.security.Usuario;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToOne;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Entity
@Data
@Getter
@Setter
public class Motorista {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    private String nome;
    private String email;
    private String senha;
    private String idade;
    private String cpf;
    private String telefone;
    private String status;

    @OneToOne
    private Usuario usuario;

    @ManyToMany
    @JoinTable(
        name = "motorista_escolas", // Nome da tabela de junção
        joinColumns = @JoinColumn(name = "motorista_id"), // Coluna para o motorista
        inverseJoinColumns = @JoinColumn(name = "escola_id") // Coluna para a escola
    )
    private List<Escola> escolas;

}
