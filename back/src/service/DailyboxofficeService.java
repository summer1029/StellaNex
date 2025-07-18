package miniproject.stellanex.service;

import miniproject.stellanex.domain.Dailyboxoffice;
import miniproject.stellanex.persistence.DailyBoxOfficeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DailyboxofficeService {
    private final DailyBoxOfficeRepository repository;

    @Autowired
    public DailyboxofficeService(DailyBoxOfficeRepository repository) {
        this.repository = repository;
    }

    public void saveDailyBoxOffice(Dailyboxoffice dailyBoxOffice) {
        repository.save(dailyBoxOffice);
    }

    public List<Dailyboxoffice> getAllDailyBoxOffice() {
        return repository.findAll();
    }
}
