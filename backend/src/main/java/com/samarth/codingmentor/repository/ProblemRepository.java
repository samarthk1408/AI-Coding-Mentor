package com.samarth.codingmentor.repository;

import com.samarth.codingmentor.model.Problem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProblemRepository extends JpaRepository<Problem, Long> {

}