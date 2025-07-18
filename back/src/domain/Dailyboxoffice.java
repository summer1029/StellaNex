package miniproject.stellanex.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity(name = "Dailyboxoffice")
public class Dailyboxoffice {
    @Setter
    @Getter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private int rank;
    @Column(nullable = false)
    private int rankInten;
    @Column(nullable = false)
    private String rankOldAndNew;
    @Column(nullable = false)
    private String movieCd;
    @Column(nullable = false)
    private String movieNm;
    @Column(nullable = false)
    private Date openDt;
    @Column(nullable = false)
    private long salesAmt;
    @Column(nullable = false)
    private double salesShare;
    @Column(nullable = false)
    private long salesInten;
    @Column(nullable = false)
    private double salesChange;
    @Column(nullable = false)
    private long salesAcc;
    @Column(nullable = false)
    private int audiCnt;
    @Column(nullable = false)
    private int audiInten;
    @Column(nullable = false)
    private double audiChange;
    @Column(nullable = false)
    private int audiAcc;
    @Column(nullable = false)
    private int scrnCnt;
    @Column(nullable = false)
    private int showCnt;

    // Getter and Setter methods
    public int getRank() {
        return rank;
    }

    public void setRank(int rank) {
        this.rank = rank;
    }

    public int getRankInten() {
        return rankInten;
    }

    public void setRankInten(int rankInten) {
        this.rankInten = rankInten;
    }

    public String getRankOldAndNew() {
        return rankOldAndNew;
    }

    public void setRankOldAndNew(String rankOldAndNew) {
        this.rankOldAndNew = rankOldAndNew;
    }

    public String getMovieCd() {
        return movieCd;
    }

    public void setMovieCd(String movieCd) {
        this.movieCd = movieCd;
    }

    public String getMovieNm() {
        return movieNm;
    }

    public void setMovieNm(String movieNm) {
        this.movieNm = movieNm;
    }

    public Date getOpenDt() {
        return openDt;
    }

    public void setOpenDt(Date openDt) {
        this.openDt = openDt;
    }

    public long getSalesAmt() {
        return salesAmt;
    }

    public void setSalesAmt(long salesAmt) {
        this.salesAmt = salesAmt;
    }

    public double getSalesShare() {
        return salesShare;
    }

    public void setSalesShare(double salesShare) {
        this.salesShare = salesShare;
    }

    public long getSalesInten() {
        return salesInten;
    }

    public void setSalesInten(long salesInten) {
        this.salesInten = salesInten;
    }

    public double getSalesChange() {
        return salesChange;
    }

    public void setSalesChange(double salesChange) {
        this.salesChange = salesChange;
    }

    public long getSalesAcc() {
        return salesAcc;
    }

    public void setSalesAcc(long salesAcc) {
        this.salesAcc = salesAcc;
    }

    public int getAudiCnt() {
        return audiCnt;
    }

    public void setAudiCnt(int audiCnt) {
        this.audiCnt = audiCnt;
    }

    public int getAudiInten() {
        return audiInten;
    }

    public void setAudiInten(int audiInten) {
        this.audiInten = audiInten;
    }

    public double getAudiChange() {
        return audiChange;
    }

    public void setAudiChange(double audiChange) {
        this.audiChange = audiChange;
    }

    public int getAudiAcc() {
        return audiAcc;
    }

    public void setAudiAcc(int audiAcc) {
        this.audiAcc = audiAcc;
    }

    public int getScrnCnt() {
        return scrnCnt;
    }

    public void setScrnCnt(int scrnCnt) {
        this.scrnCnt = scrnCnt;
    }

    public int getShowCnt() {
        return showCnt;
    }

    public void setShowCnt(int showCnt) {
        this.showCnt = showCnt;
    }
}