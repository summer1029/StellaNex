package miniproject.stellanex.service;

import lombok.RequiredArgsConstructor;
import miniproject.stellanex.domain.Member;
import miniproject.stellanex.domain.Movie;
import miniproject.stellanex.domain.Review;
import miniproject.stellanex.dto.ReviewInfoResponse;
import miniproject.stellanex.dto.ReviewRequest;
import miniproject.stellanex.exception.UnauthorizedException;
import miniproject.stellanex.persistence.MemberRepository;
import miniproject.stellanex.persistence.MovieRepository;
import miniproject.stellanex.persistence.ReviewRepository;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.lang.module.FindException;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReviewService {

	private final ReviewRepository reviewRepository;
	private final MemberRepository memberRepository;
	private final MovieRepository movieRepository;

	@Transactional
	public void save(String email, Long movie_id, int grade, String content, Long reviewId, String role) {
		Member member = memberRepository.findByEmail(email)
				.orElseThrow(() -> new UsernameNotFoundException("존재하지 않는 유저입니다."));
		Movie movie = movieRepository.findById(movie_id)
				.orElseThrow(() -> new NoSuchElementException("영화를 찾을 수 없습니다."));

		Review review = Review.builder().movie(movie).grade(grade).content(content).writer(member).role(role)
//                .role(member.getRole()) // Member의 역할을 가져와서 설정
				.build();

		reviewRepository.save(review);
	}

	public List<ReviewInfoResponse> getAllReviewsByMovieId(Long movieId) {
		List<Review> reviews = reviewRepository.findByMovieId(movieId);
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

		return reviews.stream().map(review -> ReviewInfoResponse.builder().review_id(review.getReview_id())
				.grade(review.getGrade()).content(review.getContent()).writer(review.getWriter().getEmail())
//                        .role(review.getRole()) // Member의 역할을 가져와서 설정
				.date(review.getDate().format(formatter)).love(review.getLove()).hate(review.getHate()).build())
				.collect(Collectors.toList());
	}

	public List<ReviewInfoResponse> getAllReviewsByMovieIdOrderByRatingAsc(Long movieId) {
//        System.out.println("여기오네");
		List<Review> reviews = reviewRepository.findByMovieIdOrderByGradeAsc(movieId);

		return mapReviewsToResponse(reviews);
	}

	public List<ReviewInfoResponse> getAllReviewsByMovieIdOrderByRatingDesc(Long movieId) {
		List<Review> reviews = reviewRepository.findByMovieIdOrderByGradeDesc(movieId);
		return mapReviewsToResponse(reviews);
	}

	public List<ReviewInfoResponse> getAllReviewsByMovieIdOrderByDateAsc(Long movieId) {
		List<Review> reviews = reviewRepository.findByMovieIdOrderByDateAsc(movieId);
		return mapReviewsToResponse(reviews);
	}

	public List<ReviewInfoResponse> getAllReviewsByMovieIdOrderByDateDesc(Long movieId) {
		List<Review> reviews = reviewRepository.findByMovieIdOrderByDateDesc(movieId);
		return mapReviewsToResponse(reviews);
	}

	@Transactional
	public void edit(String email, Long reviewId, ReviewRequest dto) {
		Review review = reviewRepository.findById(reviewId).orElseThrow(() -> new FindException("존재하지 않는 게시물입니다"));

		// 현재 로그인한 사용자와 리뷰 작성자의 이메일 비교하여 권한 확인
		if (!review.getWriter().getEmail().equals(email)) {
			throw new UnauthorizedException("본인의 리뷰만 수정할 수 있습니다.");
		}

		// 리뷰의 내용과 평점을 업데이트
		review.updateContent(dto.getContent());
		review.updateGrade(dto.getGrade());
	}
//    @Transactional
//    public void updateLove(String email, Long reviewId, ReviewRequest dto) {
//        Review review = reviewRepository.findById(reviewId)
//                .orElseThrow(() -> new FindException("존재하지 않는 게시물입니다"));
//
//        // 현재 로그인한 사용자와 리뷰 작성자의 이메일 비교하여 권한 확인
//        if (!review.getWriter().getEmail().equals(email)) {
//            throw new UnauthorizedException("본인의 리뷰만 수정할 수 있습니다.");
//        }
//
//        // 리뷰의 내용과 평점을 업데이트
//        review.updateContent(dto.getContent());
//        review.updateGrade(dto.getGrade());
//    }

	@Transactional
	public void delete(String email, Long reviewId) {
		Review review = reviewRepository.findById(reviewId).orElseThrow(() -> new FindException("존재하지 않는 게시물입니다"));

		// 현재 로그인한 사용자와 리뷰 작성자의 이메일 비교하여 권한 확인
		if (!review.getWriter().getEmail().equals(email)) {
			throw new UnauthorizedException("본인의 리뷰만 삭제할 수 있습니다.");
		}
		reviewRepository.deleteById(reviewId);
	}

//    private List<ReviewInfoResponse> mapReviewsToResponse(List<Review> reviews) {
//        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
//        return reviews.stream()
//                .map(review -> ReviewInfoResponse.builder()
//                        .review_id(review.getReview_id())
//                        .grade(review.getGrade())
//                        .content(review.getContent())
//                        .writer(review.getWriter().getEmail())
//                        .date(review.getDate().format(formatter))
//                        .build())
//                .collect(Collectors.toList());
//    }

	private List<ReviewInfoResponse> mapReviewsToResponse(List<Review> reviews) {
		// 날짜와 시간까지 포함된 포맷
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss");

		return reviews.stream()
				.map(review -> ReviewInfoResponse.builder()
						.review_id(review.getReview_id())
						.grade(review.getGrade())
						.content(review.getContent())
						.writer(review.getWriter().getEmail())
						.role(review.getRole())
						.love(review.getLove())
						.hate(review.getHate())
						.date(review.getDate().format(formatter)) // 날짜와 시간을 포멧
						.build())
				.collect(Collectors.toList());
	}

	public void deleteReviewsByEmail(String email) {
		reviewRepository.deleteByEmail(email);
	}

	public List<Review> getAllReviews() {
		return reviewRepository.findAll();
	}
}
