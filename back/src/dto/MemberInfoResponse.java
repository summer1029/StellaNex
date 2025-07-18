package miniproject.stellanex.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import miniproject.stellanex.domain.Member;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MemberInfoResponse {

    private String email;
    private String name;

    public static MemberInfoResponse dto(Member member) {
        return MemberInfoResponse.builder()
                .email(member.getEmail())
                .name(member.getName())
                .build();
    }
}
