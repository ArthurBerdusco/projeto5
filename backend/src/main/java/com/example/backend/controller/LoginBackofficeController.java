package com.example.backend.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import com.example.backend.security.Usuario;

@Controller
public class LoginBackofficeController {
    
    @GetMapping("/")
    public String loginPage(Usuario usuario){
        return "login.html";
    }    

}
