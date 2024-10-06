package com.example.backend.security;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService implements UserDetailsService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<Usuario> user = usuarioRepository.findByEmailIgnoreCase(email);
        if (user.isPresent()) {
            var usuario = user.get();
            System.out.println("Senha encriptada do banco: " + usuario.getSenha());

            return User.builder()
                    .username(usuario.getEmail())
                    .password(usuario.getSenha())
                    .authorities(usuario.getRole().name())
                    .build();
        } else {
            throw new UsernameNotFoundException(email);
        }
    }
}
