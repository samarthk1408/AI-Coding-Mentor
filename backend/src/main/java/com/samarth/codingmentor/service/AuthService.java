package com.samarth.codingmentor.service;

import com.samarth.codingmentor.dto.LoginRequest;
import com.samarth.codingmentor.dto.RegisterRequest;
import com.samarth.codingmentor.entity.User;
import com.samarth.codingmentor.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public String register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            return "Email already registered";
        }

        User user = new User(
                request.getName(),
                request.getEmail(),
                request.getPassword(),
                "USER"
        );

        userRepository.save(user);

        return "Registration successful";
    }

    public String login(LoginRequest request) {

        User user =
                userRepository.findByEmail(
                        request.getEmail()
                ).orElse(null);

        if (user == null) {
            return "User not found";
        }

        if (!user.getPassword().equals(
                request.getPassword())) {

            return "Invalid password";
        }

        return "Login successful";
    }
}