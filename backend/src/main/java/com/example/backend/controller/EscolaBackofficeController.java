package com.example.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

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

   
    

}
