package miniproject.stellanex.dto;

import lombok.*;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class JoinFailResponse {

    private int status;
    private String message;

    public static JoinFailResponse toDto() {
        return JoinFailResponse.builder()
                .status(400)
                .message("Join Failed!")
                .build();
    }
}
