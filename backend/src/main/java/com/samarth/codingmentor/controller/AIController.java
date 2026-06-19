package com.samarth.codingmentor.controller;

import com.samarth.codingmentor.dto.AIRequest;
import com.samarth.codingmentor.dto.AIResponse;
import com.samarth.codingmentor.dto.CodeReviewRequest;
import com.samarth.codingmentor.service.AIService;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/ai")
public class AIController {

    private final AIService aiService;

    public AIController(AIService aiService) {
        this.aiService = aiService;
    }

    @PostMapping("/guidance")
    public AIResponse getGuidance(
            @RequestBody AIRequest request) {

        String guidance =
                aiService.generateGuidance(
                        request.getProblem());

        return new AIResponse(guidance);
    }

    @PostMapping("/review")

    public AIResponse reviewCode(
            @RequestBody CodeReviewRequest request) {

        String review =
                aiService.reviewCode(
                        request.getLanguage(),
                        request.getCode());

        return new AIResponse(review);
    }
    @PostMapping("/correct")
    public AIResponse correctCode(
            @RequestBody CodeReviewRequest request) {

        String correctedCode =
                aiService.generateCorrectCode(
                        request.getLanguage(),
                        request.getCode()
                );

        return new AIResponse(
                correctedCode
        );
    }
}