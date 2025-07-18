package miniproject.stellanex.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReviewAllResponse {
		private Long review_id; // 리뷰 ID
	    private String content; // 리뷰 내용
	    private Double grade; // 평점
	    private Long movieId; // 연결된 영화 ID
	    private String email;
	    // 추가적으로 영화 정보가 필요하면 아래와 같이 포함할 수 있습니다.
	    private String movieTitle; // 영화 제목
	    // 필요에 따라 다른 영화 정보도 추가
}


