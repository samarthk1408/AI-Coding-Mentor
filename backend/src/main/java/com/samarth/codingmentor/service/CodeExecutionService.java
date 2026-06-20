package com.samarth.codingmentor.service;

import org.springframework.stereotype.Service;

@Service
public class CodeExecutionService {

    public String runCode(
            String language,
            String code) {

        return """
                Output:

                Hello World

                (Judge0 integration pending)
                """;
    }
}