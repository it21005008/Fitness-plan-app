package com.paf.backend.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.function.Function;

@Component
public class JwtService {

    // Secret key for signing JWTs (replace with your actual secret key)
    private static final String SECRET = "109DEC6EB733381CFE6CC90CFAF76989377389873C616BF8A4E6474C6B818B589C3865A019F714D86F0A966E3D9BEBF50C19D204082BF6A33A087688099CB20FE207C12910F5437EBC2A17402A02B70B46E5A2E99ED7054F1D4869EF361CCC60CAF3CDAE2A0AF1F04ADE570C7124ADCC6DF1B7FC913B6E3E954B4E94B20D95DB";

    // List to store blacklisted tokens
    private List<String> blacklistedTokens = new ArrayList<>();

    // Generate a new JWT token
    public String generateToken(String username) {
        long expirationTimeInMillis = 3600000; // 1 hour expiration time
        Key key = Keys.hmacShaKeyFor(Decoders.BASE64.decode(SECRET));
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expirationTimeInMillis))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    // Extract username from a token
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    // Extract expiration date from a token
    public Date extractExpiration(String token) {
        Claims claims = extractAllClaims(token);
        return claims != null ? claims.getExpiration() : null;
    }

    // Extract a claim from a token
    private <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    // Extract all claims from a token
    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSignKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    // Check if a token is expired
    private Boolean isTokenExpired(String token) {
        Date expiration = extractExpiration(token);
        return expiration != null && expiration.before(new Date());
    }

    // Validate a token
    public Boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token) && !isTokenBlacklisted(token));
    }

    // Add a token to the blacklist
    public void blacklistToken(String token) {
        blacklistedTokens.add(token);
    }

    // Method to check if a token is blacklisted
    public boolean isTokenBlacklisted(String token) {
        return blacklistedTokens.contains(token);
    }


    // Check if a token is blacklisted
    public boolean isBlacklisted(String token) {
        return blacklistedTokens.contains(token);
    }

    // Get the signing key
    private Key getSignKey() {
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(SECRET));
    }
}
