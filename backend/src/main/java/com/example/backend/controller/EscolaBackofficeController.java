package com.example.backend.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.example.backend.model.Escola;
import com.example.backend.model.Imagem;
import com.example.backend.repository.EscolaRepository;

@Controller
@RequestMapping("/escolas")
public class EscolaBackofficeController {

    @Autowired
    private EscolaRepository escolaRepository;

    @GetMapping
    public String escolassPage(Model model) {
        model.addAttribute("escolas", escolaRepository.findAll());
        return "listaEscolas.html";
    }

    @GetMapping("{id}")
    public String escolaPage(@PathVariable Long id, Model model) {
        model.addAttribute("escola", escolaRepository.findById(id));
        return "motorista.html";
    }

    @PostMapping("{id}/upload")
    public String uploadImage(@PathVariable Long id, @RequestParam("imagem") MultipartFile imagemFile) {
        Escola escola = escolaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Escola não encontrada"));
    
        if (!imagemFile.isEmpty()) {
            try {
                // Verifica se já existe uma imagem associada à escola
                Imagem imagemExistente = escola.getImagem();
                Imagem novaImagem = new Imagem();
                String novoNomeImagem = "escola-" + id; // Formato do novo nome
    
                novaImagem.setNome(novoNomeImagem);
                novaImagem.setDados(imagemFile.getBytes());
    
                // Se já houver uma imagem existente, substitui os dados
                if (imagemExistente != null) {
                    imagemExistente.setNome(novoNomeImagem);
                    imagemExistente.setDados(novaImagem.getDados());
                    // Não é necessário criar uma nova imagem, apenas atualizar
                } else {
                    // Se não houver imagem, associa a nova
                    escola.setImagem(novaImagem);
                }
    
                // Salva a escola (e a imagem associada)
                escolaRepository.save(escola);
            } catch (IOException e) {
                e.printStackTrace(); // Trate a exceção conforme necessário
            }
        }
        return "redirect:/escolas";
    }
    

}
