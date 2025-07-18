package miniproject.stellanex.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
public class Movie {
    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long movie_id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    @JsonFormat(pattern = "yyyy-MM-dd")
//    private LocalDate release_date;
    private String release_date;
    
    @Column(nullable = false, length = 5000)
    private String synopsis;

    @Column(nullable = false)
    private boolean adult;
    
    @Column(nullable = false)
    private double popularity;
    
    @Column(nullable = false)
    private String poster_path;
    
    @Column(nullable = true)
    private String backdrop_path;
    
 // 양방향 관계 설정 및 순환 참조 방지 설정
    @OneToMany(mappedBy = "movie", fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<Review> reviews;
    
    @Override
    public String toString() {
        return "Movie{" +
               "movie_id=" + movie_id +
               ", title='" + title + '\'' +
               ", release_date=" + release_date +
               '}';
    }

}
