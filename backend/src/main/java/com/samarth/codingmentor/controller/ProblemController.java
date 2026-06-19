package com.samarth.codingmentor.controller;

import com.samarth.codingmentor.model.Problem;
import com.samarth.codingmentor.service.ProblemService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/problems")
public class ProblemController {

    private final ProblemService problemService;

    public ProblemController(ProblemService problemService) {
        this.problemService = problemService;
    }

    @GetMapping
    public List<Problem> getAllProblems() {
        return problemService.getAllProblems();
    }

    @GetMapping("/difficulty/{difficulty}")
    public List<Problem> getProblemsByDifficulty(
            @PathVariable String difficulty) {

        return problemService.getProblemsByDifficulty(difficulty);
    }

    @GetMapping("/{id}")
    public Problem getProblemById(@PathVariable Long id) {
        return problemService.getProblemById(id);
    }

    @PostMapping
    public Problem addProblem(@RequestBody Problem problem) {
        return problemService.addProblem(problem);
    }

    @PutMapping("/{id}")
    public Problem updateProblem(@PathVariable Long id,
                                 @RequestBody Problem updatedProblem) {
        return problemService.updateProblem(id, updatedProblem);
    }

    @DeleteMapping("/{id}")
    public String deleteProblem(@PathVariable Long id) {
        problemService.deleteProblem(id);
        return "Problem Deleted Successfully!";
    }

    @GetMapping("/hello")
    public String hello() {
        return "Coding Mentor API is working!";
    }
}