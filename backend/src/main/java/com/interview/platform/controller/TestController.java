package com.interview.platform.controller;

import com.interview.platform.model.Test;
import com.interview.platform.service.TestService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tests")
@CrossOrigin(origins = "*")
public class TestController {

    private final TestService testService;

    public TestController(TestService testService) {
        this.testService = testService;
    }

    @PostMapping("/submit")
    public ResponseEntity<?> submitTest(
            @RequestBody Test test) {

        try {

            return ResponseEntity.ok(
                    testService.submitTest(test)
            );

        } catch (RuntimeException e) {

            return ResponseEntity.badRequest()
                    .body(e.getMessage());
        }
    }

    @GetMapping
    public List<Test> getAllTests() {
        return testService.getAllTests();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getTest(
            @PathVariable Long id) {

        try {

            return ResponseEntity.ok(
                    testService.getTestById(id)
            );

        } catch (RuntimeException e) {

            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/user/{userId}")
    public List<Test> getUserTests(
            @PathVariable Long userId) {

        return testService.getTestsByUser(userId);
    }

    @GetMapping("/company/{company}")
    public List<Test> getCompanyTests(
            @PathVariable String company) {

        return testService.getTestsByCompany(company);
    }
}