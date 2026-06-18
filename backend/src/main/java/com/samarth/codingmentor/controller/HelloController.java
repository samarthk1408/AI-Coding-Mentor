package com.samarth.codingmentor.controller;

import com.samarth.codingmentor.model.Problem;
import com.samarth.codingmentor.repository.ProblemRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class HelloController {

    private final ProblemRepository repository;

    public HelloController(ProblemRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/hello")
    public String hello() {
        return "Hello Samarth! Spring Boot is working.";
    }

    @GetMapping("/problems")
    public List<Problem> getAllProblems() {
        return repository.findAll();
    }

    @GetMapping("/problems/{id}")
    public Problem getProblemById(@PathVariable Long id) {
        return repository.findById(id).orElse(null);
    }

    @PostMapping("/problems")
    public Problem addProblem(@RequestBody Problem problem) {
        return repository.save(problem);
    }

    @GetMapping("/delete/{id}")
    public String deleteProblem(@PathVariable Long id) {
        repository.deleteById(id);
        return "Problem Deleted Successfully!";
    }
    @PutMapping("/problems/{id}")
    public Problem updateProblem(@PathVariable Long id,
                                 @RequestBody Problem updatedProblem) {

        Problem problem = repository.findById(id).orElse(null);

        if (problem != null) {
            problem.setTitle(updatedProblem.getTitle());
            problem.setDifficulty(updatedProblem.getDifficulty());
            return repository.save(problem);
        }

        return null;
    }
}