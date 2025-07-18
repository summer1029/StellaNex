package miniproject.stellanex.domain;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long review_id;

    @Builder.Default
    private LocalDateTime date = LocalDateTime.now();

    @Column(nullable = false)
    private int grade;

    @Column(nullable = false, length = 100)
    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "email")
    private Member writer;
    
    @Column(nullable = false)
    private String role;
    
    @Builder.Default
    @Column(nullable = false)
    private Long love = 0L;

    @Builder.Default
    @Column(nullable = false)
    private Long hate = 0L;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "movie_id")
//    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Movie movie;
    
    // 영화 제목을 가져오는 메서드 추가
    public String getMovieTitle() {
        return movie != null ? movie.getTitle() : null; // movie가 null이 아닐 경우 제목을 반환
    }

    public void updateContent(String content) {
        this.content = content;
    }

    public void updateGrade(int grade) {
        this.grade = grade;
    }
    
    public void updateLove(Long love) {
        this.love = love;
    }
    public void updateHate(Long hate) {
    	this.hate = hate;
    }

	@Override
	public String toString() {
		return "Review [review_id=" + review_id + ", date=" + date + ", grade=" + grade + ", content=" + content
				+ ", writer=" + writer + ", role=" + role + ", love=" + love + ", hate=" + hate + ", movie=" + movie
				+ "]";
	}

	
}