package com.example.backend.controller.api;

import java.math.BigDecimal;
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

            // Mapeia todos os dados de Oferta para o DTO
            OfertaDTO ofertaDTO = new OfertaDTO();
            ofertaDTO.setId(oferta.getId());
            ofertaDTO.setIdMotorista(oferta.getMotorista().getId());
            ofertaDTO.setNomeMotorista(oferta.getMotorista().getNome());
            ofertaDTO.setIdEscola(oferta.getEscola().getId());
            ofertaDTO.setNomeEscola(oferta.getEscola().getNome());
            ofertaDTO.setIdCrianca(oferta.getCrianca().getId());
            ofertaDTO.setNomeCrianca(oferta.getCrianca().getNome());
            ofertaDTO.setIdResponsavel(oferta.getResponsavel().getId());
            ofertaDTO.setNomeResponsavel(oferta.getResponsavel().getNome());
            ofertaDTO.setMensagem(oferta.getMensagem());
            ofertaDTO.setStatus(oferta.getStatus());
            ofertaDTO.setValor(oferta.getValor());
            ofertaDTO.setDataPedido(oferta.getDataPedido());
            ofertaDTO.setImagemVan(oferta.getMotorista().getVan().getImagem().getDados());
            ofertaDTO.setImagemMotorista(oferta.getMotorista().getImagem().getDados());
            ofertaDTO.setSobreMimMotorista(oferta.getMotorista().getSobreMim());
            ofertaDTO.setExperienciaMotorista(oferta.getMotorista().getExperiencia());
            

            return ResponseEntity.ok(ofertaDTO);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }

    @GetMapping("/motorista/{motoristaId}")
    public ResponseEntity<List<OfertaDTO>> getOfertasPorMotorista(@PathVariable Long motoristaId) {
        List<Oferta> ofertas = ofertaRepository.findByMotoristaIdOrderByIdDesc(motoristaId);

        // Converte a lista de Ofertas para OfertaDTO
        List<OfertaDTO> ofertasDTO = ofertas.stream().map(oferta -> {

            OfertaDTO dto = new OfertaDTO();
            dto.setIdMotorista(oferta.getMotorista().getId());
            dto.setIdEscola(oferta.getEscola().getId());
            dto.setNomeEscola(oferta.getEscola().getNome());
            dto.setIdCrianca(oferta.getCrianca().getId());
            dto.setNomeCrianca(oferta.getCrianca().getNome());
            dto.setIdResponsavel(oferta.getResponsavel().getId());
            dto.setNomeResponsavel(oferta.getResponsavel().getNome());
            dto.setStatus(oferta.getStatus());
            dto.setEndereco(oferta.getResponsavel().getEndereco().getRua() + ", " + oferta.getResponsavel().getEndereco().getNumero());
            dto.setMensagem(oferta.getMensagem());
            dto.setDataPedido(oferta.getDataPedido());
            dto.setId(oferta.getId());
            dto.setSobreMimMotorista(oferta.getMotorista().getSobreMim());
            dto.setExperienciaMotorista(oferta.getMotorista().getExperiencia());
            
            if (oferta.getMotorista().getVan() != null && oferta.getMotorista().getVan().getImagem() != null) {
                dto.setImagemVan(oferta.getMotorista().getVan().getImagem().getDados());
            } else {
                dto.setImagemVan(null);
            }
            return dto;
        }).collect(Collectors.toList());

        return ResponseEntity.ok(ofertasDTO);
    }

    @PostMapping("/enviar")
    public ResponseEntity<Map<String, String>> enviarOferta(@RequestBody OfertaDTO ofertaDTO) {
        try {
            System.out.println("\n\n\n" + ofertaDTO + "\n\n\n");
            Motorista motorista = motoristaRepository.findById(ofertaDTO.getIdMotorista())
                    .orElseThrow(() -> new RuntimeException("Motorista não encontrado"));

            Escola escola = escolaRepository.findById(ofertaDTO.getIdEscola())
                    .orElseThrow(() -> new RuntimeException("Escola não encontrada"));

            Crianca crianca = criancaRepository.findById(ofertaDTO.getIdCrianca())
                    .orElseThrow(() -> new RuntimeException("Criança não encontrada"));

            Responsavel responsavel = repResponsavelRepository.findById(ofertaDTO.getIdResponsavel())
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

            Map<String, String> response = new HashMap<>();
            response.put("message", "Mensagem enviada com sucesso para o motorista");

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Erro ao enviar mensagem");
            e.printStackTrace();

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @GetMapping("/crianca/{criancaId}")
    public ResponseEntity<List<OfertaDTO>> getOfertasPorCrianca(@PathVariable Long criancaId) {
        try {
            // Verifica se a criança existe
            if (!criancaRepository.existsById(criancaId)) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }

            // Busca as ofertas associadas à criança
            List<Oferta> ofertas = ofertaRepository.findByCriancaId(criancaId);

            // Verifica se há ofertas disponíveis
            if (ofertas.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
            }

            // Mapeia as ofertas para a lista personalizada de OfertaDTO com apenas os campos necessários
            List<OfertaDTO> ofertasDTO = ofertas.stream()
                    .map(oferta -> {
                        OfertaDTO dto = new OfertaDTO();
                        dto.setId(oferta.getId());
                        dto.setNomeMotorista(oferta.getMotorista().getNome());
                        dto.setNomeEscola(oferta.getEscola().getNome());
                        dto.setMensagem(oferta.getMensagem());
                        dto.setStatus(oferta.getStatus());
                        dto.setValor(oferta.getValor()); // Adiciona o valor, caso este campo exista em Oferta
                        dto.setDataPedido(oferta.getDataPedido()); // Adiciona a data do pedido, caso este campo exista em Oferta

                        // Configura a imagem do motorista se existir
                        if (oferta.getMotorista().getImagem() != null) {
                            dto.setImagemMotorista(oferta.getMotorista().getImagem().getDados());
                        } else {
                            dto.setImagemMotorista(null);
                        }

                        return dto;
                    })
                    .collect(Collectors.toList());

            // Retorna 200 OK com a lista de ofertas personalizadas
            return ResponseEntity.ok(ofertasDTO);
        } catch (Exception e) {
            // Loga a exceção (opcional)
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null); // Retorna 400 em caso de erro inesperado
        }
    }

    @PostMapping("/responder/{id}")
    public ResponseEntity<String> responderOferta(@PathVariable Long id, @RequestBody BigDecimal valor) {
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

            // Atualiza a criança com o ID do motorista e da escola da oferta aceita
            Crianca crianca = oferta.getCrianca();
            crianca.setMotorista(oferta.getMotorista()); // Vincula o motorista à criança
            crianca.setEscola(oferta.getEscola()); // Vincula a escola à criança
            crianca.setStatus("ATIVO");
            criancaRepository.save(crianca); // Salva as alterações na tabela de criança

            // Atualiza o status da oferta
            oferta.setStatus("Aceita");
            ofertaRepository.save(oferta);

            return ResponseEntity.ok("Oferta Aceita e criança atualizada com motorista e escola");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Oferta não encontrada");
    }

}
