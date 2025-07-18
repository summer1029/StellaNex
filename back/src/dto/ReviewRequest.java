package miniproject.stellanex.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
public class ReviewRequest {
    private int grade;
    private String content;
    private Long movie_id;
    private Long review_id;
    private String date;
    private String writer;
    private String role;
    private Long love;
    private Long hate;

    public Long getMovieId() {
        return movie_id;
    }

	@Override
	public String toString() {
		return "ReviewRequest [grade=" + grade + ", content=" + content + ", movie_id=" + movie_id + ", review_id="
				+ review_id + ", date=" + date + ", writer=" + writer + ", role=" + role + "]";
	}
    
}