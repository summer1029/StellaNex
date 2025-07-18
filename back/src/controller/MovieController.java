package miniproject.stellanex.controller;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import miniproject.stellanex.domain.Movie;
import miniproject.stellanex.dto.MovieData;
import miniproject.stellanex.dto.MovieInputRequest;
import miniproject.stellanex.persistence.MovieRepository;
import miniproject.stellanex.service.MovieService;

@RestController
@RequiredArgsConstructor
@Slf4j
public class MovieController {

	private final MovieService movieService;
	private final MovieRepository movieRepository;

	@GetMapping("/movie")
	public ResponseEntity<?> getAllMovies() {
		try {
			log.info("전체 영화 목록 조회");
			List<Movie> movies = movieRepository.findAll();
			return ResponseEntity.ok(movies);
		} catch (Exception e) {
			log.error("전체 영화 목록 조회 실패: {}", e.getMessage());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("조회 실패: " + e.getMessage());
		}
	}

	@GetMapping("/movie/{movieId}")
	public ResponseEntity<?> getInfo(@AuthenticationPrincipal UserDetails userDetails, @PathVariable Long movieId) {
		try {
			log.info("영화 정보 조회: {}", movieId);
			Movie movie = movieRepository.findById(movieId)
					.orElseThrow(() -> new NoSuchElementException("Movie ID Not Found"));
			return ResponseEntity.ok(movie);
		} catch (NoSuchElementException e) {
			log.error("영화 정보 조회 실패: {}", e.getMessage());
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Movie Not Found");
		} catch (Exception e) {
			log.error("영화 정보 조회 실패: {}", e.getMessage());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("조회 실패: " + e.getMessage());
		}
	}

	@PostMapping("/saving")
	void Test(@RequestBody List<MovieData> dto) {
		for (MovieData data : dto) {
			Movie test = Movie.builder().movie_id(data.getId()).adult(data.isAdult())
					.backdrop_path(data.getBackdrop_path()).poster_path(data.getPoster_path())
					.synopsis(data.getOverview()).popularity(data.getPopularity()).title(data.getTitle())
					.release_date(data.getRelease_date()).build();
			movieRepository.save(test);

			System.out.println(test);
		}
	}
}