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
    public void salvar(@RequestBody Responsavel responsavel){
        responsavel.setStatus("Pendente ativação");
        responsaveisRepository.save(responsavel);
    }

    

}
