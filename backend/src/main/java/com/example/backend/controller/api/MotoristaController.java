package com.example.backend.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.model.Motorista;
import com.example.backend.repository.MotoristaRepository;

@RestController
@RequestMapping("/motorista")
public class MotoristaController {
    
    @Autowired
    MotoristaRepository motoristaRepository;

    @PostMapping
    public void salvar(@RequestBody Motorista motorista){
        motorista.setStatus("Pendente ativação");
        motoristaRepository.save(motorista);
    }

}
