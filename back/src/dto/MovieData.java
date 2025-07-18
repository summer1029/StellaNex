package miniproject.stellanex.dto;

import java.util.Arrays;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class MovieData {
	
	private boolean adult;
	private String backdrop_path;
	private String genre_ids[];
	private long id;
	private String original_language;
	private String overview;
	private double popularity;
	private String poster_path;
	private String release_date;
	private String title;
	private boolean video;
	private double vote_average;
	private long vote_count;
	
	@Override
	public String toString() {
		return "MovieData [adult=" + adult + ", backdrop_path=" + backdrop_path + ", genre_ids="
				+ Arrays.toString(genre_ids) + ", id=" + id + ", original_language=" + original_language + ", overview="
				+ overview + ", popularity=" + popularity + ", poster_path=" + poster_path + ", release_date="
				+ release_date + ", title=" + title + ", video=" + video + ", vote_average=" + vote_average
				+ ", vote_count=" + vote_count + "]";
	}
}
