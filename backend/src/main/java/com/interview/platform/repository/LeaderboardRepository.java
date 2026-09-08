package com.interview.platform.repository;

import com.interview.platform.model.Leaderboard;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LeaderboardRepository
        extends JpaRepository<Leaderboard, Long> {

    List<Leaderboard> findByPeriodOrderByXpDesc(String period);

    List<Leaderboard> findAllByOrderByXpDesc();
}