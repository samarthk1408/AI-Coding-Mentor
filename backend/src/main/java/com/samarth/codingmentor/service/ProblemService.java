package com.samarth.codingmentor.service;

import com.samarth.codingmentor.exception.ProblemNotFoundException;
import com.samarth.codingmentor.model.Problem;
import com.samarth.codingmentor.repository.ProblemRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProblemService {

    private final ProblemRepository repository;

    public ProblemService(ProblemRepository repository) {
        this.repository = repository;
    }

    public List<Problem> getAllProblems() {
        return repository.findAll();
    }

    public List<Problem> getProblemsByDifficulty(String difficulty) {
        return repository.findByDifficulty(difficulty);
    }

    public Problem getProblemById(Long id) {
        return repository.findById(id)
                .orElseThrow(() ->
                        new ProblemNotFoundException(
                                "Problem with ID " + id + " not found"));
    }

    public Problem addProblem(Problem problem) {
        return repository.save(problem);
    }

    public Problem updateProblem(Long id, Problem updatedProblem) {

        Problem problem = repository.findById(id)
                .orElseThrow(() ->
                        new ProblemNotFoundException(
                                "Problem with ID " + id + " not found"));

        problem.setTitle(updatedProblem.getTitle());
        problem.setDifficulty(updatedProblem.getDifficulty());
        problem.setTopic(updatedProblem.getTopic());
        problem.setDescription(updatedProblem.getDescription());
        problem.setHint(updatedProblem.getHint());

        return repository.save(problem);
    }

    public void deleteProblem(Long id) {

        if (!repository.existsById(id)) {
            throw new ProblemNotFoundException(
                    "Problem with ID " + id + " not found");
        }

        repository.deleteById(id);
    }
}