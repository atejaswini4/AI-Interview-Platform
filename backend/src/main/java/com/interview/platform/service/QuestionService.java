package com.interview.platform.service;

import com.interview.platform.model.Question;
import com.interview.platform.repository.QuestionRepository;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class QuestionService {

    private final QuestionRepository questionRepository;

    public QuestionService(QuestionRepository questionRepository) {
        this.questionRepository = questionRepository;
    }

    // =========================
    // ADD QUESTION
    // =========================
    public Question addQuestion(Question question) {

        if (question.getXp() <= 0) {
            question.setXp(10);
        }

        return questionRepository.save(question);
    }

    // =========================
    // GET ALL QUESTIONS
    // =========================
    public List<Question> getAllQuestions() {

        return questionRepository.findAll();
    }

    // =========================
    // GET QUESTION BY ID
    // =========================
    public Question getQuestionById(Long id) {

        return questionRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Question not found"));
    }

    // =========================
    // GET BY COMPANY
    // =========================
    public List<Question> getByCompany(String company) {

        return questionRepository.findByCompany(company);
    }

    // =========================
    // GET BY ROLE
    // =========================
    public List<Question> getByRole(String role) {

        return questionRepository.findByRole(role);
    }

    // =========================
    // GET BY TYPE
    // =========================
    public List<Question> getByType(String type) {

        return questionRepository.findByType(type);
    }

    // =========================
    // GET BY COMPANY AND ROLE
    // =========================
    public List<Question> getByCompanyAndRole(
            String company,
            String role) {

        return questionRepository
                .findByCompanyAndRole(company, role);
    }

    // =========================
    // GET FILTERED QUESTIONS
    // =========================
    public List<Question> getFilteredQuestions(
            String company,
            String role,
            String type) {

        return questionRepository
                .findByCompanyAndRoleAndType(
                        company,
                        role,
                        type
                );
    }

    // =========================
    // GET RANDOM QUESTIONS FOR MOCK INTERVIEW
    // =========================
    public List<Question> getRandomQuestions(
            int count,
            String company,
            String role,
            String difficulty) {

        // Handle empty/null company
        if (company == null ||
                company.trim().isEmpty()) {

            company = "All";
        }

        // Handle empty/null role
        if (role == null ||
                role.trim().isEmpty()) {

            role = "All";
        }

        // Handle empty/null difficulty
        if (difficulty == null ||
                difficulty.trim().isEmpty()) {

            difficulty = "All";
        }

        // Get questions according to filters
        List<Question> questions =
                questionRepository.findMockQuestions(
                        company,
                        role,
                        difficulty
                );

        // Shuffle questions randomly
        Collections.shuffle(questions);

        // Return requested number of questions
        int limit =
                Math.min(count, questions.size());

        return questions.subList(0, limit);
    }

    // =========================
    // DELETE QUESTION
    // =========================
    public void deleteQuestion(Long id) {

        if (!questionRepository.existsById(id)) {

            throw new RuntimeException(
                    "Question not found"
            );
        }

        questionRepository.deleteById(id);
    }
}