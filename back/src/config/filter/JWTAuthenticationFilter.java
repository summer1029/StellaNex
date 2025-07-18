//package miniproject.stellanex.config.filter;
//
//import com.auth0.jwt.JWT;
//import com.auth0.jwt.algorithms.Algorithm;
//import com.fasterxml.jackson.databind.ObjectMapper;
//import jakarta.servlet.FilterChain;
//import jakarta.servlet.ServletException;
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//import lombok.RequiredArgsConstructor;
//import miniproject.stellanex.domain.Member;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.AuthenticationException;
//import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
//
//import java.io.IOException;
//import java.sql.Date;
//
//@RequiredArgsConstructor
//public class JWTAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
//    //인증 객체
//    private final AuthenticationManager authenticationManager;
//
//    //Post/login 요청이 왔을 때 인증을 시도하는 메소드
//    @Override
//    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
//
//        ObjectMapper mapper = new ObjectMapper(); //Request에서 JSON타입의 [username/password]를 읽어서 Java객체 Member를 생성한다
//        Member member = null;   // 사용자 정보를 담고있는 클래스
//        try {
//            member = mapper.readValue(request.getInputStream(), Member.class);
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//
//        //Security에게 로그인 요청에 필요한 객체 생성
//        Authentication authToken = new UsernamePasswordAuthenticationToken(member.getEmail(), member.getPassword());
//
//        //인증 진행 -> UserDetailsService를 상속받은 클래스의 loadUserByUsername을 호출한다
//        Authentication auth = authenticationManager.authenticate(authToken);
//        System.out.println("auth:" + auth);
//        return auth;
//    }
//
//    //인증이 성공했을 때 실행되는 후처리 메소드
//    @Override
//    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain
//            chain, Authentication authResult) throws IOException, ServletException {
//
//        //인증 결과 생성된 Authentication객체에서 필요한 정보를 읽어서 토큰을 만들어 헤더에 추가한다
//        Member member = (Member) authResult.getPrincipal();
//        String token = JWT.create()
//                .withExpiresAt(new Date(System.currentTimeMillis() + 1000 * 60 * 100)) //100분
//                .withClaim("email", member.getEmail())
//                .sign(Algorithm.HMAC256("miniproject.stellanex.jwt"));
//        response.addHeader("Authorization", "Bearer " + token);
//    }
//}