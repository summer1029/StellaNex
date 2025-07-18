package miniproject.stellanex.service;

import miniproject.stellanex.domain.Member;
import miniproject.stellanex.persistence.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceEX implements UserDetailsService {

    @Autowired
    private MemberRepository memberRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return memberRepository.findByEmail(email)
                .map(this::createUserDetails)
                .orElseThrow(() -> new UsernameNotFoundException("NOT FOUND!"));
    }

    private UserDetails createUserDetails(Member member) {
        return User.builder()
                .username(member.getEmail())
                .password(member.getPassword())
                .build();
    }
}
