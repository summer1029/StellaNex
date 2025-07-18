package miniproject.stellanex.controller;

import miniproject.stellanex.domain.Dailyboxoffice;
import miniproject.stellanex.service.DailyboxofficeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class DailyboxofficeController {
    private final DailyboxofficeService dailyBoxOfficeService;

    @Autowired
    public DailyboxofficeController(DailyboxofficeService dailyBoxOfficeService) {
        this.dailyBoxOfficeService = dailyBoxOfficeService;
    }

    @PostMapping("/dailyboxoffice")
    public ResponseEntity<String> createDailyBoxOffice(@RequestBody Dailyboxoffice dailyBoxOffice) {
        dailyBoxOfficeService.saveDailyBoxOffice(dailyBoxOffice);
        return new ResponseEntity<>("Daily Box Office data saved successfully", HttpStatus.CREATED);
    }

    @GetMapping("/dailyboxoffice")
    public ResponseEntity<List<Dailyboxoffice>> getAllDailyBoxOffice() {
        List<Dailyboxoffice> dailyBoxOfficeList = dailyBoxOfficeService.getAllDailyBoxOffice();
        return new ResponseEntity<>(dailyBoxOfficeList, HttpStatus.OK);
    }
}