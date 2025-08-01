package miniproject.stellanex.persistence;

import miniproject.stellanex.domain.Member;
import miniproject.stellanex.domain.Review;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByEmail(String email);
    boolean existsByEmail(String email);

    void deleteByEmail(String email);
	
}
