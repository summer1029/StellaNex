package miniproject.stellanex.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class MemberJoinRequest {
    private String email;
    private String password;
    private String name;
    private String birth;
	@Override
	public String toString() {
		return "MemberJoinRequest [email=" + email + ", password=" + password + ", name=" + name + ", birth=" + birth
				+ "]";
	}
}
