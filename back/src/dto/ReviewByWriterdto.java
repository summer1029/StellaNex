package miniproject.stellanex.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReviewByWriterdto {
	private Long movie_id;
	private String content;
	private int grade;
	private String writer;
	@Override
	public String toString() {
		return "ReviewByWriterdto [movie_id=" + movie_id + ", content=" + content + ", grade=" + grade + ", writer="
				+ writer + "]";
	}
	
}
