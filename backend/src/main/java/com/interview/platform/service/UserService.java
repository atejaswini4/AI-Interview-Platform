package com.interview.platform.service;

import com.interview.platform.model.User;
import com.interview.platform.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // =========================================================
    // REGISTER USER
    // =========================================================
    public User register(User user) {

        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException(
                    "Email already registered"
            );
        }

        if (user.getRole() == null ||
                user.getRole().isEmpty()) {

            user.setRole("USER");
        }

        if (user.getXp() < 0) {
            user.setXp(0);
        }

        if (user.getTestsCompleted() < 0) {
            user.setTestsCompleted(0);
        }

        if (user.getTotalQuestions() < 0) {
            user.setTotalQuestions(0);
        }

        if (user.getCorrectAnswers() < 0) {
            user.setCorrectAnswers(0);
        }

        return userRepository.save(user);
    }

    // =========================================================
    // LOGIN
    // =========================================================
    public User login(
            String email,
            String password) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Invalid email or password"
                        ));

        if (!user.getPassword().equals(password)) {
            throw new RuntimeException(
                    "Invalid email or password"
            );
        }

        return user;
    }

    // =========================================================
    // GET USER BY ID
    // =========================================================
    public User getUserById(Long id) {

        return userRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "User not found"
                        ));
    }

    // =========================================================
    // GET ALL USERS
    // =========================================================
    public List<User> getAllUsers() {

        return userRepository.findAll();
    }

    // =========================================================
    // ADD XP
    // Used by TestService
    // =========================================================
    public User addXP(Long userId, int xp) {

        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "User not found"
                        ));

        user.setXp(
                user.getXp() + xp
        );

        return userRepository.save(user);
    }

    // =========================================================
    // COMPLETE PRACTICE
    // =========================================================
    public User completePractice(
            Long userId,
            int xpEarned,
            int totalQuestions,
            int correctAnswers) {

        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "User not found"
                        ));

        // Add XP
        user.setXp(
                user.getXp() + xpEarned
        );

        // Increase completed tests
        user.setTestsCompleted(
                user.getTestsCompleted() + 1
        );

        // Update total questions
        user.setTotalQuestions(
                user.getTotalQuestions()
                        + totalQuestions
        );

        // Update correct answers
        user.setCorrectAnswers(
                user.getCorrectAnswers()
                        + correctAnswers
        );

        return userRepository.save(user);
    }

    // =========================================================
    // COMPLETE MOCK INTERVIEW
    // =========================================================
    public User completeMockInterview(
        Long userId,
        int xpEarned,
        int totalQuestions,
        int correctAnswers) {

    User user = userRepository.findById(userId)
            .orElseThrow(() ->
                    new RuntimeException("User not found"));

    System.out.println("BEFORE UPDATE:");
    System.out.println("XP = " + user.getXp());
    System.out.println("Tests = " + user.getTestsCompleted());
    System.out.println("Total Questions = " + user.getTotalQuestions());
    System.out.println("Correct Answers = " + user.getCorrectAnswers());

    user.setXp(user.getXp() + xpEarned);

    user.setTestsCompleted(
            user.getTestsCompleted() + 1
    );

    user.setTotalQuestions(
            user.getTotalQuestions() + totalQuestions
    );

    user.setCorrectAnswers(
            user.getCorrectAnswers() + correctAnswers
    );

    System.out.println("AFTER UPDATE:");
    System.out.println("XP = " + user.getXp());
    System.out.println("Tests = " + user.getTestsCompleted());
    System.out.println("Total Questions = " + user.getTotalQuestions());
    System.out.println("Correct Answers = " + user.getCorrectAnswers());

    return userRepository.save(user);
}
// =========================================================
// LEADERBOARD
// =========================================================
public List<User> getLeaderboard() {

    return userRepository
            .findAllByOrderByXpDesc();
}
}