package miniproject.stellanex.dto;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Reviewdto {
    private Long review_id;
    private LocalDateTime date;
    private int grade;
    private String content;
    private String role;
    private Long love;
    private Long hate;
    private String email;
    private Long movie_id; // 영화 ID만 포함
    private String movieTitle; // 영화 제목 추가

}
