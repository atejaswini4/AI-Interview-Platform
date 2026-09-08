package com.interview.platform.controller;

import com.interview.platform.model.Leaderboard;
import com.interview.platform.service.LeaderboardService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/leaderboard")
@CrossOrigin(origins = "*")
public class LeaderboardController {

    private final LeaderboardService leaderboardService;

    public LeaderboardController(
            LeaderboardService leaderboardService) {

        this.leaderboardService = leaderboardService;
    }

    @GetMapping
    public List<Leaderboard> getLeaderboard() {

        return leaderboardService.getLeaderboard();
    }
}