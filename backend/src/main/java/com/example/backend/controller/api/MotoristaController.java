package com.example.backend.controller.api;

import java.io.IOException;
import java.util.List;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import com.example.backend.dto.CriancaDTO;
import com.example.backend.dto.MotoristaDTO;
import com.example.backend.dto.VanDTO;
import com.example.backend.model.Crianca;
import com.example.backend.model.Imagem;
import com.example.backend.model.Motorista;
import com.example.backend.model.Van;
import com.example.backend.repository.CriancaRepository;
import com.example.backend.repository.ImagemRepository;
import com.example.backend.repository.MotoristaEscolaRepository;
import com.example.backend.repository.MotoristaRepository;
import com.example.backend.repository.VanRepository;
import com.example.backend.security.Usuario;
import com.example.backend.security.UsuarioRepository;

@RestController
@RequestMapping("/motorista")
public class MotoristaController {

    @Autowired
    MotoristaRepository motoristaRepository;

    @Autowired
    UsuarioRepository usuarioRepository;

    @Autowired
    VanRepository vanRepository;

    @Autowired
    ImagemRepository imagemRepository;

    @Autowired
    private MotoristaEscolaRepository motoristaEscolaRepository;

    @Autowired
    private CriancaRepository criancaRepository;

    @PostMapping
    public void salvar(@RequestBody Motorista motorista) {
        motorista.setStatus("Pendente ativação");
        motoristaRepository.save(motorista);
    }

// VanController.java
    @GetMapping("/van/{idMotorista}")
    public ResponseEntity<?> obterVanMotoristaId(@PathVariable Long idMotorista) {
        try {
            // Busca a van pelo id do motorista
            Van van = vanRepository.findByMotoristaId(idMotorista)
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                    "Van não encontrada para o motorista com ID: " + idMotorista));

            // Mapeia os dados de Van para VanDTO
            VanDTO vanDTO = new VanDTO();
            vanDTO.setId(van.getId());
            vanDTO.setPlaca(van.getPlaca());
            vanDTO.setRenavam(van.getRenavam());
            vanDTO.setAnoFabricacao(van.getAnoFabricacao());
            vanDTO.setModelo(van.getModelo());
            vanDTO.setFabricante(van.getFabricante());
            vanDTO.setCor(van.getCor());
            vanDTO.setQuantidadeAssentos(van.getQuantidadeAssentos());
            vanDTO.setAcessibilidade(van.isAcessibilidade());
            vanDTO.setArCondicionado(van.isArCondicionado());
            vanDTO.setCortinas(van.isCortinas());
            vanDTO.setTvEntretenimento(van.isTvEntretenimento());
            vanDTO.setCamerasSeguranca(van.isCamerasSeguranca());
            vanDTO.setCintoSeguranca(van.isCintoSeguranca());
            vanDTO.setExtintorIncendio(van.isExtintorIncendio());
            vanDTO.setCnh(van.getCnh());
            vanDTO.setAntecedentesCriminais(van.isAntecedentesCriminais());

            // Mapear imagens se existirem
            if (van.getImagem() != null) {
                vanDTO.setImagem(van.getImagem().getDados());
            }

            // Retorna o DTO com status OK (200)
            return ResponseEntity.ok(vanDTO);

        } catch (ResponseStatusException e) {
            // Retorna status NOT_FOUND (404) quando a van não for encontrada
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());

        } catch (Exception e) {
            // Erro interno do servidor (500)
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao obter van: " + e.getMessage());
        }
    }

    @PostMapping("/cadastro-van/{idMotorista}")
    public ResponseEntity<?> cadastrar(@PathVariable Long idMotorista, @RequestBody Van van) {
        try {
            Motorista motorista = motoristaRepository.findById(idMotorista)
                    .orElseThrow(() -> new Exception("Motorista não encontrado"));

            if (van.getImagem().getNome().isEmpty()) {
                van.setImagem(null);
            }

            van.setMotorista(motorista);

            vanRepository.save(van);

            Usuario usuario = motorista.getUsuario();
            usuario.setStatus("ATIVADO");
            motorista.setStatus("ATIVADO");

            usuarioRepository.save(usuario);

            return ResponseEntity.status(HttpStatus.CREATED).body("Cadastro realizado com sucesso!");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao cadastrar a van: " + e.getMessage());
        }
    }

    @PostMapping("/van/atualizar/{idMotorista}")
    public ResponseEntity<?> attVan(@PathVariable Long idMotorista, @RequestBody VanDTO vanAtualizada) {
        try {
            // Verifica se a van com o ID fornecido existe
            Van vanExistente = vanRepository.findByMotoristaId(idMotorista)
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Van não encontrada com ID: " + idMotorista));

            // Atualiza os campos da van existente com os dados do DTO
            vanExistente.setPlaca(vanAtualizada.getPlaca());
            vanExistente.setRenavam(vanAtualizada.getRenavam());
            vanExistente.setAnoFabricacao(vanAtualizada.getAnoFabricacao());
            vanExistente.setModelo(vanAtualizada.getModelo());
            vanExistente.setFabricante(vanAtualizada.getFabricante());
            vanExistente.setCor(vanAtualizada.getCor());
            vanExistente.setQuantidadeAssentos(vanAtualizada.getQuantidadeAssentos());
            vanExistente.setAcessibilidade(vanAtualizada.isAcessibilidade());
            vanExistente.setArCondicionado(vanAtualizada.isArCondicionado());
            vanExistente.setCortinas(vanAtualizada.isCortinas());
            vanExistente.setTvEntretenimento(vanAtualizada.isTvEntretenimento());
            vanExistente.setCamerasSeguranca(vanAtualizada.isCamerasSeguranca());
            vanExistente.setCintoSeguranca(vanAtualizada.isCintoSeguranca());
            vanExistente.setExtintorIncendio(vanAtualizada.isExtintorIncendio());
            vanExistente.setCnh(vanAtualizada.getCnh());
            vanExistente.setAntecedentesCriminais(vanAtualizada.isAntecedentesCriminais());

            // Salva a van atualizada no banco de dados
            vanRepository.save(vanExistente);

            // Retorna uma resposta de sucesso
            return ResponseEntity.ok().body("Van atualizada com sucesso");
        } catch (Exception e) {
            // Trata outros erros
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao atualizar a van");
        }
    }

    // MotoristaController.java
    @GetMapping("{id}")
    public ResponseEntity<?> getMotoristaById(@PathVariable Long id) {
        try {
            Optional<Motorista> motoristaOptional = motoristaRepository.findById(id);
            if (motoristaOptional.isPresent()) {
                Motorista motorista = motoristaOptional.get();

                // Cria um DTO a partir dos dados do motorista
                MotoristaDTO motoristaDTO = new MotoristaDTO();
                motoristaDTO.setId(motorista.getId());
                motoristaDTO.setNome(motorista.getNome());
                motoristaDTO.setEmail(motorista.getEmail());
                motoristaDTO.setTelefone(motorista.getTelefone());
                motoristaDTO.setExperiencia(motorista.getExperiencia());
                motoristaDTO.setImagem(motorista.getImagem().getDados());
                motoristaDTO.setSobreMim(motorista.getSobreMim());
                motoristaDTO.setCpf(motorista.getCpf());
                motoristaDTO.setEndereco(motorista.getEndereco());

                return ResponseEntity.ok(motoristaDTO);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Motorista não encontrado.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro interno do servidor.");
        }
    }

    @PostMapping("/atualizar/{id}")
    public ResponseEntity<Motorista> atualizarmotorista(@PathVariable Long id,
            @RequestBody Motorista motoristaAtualizado) {
        Optional<Motorista> motoristaExistente = motoristaRepository.findById(id);

        if (motoristaExistente.isPresent()) {
            Motorista motorista = motoristaExistente.get();

            // Atualizar os campos do responsável
            motorista.setNome(motoristaAtualizado.getNome());
            motorista.setEmail(motoristaAtualizado.getEmail());
            motorista.setCpf(motoristaAtualizado.getCpf());
            motorista.setTelefone(motoristaAtualizado.getTelefone());
            motorista.setEndereco(motoristaAtualizado.getEndereco());
            motorista.setSobreMim(motoristaAtualizado.getSobreMim());
            motorista.setExperiencia(motoristaAtualizado.getExperiencia());

            Motorista motoristaSalvo = motoristaRepository.save(motorista);
            return ResponseEntity.ok(motoristaSalvo);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PostMapping("/{id}/upload")
    public ResponseEntity<String> uploadImagem(@RequestParam("file") MultipartFile file, @PathVariable Long id) {
        try {
            // Busca o motorista pelo ID
            Optional<Motorista> motoristaOptional = motoristaRepository.findById(id);
            if (motoristaOptional.isPresent()) {
                Motorista motorista = motoristaOptional.get();
                // Verifica se já existe uma imagem com o mesmo nome
                Optional<Imagem> imagemExistente = imagemRepository.findByNome(file.getOriginalFilename());
                if (imagemExistente.isPresent()) {
                    // Atualiza os dados da imagem existente
                    Imagem imagem = imagemExistente.get();
                    imagem.setDados(file.getBytes()); // Atualiza os dados da imagem
                    motorista.setImagem(imagem);
                    imagemRepository.save(imagem); // Salva a imagem atualizada
                    return ResponseEntity.ok("Imagem atualizada com sucesso! ID da imagem: " + imagem.getId());
                } else {
                    // Cria uma nova imagem, caso não exista
                    Imagem imagem = new Imagem();
                    imagem.setNome(file.getOriginalFilename());
                    imagem.setDados(file.getBytes()); // Converte para array de bytes
                    // Associa a nova imagem ao motorista
                    motorista.setImagem(imagem);
                    // Salva o motorista com a nova imagem associada (a imagem será salva
                    // automaticamente)
                    motoristaRepository.save(motorista);
                    return ResponseEntity
                            .ok("Imagem enviada e associada ao motorista com sucesso! ID da imagem: " + imagem.getId());
                }
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Motorista não encontrado.");
            }
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao salvar a imagem.");
        }
    }

    @GetMapping("/{idMotorista}/criancas")
    public ResponseEntity<?> obterCriancasPorMotorista(@PathVariable Long idMotorista) {
        try {
            List<Crianca> criancas = criancaRepository.findByMotoristaId(idMotorista);

            // Converte a lista de Crianca para CriancaDTO com apenas id e nome
            List<CriancaDTO> criancasDTO = criancas.stream()
                    .map(crianca -> {
                        CriancaDTO dto = new CriancaDTO();
                        dto.setId(crianca.getId());
                        dto.setNome(crianca.getNome());
                        return dto;
                    })
                    .collect(Collectors.toList());

            return ResponseEntity.ok(criancasDTO);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao buscar crianças: " + e.getMessage());
        }
    }

}
