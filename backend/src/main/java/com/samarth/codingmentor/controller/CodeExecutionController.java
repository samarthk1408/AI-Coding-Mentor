package com.samarth.codingmentor.controller;

import com.samarth.codingmentor.dto.RunCodeRequest;
import com.samarth.codingmentor.service.CodeExecutionService;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/code")
public class CodeExecutionController {

    private final CodeExecutionService codeExecutionService;

    public CodeExecutionController(
            CodeExecutionService codeExecutionService) {

        this.codeExecutionService =
                codeExecutionService;
    }

    @PostMapping("/run")
    public String runCode(
            @RequestBody RunCodeRequest request) {

        return codeExecutionService.runCode(
                request.getLanguage(),
                request.getCode()
        );
    }
}