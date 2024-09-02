package com.example.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.backend.model.Motorista;
import com.example.backend.repository.MotoristaRepository;

@Controller
@RequestMapping("/motoristas")
public class MotoristasBackofficeController {

    @Autowired
    private MotoristaRepository motoristaRepository;

    @GetMapping()
    public String motoristasPage(Model model) {
        model.addAttribute("motoristas", motoristaRepository.findAll());
        return "listaMotoristas.html";
    }

    @GetMapping("{id}")
    public String motoristaPage(@PathVariable Long id, Model model, Motorista motorista) {
        model.addAttribute("motorista", motoristaRepository.findById(id));
        return "motorista.html";
    }

    @PutMapping("{id}")
    public String atualizarMotorista(@PathVariable Long id, @ModelAttribute Motorista motorista) {
        motoristaRepository.save(motorista);
        return "redirect:/responsaveis";
    }

}
