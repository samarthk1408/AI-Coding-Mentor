package com.samarth.codingmentor.dto;

public class ProgressRequest {

    private Long userId;
    private Long problemId;

    public ProgressRequest() {
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getProblemId() {
        return problemId;
    }

    public void setProblemId(Long problemId) {
        this.problemId = problemId;
    }
}