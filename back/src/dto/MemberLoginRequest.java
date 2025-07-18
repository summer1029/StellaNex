package miniproject.stellanex.dto;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class MemberLoginRequest {
    private String email;
    private String password;
}
