package com.samarth.codingmentor.dto;

public class AIResponse {

    private String guidance;

    public AIResponse() {
    }

    public AIResponse(String guidance) {
        this.guidance = guidance;
    }

    public String getGuidance() {
        return guidance;
    }

    public void setGuidance(String guidance) {
        this.guidance = guidance;
    }
}