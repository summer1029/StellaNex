package miniproject.stellanex.persistence;

import miniproject.stellanex.domain.Dailyboxoffice;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DailyBoxOfficeRepository extends JpaRepository<Dailyboxoffice, Long> {
}
