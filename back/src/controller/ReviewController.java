package miniproject.stellanex.controller;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import miniproject.stellanex.domain.Member;
import miniproject.stellanex.domain.Movie;
import miniproject.stellanex.domain.Review;
import miniproject.stellanex.dto.Hatedto;
import miniproject.stellanex.dto.Lovedto;
import miniproject.stellanex.dto.ReviewByWriterdto;
import miniproject.stellanex.dto.ReviewInfoResponse;
import miniproject.stellanex.dto.ReviewRequest;
import miniproject.stellanex.dto.Reviewdto;
import miniproject.stellanex.exception.UnauthorizedException;
import miniproject.stellanex.persistence.MemberRepository;
import miniproject.stellanex.persistence.MovieRepository;
import miniproject.stellanex.persistence.ReviewRepository;
import miniproject.stellanex.service.ReviewService;

@RestController
@RequiredArgsConstructor
@Slf4j
public class ReviewController {

	private final ReviewService reviewService;
	private final MemberRepository memberRepository;
	private final MovieRepository movieRepository;
	private final ReviewRepository reviewRepository;

	@PostMapping("/movie/review/{movieId}")
	public ResponseEntity<?> saveReview(@AuthenticationPrincipal UserDetails userDetails,
			@PathVariable("movieId") Long movieId, @RequestBody ReviewRequest dto) {
		try {
			String email = userDetails.getUsername();
			Member member = memberRepository.findByEmail(email)
					.orElseThrow(() -> new UsernameNotFoundException("회원을 찾을 수 없습니다."));
			reviewService.save(member.getEmail(), movieId, dto.getGrade(), dto.getContent(), dto.getReview_id(),
					member.getRole());
			log.info("사용자 {}가 리뷰를 성공적으로 저장했습니다.", email);
			return ResponseEntity.ok().build();
		} catch (UsernameNotFoundException e) {
			log.error("회원을 찾을 수 없습니다: {}", e.getMessage());
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "회원을 찾을 수 없습니다."));
		} catch (Exception e) {
			log.error("리뷰 저장 실패: {}", e.getMessage());
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", "작성에 실패하였습니다."));
		}
	}

	@GetMapping("/movie/review/{movieId}")
	public ResponseEntity<?> getAllReviewsByMovieId(@PathVariable("movieId") Long movieId,
			@RequestParam(name = "ordertype", required = false) String ordertype,
			@RequestParam(name = "order", required = false) String order) {

		try {
			log.info("{} 번 영화의 리뷰를 가져오는 중입니다.", movieId);
			Movie movie = movieRepository.findById(movieId)
					.orElseThrow(() -> new NoSuchElementException("해당 ID의 영화를 찾을 수 없습니다."));
			List<ReviewInfoResponse> reviews = getSortedReviews(ordertype, order, movieId);
			System.out.print(reviews);
			return ResponseEntity.ok(reviews);
		} catch (NoSuchElementException e) {
			log.error("영화를 찾을 수 없습니다: {}", e.getMessage());
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		} catch (Exception e) {
			log.error("리뷰 조회 실패: {}", e.getMessage());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@GetMapping("/movie/review")
	public ResponseEntity<List<Reviewdto>> getAllReviews() {
		try {
			log.info("전체 리뷰 목록 조회");
			List<Review> reviews = reviewRepository.findAll();

			if (reviews.isEmpty()) {
				return ResponseEntity.noContent().build(); // 204 No Content
			}

			// Review를 ReviewDTO로 변환
			List<Reviewdto> reviewDTOs = reviews.stream()
					.map(review -> new Reviewdto(review.getReview_id(), review.getDate(), review.getGrade(),
							review.getContent(), review.getRole(), review.getLove(), review.getHate(),
							review.getWriter().getEmail(), review.getMovie().getMovie_id(), // 영화 ID 포함
							review.getMovieTitle()))
					.collect(Collectors.toList());

			return ResponseEntity.ok(reviewDTOs);
		} catch (Exception e) {
			log.error("전체 리뷰 목록 조회 실패: {}", e.getMessage());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.emptyList());
		}
	}

	@PutMapping("/movie/review/{reviewId}")
	public ResponseEntity<Void> editReview(@AuthenticationPrincipal UserDetails userDetails,
			@PathVariable("reviewId") Long reviewId, @RequestBody ReviewRequest dto) {
		try {
			String email = userDetails.getUsername();
			reviewService.edit(email, reviewId, dto);
			log.info("사용자 {}가 ID {}의 리뷰를 성공적으로 수정했습니다.", email, reviewId);
			return ResponseEntity.ok().build();
		} catch (UnauthorizedException e) {
			log.error("리뷰 수정 권한이 없습니다: {}", e.getMessage());
			return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
		} catch (Exception e) {
			log.error("리뷰 수정 실패: {}", e.getMessage());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@DeleteMapping("/movie/review/{reviewId}")
	public ResponseEntity<Void> deleteReview(@AuthenticationPrincipal UserDetails userDetails,
			@PathVariable("reviewId") Long reviewId) {
		try {
			String email = userDetails.getUsername();
			reviewService.delete(email, reviewId);
			log.info("사용자 {}가 ID {}의 리뷰를 성공적으로 삭제했습니다.", email, reviewId);
			return ResponseEntity.ok().build();
		} catch (UnauthorizedException e) {
			log.error("리뷰 삭제 권한이 없습니다: {}", e.getMessage());
			return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
		} catch (Exception e) {
			log.error("리뷰 삭제 실패: {}", e.getMessage());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	private List<ReviewInfoResponse> getSortedReviews(String ordertype, String order, Long movieId) {
		List<ReviewInfoResponse> reviews;
		System.out.println(ordertype);
		System.out.println(order);
		if (ordertype == null || order == null) {
			reviews = reviewService.getAllReviewsByMovieId(movieId);
			System.out.println("ddd");
		} else {

			reviews = switch (ordertype) {
			case "grade" -> "asc".equals(order) ? reviewService.getAllReviewsByMovieIdOrderByRatingAsc(movieId)
					: reviewService.getAllReviewsByMovieIdOrderByRatingDesc(movieId);
			case "date" -> "asc".equals(order) ? reviewService.getAllReviewsByMovieIdOrderByDateAsc(movieId)
					: reviewService.getAllReviewsByMovieIdOrderByDateDesc(movieId);
			default -> reviewService.getAllReviewsByMovieId(movieId);
			};
		}
		return reviews;
	}

	@PostMapping("/movie/love/{reviewid}")
	public ResponseEntity<?> updateLove(@AuthenticationPrincipal UserDetails userDetails,
			@PathVariable("reviewid") Long reviewid, @RequestBody Lovedto dto) {
		try {
			Review review = reviewRepository.findById(reviewid)
					.orElseThrow(() -> new NoSuchElementException("리뷰를 찾을 수 없습니다."));

			System.out.println("업데이트 전 좋아요 수: " + review.getLove() + ", 싫어요 수: " + review.getHate()); // 추가된 로그

			if (dto.getLove() != null) {
				if (dto.getLove() == 1) { // 좋아요 추가

					review.setLove(review.getLove() + 1); // 좋아요 수 증가
				} else if (dto.getLove() == -1) { // 좋아요 취소

					if (review.getLove() == 0) {
						review.setLove(0L);
					}
					if (review.getLove() > 0) {
						review.setLove(review.getLove() - 1); // 좋아요 수 감소
					}
				}
			}

			reviewRepository.save(review);

			System.out.println("업데이트 후 좋아요 수: " + review.getLove() + ", 싫어요 수: " + review.getHate()); // 추가된 로그
			return ResponseEntity
					.ok(Map.of("love", review.getLove(), "hate", review.getHate(), "message", "좋아요 업데이트 완료."));
		} catch (NoSuchElementException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "리뷰를 찾을 수 없습니다."));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", "작성에 실패하였습니다."));
		}
	}

	@PostMapping("/movie/hate/{reviewid}")
	public ResponseEntity<?> updateHate(@AuthenticationPrincipal UserDetails userDetails,
			@PathVariable("reviewid") Long reviewid, @RequestBody Hatedto dto) {
		try {
			Review review = reviewRepository.findById(reviewid)
					.orElseThrow(() -> new NoSuchElementException("리뷰를 찾을 수 없습니다."));

			System.out.println("업데이트 전 좋아요 수: " + review.getLove() + ", 싫어요 수: " + review.getHate()); // 추가된 로그

			if (dto.getHate() != null) {
				if (dto.getHate() == 1) { // 싫어요 추가
					review.setHate(review.getHate() + 1); // 싫어요 수 증가
				} else if (dto.getHate() == -1) { // 싫어요 취소

					if (review.getHate() == 0) {
						review.setHate(0L);
					}

					if (review.getHate() > 0) {
						review.setHate(review.getHate() - 1); // 싫어요 수 감소
					}
				}
			}

			reviewRepository.save(review);

			System.out.println("업데이트 후 좋아요 수: " + review.getLove() + ", 싫어요 수: " + review.getHate()); // 추가된 로그
			return ResponseEntity
					.ok(Map.of("love", review.getLove(), "hate", review.getHate(), "message", "싫어요 업데이트 완료."));
		} catch (NoSuchElementException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "리뷰를 찾을 수 없습니다."));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", "작성에 실패하였습니다."));
		}
	}
}
