package com.example.backend.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.backend.model.Endereco;
public interface EnderecoRepository extends JpaRepository<Endereco, Long>{
    
}