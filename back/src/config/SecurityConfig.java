package miniproject.stellanex.config;

import miniproject.stellanex.config.filter.JWTAuthorizationFilter;
import miniproject.stellanex.jwt.JwtProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private JwtProvider jwtProvider;

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/member/review").authenticated()
                        .anyRequest().permitAll()) // 모든 요청을 허용
                .formLogin(AbstractHttpConfigurer::disable) // Form 기반 로그인 비활성화
                .httpBasic(AbstractHttpConfigurer::disable) // Http Basic 인증 방식 비활성화
                .csrf(AbstractHttpConfigurer::disable) // CSRF 보호 비활성화
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)); // 세션 유지하지 않음

        http
                .addFilterBefore(new JWTAuthorizationFilter(jwtProvider), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    private CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.addAllowedMethod(CorsConfiguration.ALL); // 요청을 허용할 Method
        config.addAllowedHeader(CorsConfiguration.ALL); // 요청을 허용할 Header
        config.setAllowCredentials(true); // 요청/응답에 자격증명정보 포함을 허용
        // true인 경우 addAllowedOrigin(“*”)는 사용 불가 ➔ Pattern으로 변경
        config.addAllowedOriginPattern(CorsConfiguration.ALL); // 요청을 허용할 서버
        config.addExposedHeader(CorsConfiguration.ALL);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config); // 위 설정을 적용할 Rest 서버의 URL 패턴 설정
        return source;
    }
}
