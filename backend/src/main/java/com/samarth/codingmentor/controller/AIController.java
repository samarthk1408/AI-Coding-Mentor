package com.samarth.codingmentor.controller;

import com.samarth.codingmentor.dto.AIRequest;
import com.samarth.codingmentor.dto.AIResponse;
import com.samarth.codingmentor.dto.CodeReviewRequest;
import com.samarth.codingmentor.dto.InterviewRequest;
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

    @PostMapping("/visualize")
    public AIResponse visualizeProblem(
            @RequestBody AIRequest request) {

        String visualization =
                aiService.visualizeProblem(
                        request.getProblem());

        return new AIResponse(
                visualization
        );
    }

    @PostMapping("/interview/question")
    public AIResponse interviewQuestion(
            @RequestBody AIRequest request) {

        String question =
                aiService.generateInterviewQuestion(
                        request.getProblem());

        return new AIResponse(question);
    }

    @PostMapping("/interview/evaluate")
    public AIResponse evaluateInterview(
            @RequestBody InterviewRequest request) {

        String feedback =
                aiService.evaluateInterviewAnswer(
                        request.getQuestion(),
                        request.getAnswer());

        return new AIResponse(feedback);
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
                        request.getCode());

        return new AIResponse(
                correctedCode
        );
    }
    @PostMapping("/run")
    public AIResponse runCode(
            @RequestBody CodeReviewRequest request) {

        String output =
                aiService.predictOutput(
                        request.getLanguage(),
                        request.getCode()
                );

        return new AIResponse(output);
    }
}