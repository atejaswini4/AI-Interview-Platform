package com.interview.platform.controller;

import com.interview.platform.model.User;
import com.interview.platform.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // =========================================================
    // REGISTER
    // =========================================================
    @PostMapping("/register")
    public ResponseEntity<User> register(
            @RequestBody User user) {

        try {

            User registeredUser =
                    userService.register(user);

            return ResponseEntity.ok(
                    registeredUser
            );

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .build();
        }
    }

    // =========================================================
    // LOGIN
    // =========================================================
    @PostMapping("/login")
    public ResponseEntity<User> login(
            @RequestBody User user) {

        try {

            User loggedInUser =
                    userService.login(
                            user.getEmail(),
                            user.getPassword()
                    );

            return ResponseEntity.ok(
                    loggedInUser
            );

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .build();
        }
    }

    // =========================================================
    // LEADERBOARD
    // IMPORTANT:
    // Keep this BEFORE /{id}
    // =========================================================
    @GetMapping("/leaderboard")
    public ResponseEntity<List<User>> getLeaderboard() {

        return ResponseEntity.ok(
                userService.getLeaderboard()
        );
    }

    // =========================================================
    // GET ALL USERS
    // =========================================================
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {

        return ResponseEntity.ok(
                userService.getAllUsers()
        );
    }

    // =========================================================
    // GET USER BY ID
    // =========================================================
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(
            @PathVariable Long id) {

        try {

            return ResponseEntity.ok(
                    userService.getUserById(id)
            );

        } catch (RuntimeException e) {

            return ResponseEntity
                    .notFound()
                    .build();
        }
    }

    // =========================================================
    // SAVE PRACTICE RESULT
    // =========================================================
    @PostMapping("/{id}/practice-result")
    public ResponseEntity<User> completePractice(
            @PathVariable Long id,
            @RequestBody Map<String, Integer> result) {

        try {

            int xpEarned =
                    result.getOrDefault(
                            "xpEarned",
                            0
                    );

            int totalQuestions =
                    result.getOrDefault(
                            "totalQuestions",
                            0
                    );

            int correctAnswers =
                    result.getOrDefault(
                            "correctAnswers",
                            0
                    );

            User updatedUser =
                    userService.completePractice(
                            id,
                            xpEarned,
                            totalQuestions,
                            correctAnswers
                    );

            return ResponseEntity.ok(
                    updatedUser
            );

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .build();
        }
    }

    // =========================================================
    // SAVE MOCK INTERVIEW RESULT
    // =========================================================
    @PostMapping("/{id}/mock-result")
    public ResponseEntity<User> completeMockInterview(
            @PathVariable Long id,
            @RequestBody Map<String, Integer> result) {

        try {

            int xpEarned =
                    result.getOrDefault(
                            "xpEarned",
                            0
                    );

            int totalQuestions =
                    result.getOrDefault(
                            "totalQuestions",
                            0
                    );

            int correctAnswers =
                    result.getOrDefault(
                            "correctAnswers",
                            0
                    );

            User updatedUser =
                    userService.completeMockInterview(
                            id,
                            xpEarned,
                            totalQuestions,
                            correctAnswers
                    );

            return ResponseEntity.ok(
                    updatedUser
            );

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .build();
        }
    }
}