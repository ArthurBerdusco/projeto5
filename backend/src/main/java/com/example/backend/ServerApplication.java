package com.example.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.example.backend.model.Motorista;
import com.example.backend.model.Operador;
import com.example.backend.model.Responsavel;
import com.example.backend.repository.MotoristaRepository;
import com.example.backend.repository.OperadorRepository;
import com.example.backend.repository.ResponsaveisRepository;
import com.example.backend.security.Usuario;
import com.example.backend.security.Usuario.Role;
import com.example.backend.security.UsuarioRepository;


@SpringBootApplication
public class ServerApplication {

	@Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private OperadorRepository operadorRepository;

    @Autowired
    private MotoristaRepository motoristaRepository;

    @Autowired
    private ResponsaveisRepository responsaveisRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;


	public static void main(String[] args) {
		SpringApplication.run(ServerApplication.class, args);
	}

	@EventListener
    public void handleContextRefreshdEvent(ContextRefreshedEvent context) {

        if (usuarioRepository.count() == 0) {

            Usuario u = new Usuario();

            Operador o = new Operador();
            u = new Usuario();
            u.setEmail("bryan@email.com.br");
            u.setSenha(passwordEncoder.encode("1234"));
            u.setRole(Role.OPERADOR);
            o.setUsuario(u);
            usuarioRepository.save(u);
            operadorRepository.save(o);

            Motorista m = new Motorista();
            u = new Usuario();
            u.setEmail("mika@email.com.br");
            u.setSenha(passwordEncoder.encode("1234"));
            u.setRole(Role.MOTORISTA);
            m.setUsuario(u);
            usuarioRepository.save(u);
            motoristaRepository.save(m);

            Responsavel r = new Responsavel();
            u = new Usuario();
            u.setEmail("ryu@email.com.br");
            u.setSenha(passwordEncoder.encode("1234"));
            u.setRole(Role.RESPONSAVEL);
            r.setUsuario(u);
            usuarioRepository.save(u);
            responsaveisRepository.save(r);
        }
    }

}
