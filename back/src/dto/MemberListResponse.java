package miniproject.stellanex.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import miniproject.stellanex.domain.Member;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MemberListResponse {
	
    private String name;
    private String role;
    private String email;
  
}
