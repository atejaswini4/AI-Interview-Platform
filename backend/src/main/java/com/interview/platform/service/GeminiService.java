package com.interview.platform.service;

import com.google.genai.Client;
import com.google.genai.types.GenerateContentResponse;
import org.springframework.stereotype.Service;

@Service
public class GeminiService {

    private final Client client;

    public GeminiService() {

        String apiKey = System.getenv("GEMINI_API_KEY");

        if (apiKey == null || apiKey.isBlank()) {
            throw new RuntimeException(
                    "GEMINI_API_KEY environment variable is not set"
            );
        }

        client = Client.builder()
                .apiKey(apiKey)
                .build();
    }

    // ============================
    // EXISTING AI FEEDBACK
    // ============================

    public String generateFeedback(
            int totalQuestions,
            int correctAnswers,
            int score
    ) {

        String prompt = """
                You are an AI interview coach for a beginner-level
                interview preparation platform.

                Analyze the following interview performance:

                Total Questions: %d
                Correct Answers: %d
                Score: %d%%

                Give practical and encouraging feedback.

                Use exactly these sections:

                Overall Performance:
                Strengths:
                Areas to Improve:
                Recommended Topics:
                AI Suggestions:

                Keep the response concise, beginner-friendly,
                and useful for interview preparation.
                """.formatted(
                totalQuestions,
                correctAnswers,
                score
        );

        GenerateContentResponse response =
                client.models.generateContent(
                        "gemini-3.6-flash",
                        prompt,
                        null
                );

        return response.text();
    }


    // ============================
    // AI QUESTION GENERATION
    // ============================

    public String generateQuestions(
            String company,
            String role,
            String difficulty,
            int count
    ) {

        String prompt = """
                You are an expert technical interviewer.

                Generate exactly %d multiple-choice interview questions.

                Interview Details:
                Company: %s
                Role: %s
                Difficulty: %s

                Requirements:

                1. Generate exactly %d questions.
                2. Questions should be relevant to the selected company,
                   role and difficulty.
                3. Each question must have exactly 4 options.
                4. There must be exactly one correct answer.
                5. Do not repeat questions.
                6. Do not use explanations.
                7. Keep questions suitable for an interview preparation
                   platform.
                8. Return ONLY valid JSON.
                9. Do not add markdown or ```json.

                Return JSON in exactly this format:

                [
                  {
                    "question": "Question text",
                    "options": [
                      "Option A",
                      "Option B",
                      "Option C",
                      "Option D"
                    ],
                    "answer": "Option A"
                  }
                ]

                Generate exactly %d questions.
                """.formatted(
                count,
                company,
                role,
                difficulty,
                count,
                count
        );

        GenerateContentResponse response =
                client.models.generateContent(
                        "gemini-3.6-flash",
                        prompt,
                        null
                );

        return response.text();
    }
}