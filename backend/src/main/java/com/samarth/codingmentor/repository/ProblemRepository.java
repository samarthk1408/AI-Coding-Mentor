package com.samarth.codingmentor.repository;

import com.samarth.codingmentor.model.Problem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProblemRepository extends JpaRepository<Problem, Long> {

    List<Problem> findByDifficulty(String difficulty);
}