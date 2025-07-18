package miniproject.stellanex.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import miniproject.stellanex.domain.Member;
import miniproject.stellanex.dto.MemberInfoResponse;
import miniproject.stellanex.dto.MemberList;
import miniproject.stellanex.dto.MemberListResponse;
import miniproject.stellanex.exception.AppException;
import miniproject.stellanex.exception.ErrorCode;
import miniproject.stellanex.jwt.JwtProvider;
import miniproject.stellanex.jwt.JwtResponse;
import miniproject.stellanex.persistence.MemberRepository;
import miniproject.stellanex.persistence.ReviewRepository;

@Service
@RequiredArgsConstructor
@Slf4j
public class MemberService {

	private final ReviewRepository reviewRepository;
	
    private final MemberRepository memberRepository;
    private final BCryptPasswordEncoder encoder;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final JwtProvider jwtProvider;

    @Transactional
    public void join(String email, String password, String name, String birth) {
        if (memberRepository.existsByEmail(email)) {
            throw new AppException(ErrorCode.EMAIL_DUPLICATED, email + "는 이미 존재하는 회원입니다.");
        }

        Member member = createMember(email, password, name, birth);
        memberRepository.save(member);
    }

    public JwtResponse login(String email, String password) {

        // 1. Login ID/PW 를 기반으로 Authentication 객체 생성
        // 이때 authentication 는 인증 여부를 확인하는 authenticated 값이 false
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(email, password);

        // 2. 실제 검증 (사용자 비밀번호 체크)이 이루어지는 부분
        // authenticate 매서드가 실행될 때 UserDetailsServiceEX 에서 만든 loadUserByUsername 메서드가 실행
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

        // 3. 인증 정보를 기반으로 JWT 토큰 생성
        JwtResponse token = jwtProvider.createToken(authentication);

        log.info("token:{}",token);

        return token;
    }

    public MemberInfoResponse getInfo(String email) {
        Member member = findMemberByEmail(email);
        if (member == null) {
            throw new UsernameNotFoundException("해당하는 회원이 존재하지 않습니다.");
        }
        return new MemberInfoResponse(member.getEmail(), member.getName());
    }

    @Transactional
    public void deleteInfo(String email) {
        Member member = findMemberByEmail(email);
        memberRepository.delete(member);
    }

    private Member createMember(String email, String password, String name, String birth) {
        return Member.builder()
                .email(email)
                .password(encoder.encode(password))
                .name(name)
                .birth(birth)
                .build();
    }

//    private Member findMemberByEmail(String email) {
//        return memberRepository.findByEmail(email)
//                .orElseThrow(() -> new UsernameNotFoundException("해당하는 회원이 존재하지 않습니다."));
//    }
    

 // 기존 private 접근제한자를 public으로 변경
	 public Member findMemberByEmail(String email) {
	     return memberRepository.findByEmail(email)
	             .orElseThrow(() -> new UsernameNotFoundException("해당하는 회원이 존재하지 않습니다."));
	 }


    public void updatePassword(String email, String newPassword) {
        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("해당 이메일을 가진 사용자를 찾을 수 없습니다."));

        // 새로운 비밀번호 암호화
        String encodedPassword = encoder.encode(newPassword);

        // 암호화된 비밀번호로 업데이트
        member.setPassword(encodedPassword);

        // 변경된 정보 저장
        memberRepository.save(member);
    }

    public void deleteMemberByEmail(String email) {
        memberRepository.deleteByEmail(email);
    }
    
    public void deleteReviewsByEmail(String email) {
        reviewRepository.deleteByEmail(email); // 이메일로 리뷰 삭제
    }

	public List<MemberListResponse> memberList() {
		List<Member> members = memberRepository.findAll();
		return members.stream()
				.map(member -> new MemberListResponse(member.getName(), member.getRole(), member.getEmail()))
				.collect(Collectors.toList());
	}

	public void saveMember(Member member) {
		memberRepository.save(member);
		
	}


}