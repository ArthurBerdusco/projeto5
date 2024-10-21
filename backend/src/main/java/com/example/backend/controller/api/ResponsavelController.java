package com.example.backend.controller.api;

import java.io.IOException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.backend.model.Endereco;
import com.example.backend.model.Imagem;
import com.example.backend.model.Responsavel;
import com.example.backend.repository.EnderecoRepository;
import com.example.backend.repository.ImagemRepository;
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

    @Autowired
    ImagemRepository imagemRepository;

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

            Usuario usuario = responsavel.getUsuario();
            usuario.setStatus("ATIVADO");
            usuarioRepository.save(usuario);

            enderecoRepository.save(endereco);

            return ResponseEntity.status(HttpStatus.CREATED).body("Cadastro de endereço realizado com sucesso!");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao cadastrar o endereço: " + e.getMessage());
        }
    }

    @GetMapping("{id}")
    public ResponseEntity<?> getResponsavelById(@PathVariable Long id) {
        try {
            Optional<Responsavel> responsavel = responsavelRepository.findById(id);
            if (responsavel.isPresent()) {
                return ResponseEntity.ok(responsavel.get());
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Responsável não encontrado.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro interno do servidor.");
        }
    }

    @PostMapping("/atualizar/{id}")
    public ResponseEntity<Responsavel> atualizarResponsavel(@PathVariable Long id, @RequestBody Responsavel responsavelAtualizado) {
        Optional<Responsavel> responsavelExistente = responsavelRepository.findById(id);

        if (responsavelExistente.isPresent()) {
            Responsavel responsavel = responsavelExistente.get();
            
            responsavel.setNome(responsavelAtualizado.getNome());
            responsavel.setEmail(responsavelAtualizado.getEmail());
            responsavel.setCpf(responsavelAtualizado.getCpf());
            responsavel.setTelefone(responsavelAtualizado.getTelefone());
            responsavel.setEndereco(responsavelAtualizado.getEndereco());

            Responsavel responsavelSalvo = responsavelRepository.save(responsavel);
            return ResponseEntity.ok(responsavelSalvo);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PostMapping("/{id}/upload")
    public ResponseEntity<String> uploadImagem(@RequestParam("file") MultipartFile file, @PathVariable Long id) {
        try {
            // Busca o responsavel pelo ID
            Optional<Responsavel> responsavelOptional = responsavelRepository.findById(id);

            if (responsavelOptional.isPresent()) {
                Responsavel responsavel = responsavelOptional.get();

                // Verifica se já existe uma imagem com o mesmo nome
                Optional<Imagem> imagemExistente = imagemRepository.findByNome(file.getOriginalFilename());

                if (imagemExistente.isPresent()) {
                    // Atualiza os dados da imagem existente
                    Imagem imagem = imagemExistente.get();
                    imagem.setDados(file.getBytes()); // Atualiza os dados da imagem

                    responsavel.setImagem(imagem);

                    imagemRepository.save(imagem); // Salva a imagem atualizada

                    return ResponseEntity.ok("Imagem atualizada com sucesso! ID da imagem: " + imagem.getId());
                } else {
                    // Cria uma nova imagem, caso não exista
                    Imagem imagem = new Imagem();
                    imagem.setNome(file.getOriginalFilename());
                    imagem.setDados(file.getBytes()); // Converte para array de bytes

                    // Associa a nova imagem ao responsavel
                    responsavel.setImagem(imagem);

                    // Salva o responsavel com a nova imagem associada (a imagem será salva automaticamente)
                    responsavelRepository.save(responsavel);

                    return ResponseEntity.ok("Imagem enviada e associada ao responsavel com sucesso! ID da imagem: " + imagem.getId());
                }
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("responsavel não encontrado.");
            }
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao salvar a imagem.");
        }
    }

}
