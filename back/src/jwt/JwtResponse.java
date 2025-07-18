package miniproject.stellanex.jwt;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class JwtResponse {
    private final String accessToken;

    public static JwtResponse create(String accessToken) {
        return JwtResponse.builder()
                .accessToken(accessToken)
                .build();
    }
}
