package com.paf.backend.controller;

import com.paf.backend.model.AuthRequest;
import com.paf.backend.model.UserInfo;
import com.paf.backend.service.JwtService;
import com.paf.backend.service.UserInfoService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Optional;

@CrossOrigin("*")
@RestController
@RequestMapping("api/user")
@AllArgsConstructor
public class UserController {

    private final UserInfoService userService;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @PostMapping("/register")
    public String addNewUser(@RequestBody UserInfo userInfo) {
        return userService.addUser(userInfo);
    }

    @PostMapping("/login")
    public TokenResponse authenticateAndGetToken(@RequestBody AuthRequest authRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authRequest.getEmail(), authRequest.getPassword())
        );

        if (authentication.isAuthenticated()) {
            String token = jwtService.generateToken(authRequest.getEmail());
            return new TokenResponse(token);
        } else {
            throw new UsernameNotFoundException("Invalid User Request!");
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logoutUser(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        String token = authHeader.substring(7); // Assuming the token is in the format "Bearer <token>"
        jwtService.blacklistToken(token);
        return ResponseEntity.ok("User logged out successfully");
    }

    @PostMapping("/validate")
    public ResponseEntity<?> validateUser(HttpServletRequest request) {
        // Extract the token from the Authorization header
        String header = request.getHeader("Authorization");
        if (header != null && header.startsWith("Bearer ")) {
            String token = header.substring(7); // Remove "Bearer " prefix

            // Obtain the authentication object from the security context
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

            // Check if the authentication object is not null and is authenticated
            if (authentication != null && authentication.isAuthenticated()) {
                // Cast the principal to UserDetails
                UserDetails userDetails = (UserDetails) authentication.getPrincipal();

                // Validate the token
                if (jwtService.validateToken(token, userDetails)) {
                    return ResponseEntity.ok("Token is valid");
                } else {
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token is not valid");
                }
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("No authentication details found");
            }
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Authorization header is missing or does not contain Bearer token");
        }
    }

    @GetMapping("/{email}")
    public ResponseEntity<?> getUserDetails(@PathVariable String email) {
        Optional<UserInfo> userInfo = userService.getUserByEmail(email);
        if (userInfo.isPresent()) {
            return ResponseEntity.ok(userInfo);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
    }




    @AllArgsConstructor
    static class TokenResponse {
        private String token;

        public String getToken() {
            return token;
        }
    }
}