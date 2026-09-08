package com.interview.platform.service;

import com.interview.platform.model.Test;
import com.interview.platform.repository.TestRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TestService {

    private final TestRepository testRepository;

    public TestService(TestRepository testRepository) {
        this.testRepository = testRepository;
    }

    public Test submitTest(Test test) {

        if (test.getTotalQuestions() <= 0) {
            throw new RuntimeException(
                    "Total questions must be greater than zero"
            );
        }

        int score = (int) (
                ((double) test.getCorrectAnswers()
                        / test.getTotalQuestions()) * 100
        );

        test.setScore(score);

        return testRepository.save(test);
    }

    public List<Test> getAllTests() {
        return testRepository.findAll();
    }

    public Test getTestById(Long id) {
        return testRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Test not found"));
    }

    public List<Test> getTestsByUser(Long userId) {
        return testRepository
                .findByUserIdOrderByTestDateDesc(userId);
    }

    public List<Test> getTestsByCompany(String company) {
        return testRepository.findByCompany(company);
    }
}