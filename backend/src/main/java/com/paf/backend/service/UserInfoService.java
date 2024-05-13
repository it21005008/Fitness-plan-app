package com.paf.backend.service;

import com.paf.backend.model.UserInfo;
import com.paf.backend.repository.UserInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserInfoService {

    @Autowired
    private UserInfoRepository repository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public String addUser(UserInfo userInfo) {
        List<UserInfo> users = repository.findAll(Sort.by(Sort.Direction.DESC, "id"));
        if (!users.isEmpty()) {
            String lastUserId = users.get(0).getId();
            String numericPart = lastUserId.substring(5);
            int newId = Integer.parseInt(numericPart) + 1;
            String newUserId = String.format("USER-%03d", newId);
            userInfo.setId(newUserId);
        } else {
            userInfo.setId("USER-001");
        }
        userInfo.setPassword(passwordEncoder.encode(userInfo.getPassword()));
        repository.save(userInfo);
        return "User added successfully";
    }

    public Optional<UserInfo> getUserByEmail(String email) {
        return repository.findByEmail(email);
    }

}



