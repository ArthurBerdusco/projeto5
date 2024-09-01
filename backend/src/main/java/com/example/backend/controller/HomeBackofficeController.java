package com.example.backend.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeBackofficeController {
    
    @GetMapping("/home")
    public String homePage(){
        return "home.html";
    }

}
