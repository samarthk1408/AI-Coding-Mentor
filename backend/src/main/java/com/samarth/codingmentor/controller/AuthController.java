package com.samarth.codingmentor.controller;

import com.samarth.codingmentor.dto.LoginRequest;
import com.samarth.codingmentor.dto.RegisterRequest;
import com.samarth.codingmentor.service.AuthService;
import org.springframework.web.bind.annotation.*;
@CrossOrigin(origins = {
        "http://localhost:5173",
        "https://ai-coding-mentor-phi.vercel.app"
})
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(
            AuthService authService) {

        this.authService = authService;
    }

    @PostMapping("/register")
    public String register(
            @RequestBody RegisterRequest request) {

        return authService.register(request);
    }

    @PostMapping("/login")
    public String login(
            @RequestBody LoginRequest request) {

        return authService.login(request);
    }
}