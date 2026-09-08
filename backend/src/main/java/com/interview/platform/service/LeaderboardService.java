package com.interview.platform.service;

import com.interview.platform.model.Leaderboard;
import com.interview.platform.model.User;
import com.interview.platform.repository.LeaderboardRepository;
import com.interview.platform.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Service
public class LeaderboardService {

    private final LeaderboardRepository leaderboardRepository;
    private final UserRepository userRepository;

    public LeaderboardService(
            LeaderboardRepository leaderboardRepository,
            UserRepository userRepository) {

        this.leaderboardRepository = leaderboardRepository;
        this.userRepository = userRepository;
    }

    public List<Leaderboard> generateLeaderboard() {

        List<User> users = userRepository.findAll();

        users.sort(
                Comparator.comparingInt(User::getXp)
                        .reversed()
        );

        List<Leaderboard> leaderboard =
                new ArrayList<>();

        int rank = 1;

        for (User user : users) {

            Leaderboard entry = new Leaderboard(
                    user.getId(),
                    user.getName(),
                    user.getXp(),
                    rank,
                    "ALL_TIME"
            );

            leaderboard.add(entry);

            rank++;
        }

        return leaderboard;
    }

    public List<Leaderboard> getLeaderboard() {

        return generateLeaderboard();
    }
}