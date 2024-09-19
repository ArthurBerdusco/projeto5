package com.example.backend.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.model.Responsavel;
import com.example.backend.repository.ResponsaveisRepository;

@RestController
@RequestMapping("/responsavel")
public class ResponsavelController {

    @Autowired
    ResponsaveisRepository responsaveisRepository;

    @PostMapping
    public void salvar(@RequestBody Responsavel responsavel) {
        responsavel.setStatus("Pendente ativação");
        responsaveisRepository.save(responsavel);
    }

    @PostMapping("/cadastro-endereco")
    public ResponseEntity<String> cadastrarEndereco(@RequestBody Endereco endereco, @RequestParam Long responsavelId) {
    try {
        // Supondo que o endereço seja associado a um responsável
        Optional<Responsavel> optionalResponsavel = responsavelRepository.findById(responsavelId);
        
        if (optionalResponsavel.isPresent()) {
            Responsavel responsavel = optionalResponsavel.get();

            // Cria um novo objeto Endereco e define seus atributos
            Endereco novoEndereco = new Endereco();
            novoEndereco.setRua(endereco.getRua());
            novoEndereco.setNumero(endereco.getNumero());
            novoEndereco.setBairro(endereco.getBairro());
            novoEndereco.setCidade(endereco.getCidade());
            novoEndereco.setEstado(endereco.getEstado());
            novoEndereco.setCep(endereco.getCep());
            novoEndereco.setComplemento(endereco.getComplemento());

            // Associa o endereço ao responsável
            endereco.setResponsavel(responsavel);
            
            // Salva o endereço no banco de dados
            enderecoRepository.save(endereco);

            return ResponseEntity.status(HttpStatus.CREATED).body("Endereço cadastrado com sucesso!");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Responsável não encontrado.");
        }
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao cadastrar o endereço.");
        }
    }
}
