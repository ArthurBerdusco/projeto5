package com.example.backend.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.model.Motorista;
import com.example.backend.model.Van;
import com.example.backend.repository.MotoristaRepository;
import com.example.backend.repository.VanRepository;

@RestController
@RequestMapping("/motorista")
public class MotoristaController {

    @Autowired
    MotoristaRepository motoristaRepository;
    VanRepository

    @Autowired
    VanRepository vanRepository;

    @PostMapping
    public void salvar(@RequestBody Motorista motorista) {
        motorista.setStatus("Pendente ativação");
        motoristaRepository.save(motorista);
    }

    @PostMapping("/cadastro-van")
<<<<<<< HEAD
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
=======
    public ResponseEntity<String> cadastrar(@RequestBody Van van) {
        try {
            Van vanEntity = new Van();
            vanEntity.setPlaca(van.getPlaca());
            vanEntity.setRenavam(van.getRenavam());
            vanEntity.setAnoVeiculo(van.getAnoVeiculo());
            vanEntity.setCnh(van.getCnh());
            vanEntity.setQuantidadeAcentos(van.getQuantidadeAcentos());
            vanEntity.setArCondicionado(van.isArCondicionado());
            vanEntity.setCortina(van.isCortina());
            vanEntity.setTv(van.isTv());
            vanEntity.setCamera(van.isCamera());
            vanEntity.setAcessibilidade(van.isAcessibilidade());
            vanEntity.setMotorista(van.getMotorista());
            vanRepository.save(vanEntity);
            return ResponseEntity.status(HttpStatus.CREATED).body("Cadastro realizado com sucesso!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao cadastrar o usuário.");
        }
    }

>>>>>>> 9c67acc (corrigido bugs na tela de atendimento de escola e adicionado classes commit eliseu)
}
