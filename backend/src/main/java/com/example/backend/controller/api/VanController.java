package com.example.backend.controller.api;

import java.io.IOException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.backend.model.Imagem;
import com.example.backend.model.Van;
import com.example.backend.repository.ImagemRepository;
import com.example.backend.repository.VanRepository;

@RestController
@RequestMapping("/van")
public class VanController {

    @Autowired
    private VanRepository vanRepository;

    @Autowired
    private ImagemRepository imagemRepository;

    @PostMapping("/{id}/upload")
    public ResponseEntity<String> uploadImagem(@RequestParam("file") MultipartFile file, @PathVariable Long id) {
        try {
            // Busca o motorista pelo ID
            Optional<Van> vanOptional = vanRepository.findByMotoristaId(id);

            if (vanOptional.isPresent()) {
                Van van = vanOptional.get();

                // Verifica se já existe uma imagem com o mesmo nome
                Optional<Imagem> imagemExistente = imagemRepository.findByNome(file.getOriginalFilename());

                if (imagemExistente.isPresent()) {
                    // Atualiza os dados da imagem existente
                    Imagem imagem = imagemExistente.get();
                    imagem.setDados(file.getBytes()); // Atualiza os dados da imagem

                    van.setImagem(imagem);

                    imagemRepository.save(imagem); // Salva a imagem atualizada

                    return ResponseEntity.ok("Imagem atualizada com sucesso! ID da imagem: " + imagem.getId());
                } else {
                    // Cria uma nova imagem, caso não exista
                    Imagem imagem = new Imagem();
                    imagem.setNome(file.getOriginalFilename());
                    imagem.setDados(file.getBytes()); // Converte para array de bytes

                    // Associa a nova imagem ao motorista
                    van.setImagem(imagem);

                    // Salva o motorista com a nova imagem associada (a imagem será salva automaticamente)
                    vanRepository.save(van);

                    return ResponseEntity.ok("Imagem enviada e associada ao motorista com sucesso! ID da imagem: " + imagem.getId());
                }
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Motorista não encontrado.");
            }
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao salvar a imagem.");
        }
    }
}
