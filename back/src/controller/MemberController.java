package miniproject.stellanex.controller;

import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import miniproject.stellanex.domain.Member;
import miniproject.stellanex.domain.Review;
import miniproject.stellanex.dto.JoinSuccessResponse;
import miniproject.stellanex.dto.MemberInfoRequest;
import miniproject.stellanex.dto.MemberInfoResponse;
import miniproject.stellanex.dto.MemberJoinRequest;
import miniproject.stellanex.dto.MemberListResponse;
import miniproject.stellanex.dto.MemberLoginRequest;
import miniproject.stellanex.jwt.JwtResponse;
import miniproject.stellanex.jwt.JwtUtil;
import miniproject.stellanex.service.MemberService;
import miniproject.stellanex.service.ReviewService;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:8080", exposedHeaders = "Authorization")
@Slf4j
public class MemberController {

    private final MemberService memberService;
    private final JwtUtil jwt;

    @PostMapping("/member/join")
    public ResponseEntity<?> join(@RequestBody MemberJoinRequest dto) {
    	System.out.println(dto);
        try {
            memberService.join(dto.getEmail(), dto.getPassword(), dto.getName(), dto.getBirth());
            log.info("사용자 {} 가입 성공", dto.getEmail());

            JoinSuccessResponse response = JoinSuccessResponse.toDto();
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            log.error("가입 실패: {}", e.getMessage());
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/member/login")
    public ResponseEntity<?> login(@RequestBody MemberLoginRequest dto) {
        try {
            JwtResponse token = memberService.login(dto.getEmail(), dto.getPassword());
            Member mem = memberService.findMemberByEmail(dto.getEmail());

            String role = mem.getRole();
            log.info("사용자 {} 로그인 성공", dto.getEmail());

            // JSON 형태로 응답 생성
            Map<String, String> response = new HashMap<>();
            response.put("message", "success!");
            response.put("role", role); // "admin" 또는 "user"

            return ResponseEntity.ok()
                    .header("Authorization", "Bearer " + token.getAccessToken())
                    .body(response); // JSON 객체를 body로 반환
        } catch (Exception e) {
            log.error("로그인 실패: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("failed!");
        }
    }
    
    @PostMapping("member/updateRole")
    public ResponseEntity<?> updateMember(@RequestParam(name = "email") String email, @RequestParam(name = "role") String role) {
    	try {
    		Member member = memberService.findMemberByEmail(email);

    		if (member == null) {
                // 해당 사용자가 없을 경우 예외 처리
                return new ResponseEntity<>("Member not found", HttpStatus.NOT_FOUND);
            }
    		 	member.setRole(role);
    	        memberService.saveMember(member); // 변경된 역할을 저장
    	        
//    	        return new ResponseEntity<>(HttpStatus.OK); // 성공 응답
    	        return ResponseEntity.ok().body("{\"message\":\"Role updated successfully\"}");

		} catch (Exception e) {
			 log.error("변경 실패: {}", e.getMessage());
	            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("failed!");
		}
    	
    }

    @GetMapping("/member/list")
    public ResponseEntity<List<MemberListResponse>> memberList(Principal principal) {
        if (principal != null) {
            String email = principal.getName(); // 이메일을 가져옴
            Member member = memberService.findMemberByEmail(email); // Member 객체 가져오기
            
            // 사용자가 ADMIN 역할인지 확인
            boolean isAdmin = "admin".equals(member.getRole().strip());

            if (isAdmin) {
                // 관리자라면 회원 목록을 가져옴
                List<MemberListResponse> memberListResponses = memberService.memberList();
                return ResponseEntity.ok(memberListResponses);
            }
        }
        return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
    }

    @GetMapping("/member/mypage")
    public ResponseEntity<MemberInfoResponse> getInfo(@AuthenticationPrincipal User user) {
        try {
            String email = user.getUsername();
            MemberInfoResponse info = memberService.getInfo(email);
            log.info("사용자 {} 정보 조회", email);
            return ResponseEntity.ok(info);
            
        } catch (Exception e) {
            log.error("사용자 정보 조회 실패: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/member/update")
    public ResponseEntity<?> updateInfo(@AuthenticationPrincipal User user, @RequestBody MemberInfoRequest dto) {
        try {
//        	log.info("Received request: {}", dto);  // 요청 본문 출력
        	
            String email = user.getUsername();
            memberService.updatePassword(email, dto.getPassword());
            log.info("사용자 {} 비밀번호 변경", email);
            return ResponseEntity.ok().body(Map.of("message", "비밀번호가 성공적으로 변경되었습니다."));
        } catch (Exception e) {
            log.error("사용자 비밀번호 변경 실패: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", "비밀번호 변경에 실패하였습니다."));
        }
    }

    @Transactional
    @DeleteMapping("/member/delete")
    public ResponseEntity<?> deleteMember(@AuthenticationPrincipal User user) {
        try {
            String email = user.getUsername();
            // REVIEW 테이블에서 회원의 모든 리뷰 삭제
//            reviewService.deleteReviewsByEmail(email);
            memberService.deleteReviewsByEmail(email); // 주석 제거
            // MEMBER 테이블에서 회원 삭제
            memberService.deleteMemberByEmail(email);
            log.info("사용자 {} 정보 삭제", email);
            return ResponseEntity.ok("delete success");
        } catch (Exception e) {
            log.error("회원 정보 삭제 중 오류 발생: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("회원 정보 삭제 중 오류가 발생했습니다: " + e.getMessage());
        }
    }
}