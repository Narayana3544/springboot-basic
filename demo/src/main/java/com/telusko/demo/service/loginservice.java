package com.telusko.demo.service;



import com.telusko.demo.model.User;
import com.telusko.demo.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
public class loginservice {


    @Autowired
    private UserRepository userRepository;

    PasswordEncoder encoder =new BCryptPasswordEncoder(10);

    public boolean authenticate(String username, String password) {
        return userRepository.findByUsername(username)
                .map(user -> user.getPassword().equals(password))
                .orElse(false);
    }

    public boolean checkPassword(String username, String rawPassword) {
        Optional<String> encryptedPassword = userRepository.findByUsername(username).map(user -> user.getPassword());
        return encoder.matches(rawPassword, encryptedPassword.orElse(null));
    }

    public User adduser(User user) {
        user.setPassword(encoder.encode(user.getPassword()));
        return userRepository.save(user);
    }
}
