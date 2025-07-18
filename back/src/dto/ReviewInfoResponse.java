package miniproject.stellanex.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ReviewInfoResponse {
    private Long review_id;
    private String date;
    private int grade;
    private String content;
    private String writer;
    private String role;
    private long love;
    private long hate;
	@Override
	public String toString() {
		return "ReviewInfoResponse [review_id=" + review_id + ", date=" + date + ", grade=" + grade + ", content="
				+ content + ", writer=" + writer + ", role=" + role + ", love=" + love + ", hate=" + hate + "]";
	}

}
