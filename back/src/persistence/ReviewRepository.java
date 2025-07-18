package miniproject.stellanex.persistence;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import miniproject.stellanex.domain.Member;
import miniproject.stellanex.domain.Movie;
import miniproject.stellanex.domain.Review;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    @Query("select r from Review r where r.movie.movie_id = :movieId")
    List<Review> findByMovieId(@Param("movieId") Long movieId);

    @Query("SELECT r FROM Review r WHERE r.movie.movie_id = :movieId ORDER BY r.grade ASC")
    List<Review> findByMovieIdOrderByGradeAsc(@Param("movieId") Long movieId);

    @Query("SELECT r FROM Review r WHERE r.movie.movie_id = :movieId ORDER BY r.grade DESC")
    List<Review> findByMovieIdOrderByGradeDesc(@Param("movieId") Long movieId);

    @Query("SELECT r FROM Review r WHERE r.movie.movie_id = :movieId ORDER BY r.date ASC")
    List<Review> findByMovieIdOrderByDateAsc(@Param("movieId") Long movieId);

    @Query("SELECT r FROM Review r WHERE r.movie.movie_id = :movieId ORDER BY r.date DESC")
    List<Review> findByMovieIdOrderByDateDesc(@Param("movieId") Long movieId);

    @Modifying
    @Query("DELETE FROM Review r WHERE r.writer.email = :email")
    void deleteByEmail(@Param("email") String email);
    
 // 전체 영화 목록 조회 메서드
    List<Review> findAll();

//	List<Review> findByWriter(Member writer);

//	List<Review> findByWriter(String writerId);
    
//    void deleteByEmail(String email); // 이메일로 리뷰 삭제 메서드
}