package miniproject.stellanex.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@AllArgsConstructor
@Builder
@Getter
public class MovieInputRequest {
    private String title;
    private LocalDate release_date;
    private String running_time;
    private String age_rating;
    private String genre;
    private String synopsis;
    private String director;
    private String casts;
}
