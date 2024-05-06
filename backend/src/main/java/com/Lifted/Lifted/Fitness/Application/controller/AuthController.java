package com.Lifted.Lifted.Fitness.Application.controller;

import com.Lifted.Lifted.Fitness.Application.dao.AuthRequest;
import com.Lifted.Lifted.Fitness.Application.dto.AuthResponse;
import com.Lifted.Lifted.Fitness.Application.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("type-google")
    public ResponseEntity<AuthResponse> googleSignIn(
            @RequestBody AuthRequest authRequest
    ) {
        AuthResponse authResponse = this.authService.googleSignIn(authRequest);
        return new ResponseEntity<>(authResponse, HttpStatus.OK);
    }

    @PostMapping("git/callback")
    public ResponseEntity<AuthResponse> gitCallBack(
            @RequestBody String code
    ) {
        AuthResponse authResponse = this.authService.gitCallBack(code);
        return new ResponseEntity<>(authResponse, HttpStatus.OK);
    }

}
