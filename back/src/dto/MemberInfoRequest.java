package miniproject.stellanex.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class MemberInfoRequest {
    private String name;
    private String birth;
    private String password;
    private String email;
}