package com.interview.platform.repository;

import com.interview.platform.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface QuestionRepository extends JpaRepository<Question, Long> {

    List<Question> findByCompany(String company);

    List<Question> findByRole(String role);

    List<Question> findByType(String type);

    List<Question> findByCompanyAndRole(
            String company,
            String role
    );

    List<Question> findByCompanyAndRoleAndType(
            String company,
            String role,
            String type
    );

    // Get questions by difficulty
    List<Question> findByDifficultyIgnoreCase(String difficulty);

    // =========================
    // MOCK INTERVIEW FILTER
    // =========================

    @Query("""
        SELECT q FROM Question q
        WHERE (:company = 'All' OR LOWER(q.company) = LOWER(:company))
        AND (:role = 'All' OR LOWER(q.role) = LOWER(:role))
        AND (:difficulty = 'All' OR LOWER(q.difficulty) = LOWER(:difficulty))
    """)
    List<Question> findMockQuestions(
            @Param("company") String company,
            @Param("role") String role,
            @Param("difficulty") String difficulty
    );
}