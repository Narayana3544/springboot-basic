package com.telusko.demo.controller;


import com.telusko.demo.model.User;
import com.telusko.demo.repo.UserRepository;
import com.telusko.demo.service.loginservice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/auth")
public class logincontroller {

    @Autowired
    private loginservice loginservice;

    @Autowired
    private UserRepository repo;

    @GetMapping("/test")
    public String test() {
        return "Hello from controller";
    }

    @PostMapping("/login")
    public String login(@RequestParam String username, @RequestParam String password) {
        boolean success = loginservice.authenticate(username, password);
        return success ? "Login successful" : "Invalid credentials";
    }
    @GetMapping("/greet")
    public String greet(){
        return "hello good afternoon";
    }

//    @PostMapping("/add")
//    public int add(@RequestParam int num1,@RequestParam int num2){
//        return num1+num2;
//    }
    @PostMapping("/adduser")
    public User adduser(@RequestBody User user){

        return loginservice.adduser(user);
    }
    @GetMapping("/users")
    public List<User> users(){
return repo.findAll();
    }

    @PostMapping("/checkuser")
    public String checkuser(@RequestParam String username, @RequestParam String password){

        boolean success = loginservice.checkPassword(username, password);
        return success ? "Login successful" : "Invalid credentials";
    }

}
