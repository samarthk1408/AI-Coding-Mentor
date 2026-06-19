package com.samarth.codingmentor.repository;

import com.samarth.codingmentor.entity.UserProgress;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserProgressRepository
        extends JpaRepository<UserProgress, Long> {

    List<UserProgress> findByUserId(
            Long userId);

    long countByUserIdAndSolved(
            Long userId,
            boolean solved);
}