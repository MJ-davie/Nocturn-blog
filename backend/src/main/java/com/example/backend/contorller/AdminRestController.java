package com.example.backend.contorller;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin")
public class AdminRestController {

    @GetMapping
    public ResponseEntity<String> checkLogin() {
        return ResponseEntity.ok("Authenticated");
    }

    @Value("${admin.id}")
    private String adminID;

    @Value("${admin.password}")
    private String adminPassword;

    @RequestMapping("/login")
    public ResponseEntity<?> login(@RequestParam String id,
                                   @RequestParam String password,
                                   HttpSession session) {
        if(adminID.equals(id) && adminPassword.equals(password)) {
            session.setAttribute("isAdmin", true);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(401).body("Invalid credentials");
        }
    }
}