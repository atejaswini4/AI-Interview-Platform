package com.interview.platform.repository;

import com.interview.platform.model.Test;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TestRepository extends JpaRepository<Test, Long> {

    List<Test> findByUserId(Long userId);

    List<Test> findByCompany(String company);

    List<Test> findByUserIdOrderByTestDateDesc(Long userId);
}