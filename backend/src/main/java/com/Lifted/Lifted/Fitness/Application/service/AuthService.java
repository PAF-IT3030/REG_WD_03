package com.Lifted.Lifted.Fitness.Application.service;

import com.Lifted.Lifted.Fitness.Application.dao.AuthRequest;
import com.Lifted.Lifted.Fitness.Application.dto.AuthResponse;

public interface AuthService {

    AuthResponse googleSignIn(AuthRequest authRequest);

    AuthResponse gitCallBack(String code);
}
