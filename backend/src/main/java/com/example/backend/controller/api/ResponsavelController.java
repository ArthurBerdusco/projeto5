package com.example.backend.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.model.Endereco;
import com.example.backend.model.Responsavel;
import com.example.backend.repository.EnderecoRepository;
import com.example.backend.repository.ResponsavelRepository;
import com.example.backend.security.Usuario;
import com.example.backend.security.UsuarioRepository;

@RestController
@RequestMapping("/responsavel")
public class ResponsavelController {

    @Autowired
    ResponsavelRepository responsavelRepository;

    @Autowired
    EnderecoRepository enderecoRepository;

    @Autowired
    UsuarioRepository usuarioRepository;

    @PostMapping
    public void salvar(@RequestBody Responsavel responsavel) {
        responsavel.setStatus("Pendente ativação");
        responsavelRepository.save(responsavel);
    }

    @PostMapping("/cadastro-endereco/{idUsuario}")
    public ResponseEntity<?> cadastrarEndereco(@PathVariable Long idUsuario, @RequestBody Endereco endereco) {
        try {
            Responsavel responsavel = responsavelRepository.findByUsuarioId(idUsuario)
                    .orElseThrow(() -> new Exception("Responsável não encontrado"));

            Endereco novoEndereco = new Endereco();
            novoEndereco.setRua(endereco.getRua());
            novoEndereco.setNumero(endereco.getNumero());
            novoEndereco.setBairro(endereco.getBairro());
            novoEndereco.setCidade(endereco.getCidade());
            novoEndereco.setEstado(endereco.getEstado());
            novoEndereco.setCep(endereco.getCep());
            novoEndereco.setComplemento(endereco.getComplemento());
            novoEndereco.setResponsavel(responsavel);

            Usuario usuario = responsavel.getUsuario();
            usuario.setStatus("ATIVADO");
            usuarioRepository.save(usuario);

            endereco.setResponsavel(responsavel);

            enderecoRepository.save(endereco);

            return ResponseEntity.status(HttpStatus.CREATED).body("Cadastro de endereço realizado com sucesso!");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao cadastrar o endereço: " + e.getMessage());
        }
    }

}
