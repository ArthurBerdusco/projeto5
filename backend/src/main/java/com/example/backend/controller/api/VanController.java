package com.example.backend.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.repository.VanRepository;

@RestController
@RequestMapping("/van")
public class VanController {

    @Autowired
    private VanRepository vanRepository;

   

    
}
