package miniproject.stellanex.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.env.Environment;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Collections;
import java.util.Date;

@Component
@Slf4j
public class JwtProvider {
    private final Key key;

    public JwtProvider(Environment env) {
        byte[] keyBytes = env.getProperty("jwt.token.secret").getBytes();
        this.key = Keys.hmacShaKeyFor(keyBytes);
    }

    public JwtResponse createToken(Authentication authentication) {
        long now = System.currentTimeMillis();

        Date expirationTime = new Date(now + 86400000); // 24 hours

        String accessToken = Jwts.builder()
                .setSubject(authentication.getName())
                .setExpiration(expirationTime)
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();

        return JwtResponse.create(accessToken);
    }

    public Authentication getAuthentication(String accessToken) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(accessToken)
                .getBody();

        User principal = new User(claims.getSubject(), "", Collections.singletonList(new SimpleGrantedAuthority("ROLE_MEMBER")));

        return new UsernamePasswordAuthenticationToken(principal, "", principal.getAuthorities());
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            log.info("Invalid JWT token: {}", e.getMessage());
            return false;
        }
    }
    
}
