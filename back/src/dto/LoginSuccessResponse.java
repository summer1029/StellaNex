package miniproject.stellanex.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LoginSuccessResponse {
    
    private int status;
    private String message;

    public static LoginSuccessResponse toDto(String role) {
        return LoginSuccessResponse.builder()
                .status(200)
                .message("Login Success!")
                .build();
    }
}
