package miniproject.stellanex.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LoginFailResponse {

    private int status;
    private String message;

    public static LoginFailResponse toDto() {
        return LoginFailResponse.builder()
                .status(400)
                .message("Login Failed!")
                .build();
    }
}
