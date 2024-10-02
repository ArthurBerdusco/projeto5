package com.example.backend.controller.api;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.dto.OfertaDTO;
import com.example.backend.model.Crianca;
import com.example.backend.model.Escola;
import com.example.backend.model.Motorista;
import com.example.backend.model.Oferta;
import com.example.backend.model.Responsavel;
import com.example.backend.repository.CriancaRepository;
import com.example.backend.repository.EscolaRepository;
import com.example.backend.repository.MotoristaRepository;
import com.example.backend.repository.OfertaRepository;
import com.example.backend.repository.ResponsavelRepository;

@RestController
@RequestMapping("/oferta")
public class OfertaController {

    @Autowired
    private OfertaRepository ofertaRepository;

    @Autowired
    private ResponsavelRepository repResponsavelRepository;

    @Autowired
    private MotoristaRepository motoristaRepository;

    @Autowired
    private CriancaRepository criancaRepository;

    @Autowired
    private EscolaRepository escolaRepository;

    @GetMapping("/{id}")
    public ResponseEntity<OfertaDTO> getOfertaPorId(@PathVariable Long id) {
        Optional<Oferta> ofertaOptional = ofertaRepository.findById(id);
        if (ofertaOptional.isPresent()) {
            Oferta oferta = ofertaOptional.get();
            OfertaDTO dto = new OfertaDTO();
            dto.setMotoristaId(oferta.getMotorista().getId());
            dto.setEscolaId(oferta.getEscola().getId());
            dto.setEscolaNome(oferta.getEscola().getNome());
            dto.setCriancaId(oferta.getCrianca().getId());
            dto.setCriancaNome(oferta.getCrianca().getNome());
            dto.setResponsavelId(oferta.getResponsavel().getId());
            dto.setResponsavelNome(oferta.getResponsavel().getNome());
            dto.setMensagem(oferta.getMensagem());
            dto.setMotoristaNome(oferta.getMotorista().getNome());
            dto.setEscolaNome(oferta.getEscola().getNome());

            dto.setValor(oferta.getValor());
            ;
            dto.setId(oferta.getId());
            return ResponseEntity.ok(dto);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }

    @GetMapping("/motorista/{motoristaId}")
    public ResponseEntity<List<OfertaDTO>> getOfertasPorMotorista(@PathVariable Long motoristaId) {
        List<Oferta> ofertas = ofertaRepository.findByMotoristaId(motoristaId);

        // Converte a lista de Ofertas para OfertaDTO
        List<OfertaDTO> ofertasDTO = ofertas.stream().map(oferta -> {
            OfertaDTO dto = new OfertaDTO();
            dto.setMotoristaId(oferta.getMotorista().getId());
            dto.setEscolaId(oferta.getEscola().getId());
            dto.setEscolaNome(oferta.getEscola().getNome());
            dto.setCriancaId(oferta.getCrianca().getId());
            dto.setCriancaNome(oferta.getCrianca().getNome());
            dto.setResponsavelId(oferta.getResponsavel().getId());
            dto.setResponsavelNome(oferta.getResponsavel().getNome());
            dto.setMensagem(oferta.getMensagem());
            dto.setId(oferta.getId());
            return dto;
        }).collect(Collectors.toList());

        return ResponseEntity.ok(ofertasDTO);
    }

    @PostMapping("/enviar")
    public ResponseEntity<Map<String, String>> enviarOferta(@RequestBody OfertaDTO ofertaDTO) {
        try {
            Motorista motorista = motoristaRepository.findById(ofertaDTO.getMotoristaId())
                    .orElseThrow(() -> new RuntimeException("Motorista não encontrado"));

            Escola escola = escolaRepository.findById(ofertaDTO.getEscolaId())
                    .orElseThrow(() -> new RuntimeException("Escola não encontrada"));

            Crianca crianca = criancaRepository.findById(ofertaDTO.getCriancaId())
                    .orElseThrow(() -> new RuntimeException("Criança não encontrada"));

            Responsavel responsavel = repResponsavelRepository.findById(ofertaDTO.getResponsavelId())
                    .orElseThrow(() -> new RuntimeException("Responsável não encontrado"));

            // Criação da nova oferta
            Oferta oferta = new Oferta();
            oferta.setMotorista(motorista);
            oferta.setEscola(escola);
            oferta.setCrianca(crianca);
            oferta.setResponsavel(responsavel);
            oferta.setMensagem(ofertaDTO.getMensagem());
            oferta.setStatus("Pendente");

            // Salvar a oferta no repositório
            ofertaRepository.save(oferta);

            String mensagem = "Oferta recebida: " + ofertaDTO.getMensagem();
            System.out.println("Mensagem para o motorista " + motorista.getNome() + ": " + mensagem);
            System.out.println("ID da escola: " + escola.getId()); // Log do ID da escola
            System.out.println("ID CRIANÇA: " + crianca.getId());
            System.out.println("ID Responsável: " + responsavel.getId());

            Map<String, String> response = new HashMap<>();
            response.put("message", "Mensagem enviada com sucesso para o motorista");

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Erro ao enviar mensagem");

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @GetMapping("/crianca/{criancaId}")
    public ResponseEntity<List<OfertaDTO>> getOfertasPorCrianca(@PathVariable Long criancaId) {
        List<Oferta> ofertas = ofertaRepository.findByCriancaId(criancaId); // Método que você deve implementar no
                                                                            // repositório

        // Converte a lista de Ofertas para OfertaDTO
        List<OfertaDTO> ofertasDTO = ofertas.stream().map(oferta -> {
            OfertaDTO dto = new OfertaDTO();
            dto.setMotoristaId(oferta.getMotorista().getId());
            dto.setEscolaId(oferta.getEscola().getId());
            dto.setEscolaNome(oferta.getEscola().getNome());
            dto.setCriancaId(oferta.getCrianca().getId());
            dto.setCriancaNome(oferta.getCrianca().getNome());
            dto.setResponsavelId(oferta.getResponsavel().getId());
            dto.setResponsavelNome(oferta.getResponsavel().getNome());
            dto.setMensagem(oferta.getMensagem());
            dto.setId(oferta.getId());
            return dto;
        }).collect(Collectors.toList());

        return ResponseEntity.ok(ofertasDTO);
    }

    @PostMapping("/responder/{id}")
    public ResponseEntity<String> responderOferta(@PathVariable Long id, @RequestBody Double valor) {
        if (id == null) {
            return ResponseEntity.badRequest().body("ID não pode ser nulo");
        }

        Optional<Oferta> ofertaOptional = ofertaRepository.findById(id);
        if (ofertaOptional.isPresent()) {
            Oferta oferta = ofertaOptional.get();
            oferta.setValor(valor);
            oferta.setStatus("Valor Enviado");
            ofertaRepository.save(oferta);
            return ResponseEntity.ok("Valor enviado para o responsavel");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Oferta não encontrada");
    }

    @PostMapping("/aceitar/{id}")
    public ResponseEntity<String> aceitarOferta(@PathVariable Long id) {
        Optional<Oferta> ofertaOptional = ofertaRepository.findById(id);
        if (ofertaOptional.isPresent()) {
            Oferta oferta = ofertaOptional.get();
            oferta.setStatus("Aceita");
            ofertaRepository.save(oferta);
            return ResponseEntity.ok("Oferta Aceita");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Oferta não encontrada");
    }

}
