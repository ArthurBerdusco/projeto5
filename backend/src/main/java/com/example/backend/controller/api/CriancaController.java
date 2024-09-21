package com.example.backend.controller.api;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.model.Crianca;
import com.example.backend.model.Endereco;
import com.example.backend.model.Escola;
import com.example.backend.model.Responsavel;
import com.example.backend.repository.CriancaRepository;
import com.example.backend.repository.EscolaRepository;
import com.example.backend.repository.ResponsaveisRepository;

@RestController
public class CriancaController {

    @Autowired
    ResponsaveisRepository responsavelRepository;

    @Autowired
    EscolaRepository escolaRepository;

    @Autowired
    CriancaRepository criancaRepository;

    @PostMapping
    public void salvar(@RequestBody Crianca crianca) {
        crianca.setStatus("Pendente ativação");
        criancaRepository.save(crianca);
    }

    @PostMapping("/cadastro-crianca/{escolaId}/{responsavelId}")
    public ResponseEntity<String> cadastrarCrianca(@PathVariable Long escolaId, @PathVariable Long responsavelId, @RequestBody Crianca crianca) {
        try {
            // Supondo que a crianca seja associado a um responsável
            Optional<Responsavel> optionalResponsavel = responsavelRepository.findById(responsavelId);

            Optional<Escola> optionalEscola = escolaRepository.findById(escolaId);

            if (optionalResponsavel.isPresent() && optionalEscola.isPresent()) {
                Responsavel responsavel = optionalResponsavel.get();
                Escola escola = optionalEscola.get();
                // Cria um novo objeto Endereco e define seus atributos
                Crianca novaCrianca = new Crianca();
                novaCrianca.setNome(crianca.getNome());
                novaCrianca.setIdade(crianca.getIdade());
                novaCrianca.setStatus("Ativo");
                
                // Associa o endereço ao responsável
                crianca.setResponsavel(responsavel);
                crianca.setEscola(escola);

                // Salva o endereço no banco de dados
                criancaRepository.save(crianca);
                return ResponseEntity.status(HttpStatus.CREATED).body("Crianca cadastrada com sucesso!");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Responsável ou Escola não encontrado.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao cadastrar a criança.");
        }
    }
}
