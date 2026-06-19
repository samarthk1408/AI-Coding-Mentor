package com.samarth.codingmentor.service;

import com.samarth.codingmentor.dto.ProgressRequest;
import com.samarth.codingmentor.entity.UserProgress;
import com.samarth.codingmentor.repository.UserProgressRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProgressService {

    private final UserProgressRepository repository;

    public ProgressService(
            UserProgressRepository repository) {

        this.repository = repository;
    }

    public String markSolved(
            ProgressRequest request) {

        UserProgress progress =
                new UserProgress(
                        request.getUserId(),
                        request.getProblemId(),
                        true
                );

        repository.save(progress);

        return "Problem marked as solved";
    }

    public List<UserProgress> getUserProgress(
            Long userId) {

        return repository.findByUserId(
                userId
        );
    }

    public long getSolvedCount(
            Long userId) {

        return repository.countByUserIdAndSolved(
                userId,
                true
        );
    }
}