package com.paf.backend.repository;

import com.paf.backend.model.UserInfo;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UserInfoRepository extends MongoRepository<UserInfo, String> {
    Optional<UserInfo> findByEmail(String email);
}
