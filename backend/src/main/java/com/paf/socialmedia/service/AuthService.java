package com.paf.socialmedia.service;

import com.paf.socialmedia.dto.*;
import com.paf.socialmedia.model.SocialUserEntity;
import com.paf.socialmedia.repository.AuthRepository;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService {

    private final RestTemplate restTemplate;
    private final AuthRepository authRepository;

    public AuthResponse googleSignIn(AuthRequest authRequest) {

        AuthResponse authResponse = null;

        String accessToken = Jwts.builder()
                .claim("userEmail", authRequest.getUserEmail())
                .claim("googleId", authRequest.getGoogleId())
                .claim("name", authRequest.getName())
                .claim("icon", authRequest.getIcon())
                .signWith(SignatureAlgorithm.HS256, "my-secret")
                .compact();

        Optional<SocialUserEntity> socialUserEntityOptional = this.authRepository.findByGoogleId(authRequest.getGoogleId());

        if (socialUserEntityOptional.isPresent()) {
            authResponse = AuthResponse.builder()
                    .error(null)
                    .data("sign in successful using google")
                    .accessToken(accessToken)
                    .build();
        } else {
            SocialUserEntity socialUserEntity = SocialUserEntity.builder()
                    .googleId(authRequest.getGoogleId())
                    .userEmail(authRequest.getUserEmail())
                    .name(authRequest.getName())
                    .icon(authRequest.getIcon())
                    .build();
            this.authRepository.save(socialUserEntity);

            authResponse = AuthResponse.builder()
                    .error(null)
                    .data("sign up successful using google")
                    .accessToken(accessToken)
                    .build();
        }

        return authResponse;
    }

    public AuthResponse gitCallBack(String code) {
        log.info(code);

        if (code == null) {
            return AuthResponse.builder()
                    .error("unauthorized")
                    .data(null)
                    .accessToken(null)
                    .build();
        }

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setAccept(List.of(MediaType.APPLICATION_JSON));

        GitHubAccessTokenRequest tokenRequest = new GitHubAccessTokenRequest(
                "Ov23lify75qCAMWVRssM",
                "7a81b8511ab6fb1a18b43abd2bc02c4f875d1aee",
                code,
                "http://localhost:3000/"
        );
        HttpEntity<GitHubAccessTokenRequest> requestEntity = new HttpEntity<>(tokenRequest, headers);

        ResponseEntity<GitHubAccessTokenResponse> tokenResponseEntity;
        try {
            tokenResponseEntity = restTemplate.postForEntity(
                    "https://github.com/login/oauth/access_token",
                    requestEntity,
                    GitHubAccessTokenResponse.class
            );
        } catch (HttpClientErrorException e) {
            log.error("Error getting access token: {}", e.getResponseBodyAsString());
            return AuthResponse.builder()
                    .error("Failed to authenticate with GitHub")
                    .data(null)
                    .accessToken(null)
                    .build();
        }

        if (tokenResponseEntity.getStatusCode().is2xxSuccessful() && tokenResponseEntity.getBody() != null) {
            String accessToken = tokenResponseEntity.getBody().getAccess_token();

            HttpHeaders authHeaders = new HttpHeaders();
            authHeaders.setAccept(List.of(MediaType.valueOf("application/vnd.github+json")));
            authHeaders.setBearerAuth(accessToken);
            authHeaders.set("X-GitHub-Api-Version", "2022-11-28");

            HttpEntity<Void> authRequest = new HttpEntity<>(authHeaders);

            ResponseEntity<GitHubUserResponse> userResponseEntity;
            try {
                userResponseEntity = restTemplate.exchange(
                        "https://api.github.com/user",
                        HttpMethod.GET,
                        authRequest,
                        GitHubUserResponse.class
                );
            } catch (HttpClientErrorException e) {
                log.error("Error fetching user info: {}", e.getResponseBodyAsString());
                return AuthResponse.builder()
                        .error("Failed to fetch user data from GitHub")
                        .data(null)
                        .accessToken(null)
                        .build();
            }

            if (userResponseEntity.getStatusCode().is2xxSuccessful() && userResponseEntity.getBody() != null) {
                GitHubUserResponse gitUserData = userResponseEntity.getBody();
                String gitId = gitUserData.getId();
                String name = gitUserData.getName();
                String icon = gitUserData.getAvatar_url();

                String jwtAccessToken = Jwts.builder()
                        .claim("gitId", gitId)
                        .claim("name", name)
                        .claim("icon", icon)
                        .signWith(SignatureAlgorithm.HS256, "my-secret")
                        .compact();

                SocialUserEntity socialUser = authRepository.findByGitId(gitId).orElseGet(() ->
                        authRepository.save(SocialUserEntity.builder()
                                .gitId(gitId)
                                .icon(icon)
                                .name(name)
                                .build())
                );

                return AuthResponse.builder()
                        .error(null)
                        .data("Sign in successful using GitHub")
                        .accessToken(jwtAccessToken)
                        .build();
            } else {
                return AuthResponse.builder()
                        .error("Failed to fetch user data from GitHub")
                        .data(null)
                        .accessToken(null)
                        .build();
            }
        } else {
            return AuthResponse.builder()
                    .error("Failed to authenticate with GitHub")
                    .data(null)
                    .accessToken(null)
                    .build();
        }
    }



}
