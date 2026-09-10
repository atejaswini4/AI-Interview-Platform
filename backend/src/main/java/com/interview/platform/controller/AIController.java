package com.interview.platform.controller;

import com.interview.platform.service.GeminiService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin(origins = "*")
public class AIController {

    private final GeminiService geminiService;

    public AIController(GeminiService geminiService) {
        this.geminiService = geminiService;
    }


    // ==========================================
    // EXISTING AI FEEDBACK API
    // ==========================================

    @PostMapping("/feedback")
    public ResponseEntity<?> generateFeedback(
            @RequestBody Map<String, Integer> data
    ) {

        try {

            int totalQuestions =
                    data.getOrDefault("totalQuestions", 0);

            int correctAnswers =
                    data.getOrDefault("correctAnswers", 0);

            int score =
                    data.getOrDefault("score", 0);

            String feedback =
                    geminiService.generateFeedback(
                            totalQuestions,
                            correctAnswers,
                            score
                    );

            return ResponseEntity.ok(
                    Map.of("feedback", feedback)
            );

        } catch (Exception e) {

            return ResponseEntity
                    .badRequest()
                    .body(Map.of(
                            "error",
                            e.getMessage()
                    ));
        }
    }


    // ==========================================
    // NEW AI QUESTION GENERATION API
    // ==========================================

    @PostMapping("/generate-questions")
    public ResponseEntity<?> generateQuestions(
            @RequestBody Map<String, Object> data
    ) {

        try {

            String company =
                    String.valueOf(
                            data.getOrDefault(
                                    "company",
                                    "General"
                            )
                    );

            String role =
                    String.valueOf(
                            data.getOrDefault(
                                    "role",
                                    "Software Engineer"
                            )
                    );

            String difficulty =
                    String.valueOf(
                            data.getOrDefault(
                                    "difficulty",
                                    "Medium"
                            )
                    );

            int count =
                    ((Number) data.getOrDefault(
                            "count",
                            10
                    )).intValue();


            // Safety limit
            if (count != 5 &&
                count != 10 &&
                count != 15 &&
                count != 20) {

                return ResponseEntity
                        .badRequest()
                        .body(Map.of(
                                "error",
                                "Question count must be 5, 10, 15, or 20"
                        ));
            }


            String questions =
                    geminiService.generateQuestions(
                            company,
                            role,
                            difficulty,
                            count
                    );


            return ResponseEntity.ok(
                    Map.of(
                            "questions",
                            questions
                    )
            );

        } catch (Exception e) {

            return ResponseEntity
                    .badRequest()
                    .body(Map.of(
                            "error",
                            e.getMessage()
                    ));
        }
    }
}