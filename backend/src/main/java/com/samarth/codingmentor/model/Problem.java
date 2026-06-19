package com.samarth.codingmentor.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Problem {

    @Id
    private Long id;

    private String title;
    private String difficulty;
    private String topic;
    private String description;
    private String hint;

    public Problem() {
    }

    public Problem(Long id, String title, String difficulty,
                   String topic, String description, String hint) {
        this.id = id;
        this.title = title;
        this.difficulty = difficulty;
        this.topic = topic;
        this.description = description;
        this.hint = hint;
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

    public String getTopic() {
        return topic;
    }

    public void setTopic(String topic) {
        this.topic = topic;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getHint() {
        return hint;
    }

    public void setHint(String hint) {
        this.hint = hint;
    }
}