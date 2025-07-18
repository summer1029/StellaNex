package miniproject.stellanex.jwt;

import org.springframework.stereotype.Component;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import javax.crypto.SecretKey;

@Component
public class JwtUtil {

    private SecretKey secretKey; // 비밀 키를 SecretKey 타입으로 저장

    public JwtUtil() {
        // 비밀키를 안전한 길이로 생성
        this.secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    }

    // JWT 토큰에서 역할(Role)을 추출하는 메서드
    public String getRoleFromToken(String token) {
        try {
        	System.out.println("Token received: " + token); // 토큰 확인용 콘솔 출력
        	
        	
            Claims claims = Jwts.parserBuilder()
                .setSigningKey(secretKey) // 비밀 키 설정
                .build()
                .parseClaimsJws(token) // JWT 토큰 파싱
                .getBody();
            
            System.out.println("Claims: " + claims); // 토큰 확인용 콘솔 출력
            
            String role = claims.get("role", String.class);  // "role" 키에 해당하는 값을 가져옴
            System.out.println("Role extracted from token: " + role); // 추출한 역할 출력

            return role; // 역할 반환
        } catch (Exception e) {
            // JWT 파싱 중 에러 발생 시
            throw new IllegalArgumentException("Invalid token", e);
        }
    }
}
