package com.samarth.codingmentor.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Problem {

    @Id
    private Long id;

    private String title;
    private String difficulty;

    public Problem() {
    }

    public Problem(Long id, String title, String difficulty) {
        this.id = id;
        this.title = title;
        this.difficulty = difficulty;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(String difficulty) {
        this.difficulty = difficulty;
    }
}