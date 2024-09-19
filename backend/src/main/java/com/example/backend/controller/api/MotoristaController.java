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
    VanRepository

    @PostMapping
    public void salvar(@RequestBody Motorista motorista) {
        motorista.setStatus("Pendente ativação");
        motoristaRepository.save(motorista);
    }

    @PostMapping("/cadastro-van")
public ResponseEntity<String> cadastrar(@RequestBody Motorista motorista) {
    try {
        Van van = new Van();
        van.setPlaca(motorista.getPlaca());
        van.setRenavam(motorista.getRenavam());
        van.setAnoVeiculo(motorista.getAnoVeiculo());
        van.setCnh(motorista.getCnh());
        van.setQuantidadeAcentos(motorista.getQuantidadeAcentos());
        van.setArCondicionado(motorista.isArCondicionado());
        van.setCortina(motorista.isCortina());
        van.setTv(motorista.isTv());
        van.setCamera(motorista.isCamera());
        van.setAcessibilidade(motorista.isAcessibilidade());
        van.setMotorista(motorista);

        vanRepository.save(van);

        return ResponseEntity.status(HttpStatus.CREATED).body("Cadastro realizado com sucesso!");
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao cadastrar o usuário.");
        }
    }
}
