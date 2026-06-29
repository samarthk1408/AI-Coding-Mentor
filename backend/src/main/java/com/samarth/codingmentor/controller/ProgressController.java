package com.samarth.codingmentor.controller;

import com.samarth.codingmentor.dto.ProgressRequest;
import com.samarth.codingmentor.entity.UserProgress;
import com.samarth.codingmentor.service.ProgressService;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/progress")
public class ProgressController {

    private final ProgressService progressService;

    public ProgressController(
            ProgressService progressService) {

        this.progressService =
                progressService;
    }

    @PostMapping("/solve")
    public String markSolved(
            @RequestBody
            ProgressRequest request) {

        return progressService
                .markSolved(request);
    }

    @GetMapping("/{userId}")
    public List<UserProgress> getProgress(
            @PathVariable Long userId) {

        return progressService
                .getUserProgress(
                        userId
                );
    }

    @GetMapping("/count/{userId}")
    public long solvedCount(
            @PathVariable Long userId) {

        return progressService
                .getSolvedCount(
                        userId
                );
    }
}