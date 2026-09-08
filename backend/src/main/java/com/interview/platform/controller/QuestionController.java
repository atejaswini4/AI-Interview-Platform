package com.interview.platform.controller;

import com.interview.platform.model.Question;
import com.interview.platform.service.QuestionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/questions")
@CrossOrigin(origins = "*")
public class QuestionController {

    private final QuestionService questionService;

    public QuestionController(
            QuestionService questionService) {

        this.questionService = questionService;
    }

    // =========================
    // ADD QUESTION
    // =========================
    @PostMapping
    public ResponseEntity<Question> addQuestion(
            @RequestBody Question question) {

        return ResponseEntity.ok(
                questionService.addQuestion(question)
        );
    }

    // =========================
    // GET ALL QUESTIONS
    // =========================
    @GetMapping
    public ResponseEntity<List<Question>> getAllQuestions() {

        return ResponseEntity.ok(
                questionService.getAllQuestions()
        );
    }

    // =========================
    // MOCK INTERVIEW QUESTIONS
    // =========================
    @GetMapping("/mock")
    public ResponseEntity<List<Question>> getMockQuestions(

            @RequestParam(defaultValue = "5")
            int count,

            @RequestParam(defaultValue = "All")
            String company,

            @RequestParam(defaultValue = "All")
            String role,

            @RequestParam(defaultValue = "All")
            String difficulty) {

        return ResponseEntity.ok(
                questionService.getRandomQuestions(
                        count,
                        company,
                        role,
                        difficulty
                )
        );
    }

    // =========================
    // GET QUESTION BY ID
    // =========================
    @GetMapping("/{id}")
    public ResponseEntity<Question> getQuestionById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                questionService.getQuestionById(id)
        );
    }

    // =========================
    // GET BY COMPANY
    // =========================
    @GetMapping("/company/{company}")
    public ResponseEntity<List<Question>> getByCompany(
            @PathVariable String company) {

        return ResponseEntity.ok(
                questionService.getByCompany(company)
        );
    }

    // =========================
    // GET BY ROLE
    // =========================
    @GetMapping("/role/{role}")
    public ResponseEntity<List<Question>> getByRole(
            @PathVariable String role) {

        return ResponseEntity.ok(
                questionService.getByRole(role)
        );
    }

    // =========================
    // GET BY TYPE
    // =========================
    @GetMapping("/type/{type}")
    public ResponseEntity<List<Question>> getByType(
            @PathVariable String type) {

        return ResponseEntity.ok(
                questionService.getByType(type)
        );
    }

    // =========================
    // GET BY COMPANY + ROLE + TYPE
    // =========================
    @GetMapping("/filter")
    public ResponseEntity<List<Question>> getFilteredQuestions(

            @RequestParam String company,

            @RequestParam String role,

            @RequestParam String type) {

        return ResponseEntity.ok(
                questionService.getFilteredQuestions(
                        company,
                        role,
                        type
                )
        );
    }

    // =========================
    // DELETE QUESTION
    // =========================
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteQuestion(
            @PathVariable Long id) {

        questionService.deleteQuestion(id);

        return ResponseEntity.ok(
                "Question deleted successfully"
        );
    }
}