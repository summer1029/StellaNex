package miniproject.stellanex.persistence;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import miniproject.stellanex.domain.Movie;

public interface MovieRepository extends JpaRepository<Movie, Long> {
    // 전체 영화 목록 조회 메서드
    List<Movie> findAll();
}
