package com.samarth.codingmentor.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@Service
public class AIService {

    @Value("${gemini.api.key}")
    private String apiKey;

    private String askGemini(String prompt) {

        String[] models = {
                "gemini-2.5-flash",
                "gemini-2.0-flash"
        };

        for (String model : models) {

            for (int attempt = 1; attempt <= 2; attempt++) {

                try {

                    String url =
                            "https://generativelanguage.googleapis.com/v1beta/models/"
                                    + model
                                    + ":generateContent?key="
                                    + apiKey;

                    RestTemplate restTemplate =
                            new RestTemplate();

                    Map<String, Object> requestBody =
                            Map.of(
                                    "contents",
                                    List.of(
                                            Map.of(
                                                    "parts",
                                                    List.of(
                                                            Map.of(
                                                                    "text",
                                                                    prompt
                                                            )
                                                    )
                                            )
                                    )
                            );

                    HttpHeaders headers =
                            new HttpHeaders();

                    headers.setContentType(
                            MediaType.APPLICATION_JSON
                    );

                    HttpEntity<Map<String, Object>> request =
                            new HttpEntity<>(
                                    requestBody,
                                    headers
                            );

                    ResponseEntity<String> response =
                            restTemplate.exchange(
                                    url,
                                    HttpMethod.POST,
                                    request,
                                    String.class
                            );

                    ObjectMapper mapper =
                            new ObjectMapper();

                    JsonNode root =
                            mapper.readTree(
                                    response.getBody()
                            );

                    return root
                            .path("candidates")
                            .get(0)
                            .path("content")
                            .path("parts")
                            .get(0)
                            .path("text")
                            .asText();

                } catch (Exception ignored) {

                }
            }
        }

        return "AI Service Unavailable";
    }

    public String generateGuidance(String problem) {

        String[] models = {
                "gemini-2.5-flash",
                "gemini-2.0-flash"
        };

        for (String model : models) {

            for (int attempt = 1; attempt <= 2; attempt++) {

                try {

                    System.out.println(
                            "Trying model: "
                                    + model
                                    + " Attempt: "
                                    + attempt
                    );

                    String url =
                            "https://generativelanguage.googleapis.com/v1beta/models/"
                                    + model
                                    + ":generateContent?key="
                                    + apiKey;

                    RestTemplate restTemplate =
                            new RestTemplate();

                    String prompt = """
                            You are a friendly coding mentor.

                            Analyze this coding problem:

                            %s

                            Give the answer in this format:

                            🎯 Approach
                            • point
                            • point

                            💡 Hint
                            • point
                            • point

                            📈 Complexity
                            • Time: O(...)
                            • Space: O(...)

                            Keep the explanation short and beginner friendly.
                            Avoid long paragraphs.
                            """
                            .formatted(problem);

                    Map<String, Object> requestBody =
                            Map.of(
                                    "contents",
                                    List.of(
                                            Map.of(
                                                    "parts",
                                                    List.of(
                                                            Map.of(
                                                                    "text",
                                                                    prompt
                                                            )
                                                    )
                                            )
                                    )
                            );

                    HttpHeaders headers =
                            new HttpHeaders();

                    headers.setContentType(
                            MediaType.APPLICATION_JSON
                    );

                    HttpEntity<Map<String, Object>> request =
                            new HttpEntity<>(
                                    requestBody,
                                    headers
                            );

                    ResponseEntity<String> response =
                            restTemplate.exchange(
                                    url,
                                    HttpMethod.POST,
                                    request,
                                    String.class
                            );

                    ObjectMapper mapper =
                            new ObjectMapper();

                    JsonNode root =
                            mapper.readTree(
                                    response.getBody()
                            );

                    return root
                            .path("candidates")
                            .get(0)
                            .path("content")
                            .path("parts")
                            .get(0)
                            .path("text")
                            .asText();

                } catch (Exception e) {

                    System.out.println(
                            "Failed Model: "
                                    + model
                    );

                    System.out.println(
                            e.getMessage()
                    );

                    try {
                        Thread.sleep(2000);
                    }
                    catch (InterruptedException ignored) {

                    }
                }
            }
        }

        return """
                🤖 AI Service Busy

                Please try again after a few seconds.
                """;
    }

    public String reviewCode(
            String language,
            String code) {

        String prompt = """
You are a coding mentor.

Review the following %s code.

Respond ONLY in this format:

✅ What's Good
- point 1
- point 2

⚠️ Can Be Improved
- point 1
- point 2

📈 Complexity
- Time: O(...)
- Space: O(...)

Keep answers short.
Maximum 2 points per section.
No long explanations.

Code:

%s
"""
                .formatted(language, code);

        return askGemini(prompt);
    }
    public String generateCorrectCode(
            String language,
            String code) {

        String prompt = """
            You are an expert programming mentor.

            Correct and improve this %s code.

            Rules:
            - Fix bugs
            - Improve formatting
            - Improve readability
            - Use best practices
            - Add comments if useful

            Return ONLY the corrected code.
            Do not explain anything.

            Code:

            %s
            """
                .formatted(
                        language,
                        code
                );

        return askGemini(prompt);
    }
    public String visualizeProblem(
            String problem) {

        String prompt = """
            You are a coding mentor.

            Analyze this coding problem:

            %s

            Return in this format:

            📂 Problem Type
            - Array / String / Tree / Graph / DP etc.

            📊 Visualization
            - Show a simple visual representation

            ▶ Dry Run
            - Step 1
            - Step 2
            - Step 3

            💡 Key Observation
            - One important insight

            Keep it beginner friendly.
            """
                .formatted(problem);

        return askGemini(prompt);
    }
    public String generateInterviewQuestion(
            String topic) {

        String prompt = """
        You are a technical interviewer.

        Generate ONE interview question on:

        %s

        Rules:
        - Return ONLY the question
        - No hints
        - No approach
        - No complexity
        - No explanation
        - Suitable for freshers

        Example output:

        • What is the difference between ArrayList and LinkedList?
        """
                .formatted(topic);

        return askGemini(prompt);
    }
    public String evaluateInterviewAnswer(
            String question,
            String answer) {

        String prompt = """
            You are a technical interviewer.

            Question:
            %s

            Candidate Answer:
            %s

            Evaluate the answer.

            Rules:
            - Keep response concise
            - Use bullet points
            - No emojis
            - No long paragraphs

            Format:

            Score: X/10

            Correct:
            • point
            • point

            Missing:
            • point
            • point

            Ideal Answer:
            • point
            • point
            """
                .formatted(
                        question,
                        answer
                );

        return askGemini(prompt);
    }
    public String predictOutput(
            String language,
            String code) {

        String prompt = """
            You are a compiler and programming expert.

            Analyze this %s code.

            Rules:
            - Predict the output.
            - If there is a compilation error,
              show the error.
            - If there is a runtime error,
              show the error.
            - If there is a logical mistake,
              explain briefly.
            - Return only the result.

            Code:

            %s
            """
                .formatted(
                        language,
                        code
                );

        return askGemini(prompt);
    }
}