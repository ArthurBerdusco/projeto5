package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/motorista")
public class MotoristaController {
    
    @Autowired
    MotoristaRepository motoristaRepository;

    @PostMapping
    public void salvar(@RequestBody Motorista motorista){
        System.out.println("\n\n\n FUNCIONOU \n\n\n");
        motoristaRepository.save(motorista);
    }

}
