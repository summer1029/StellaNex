import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { userEmail } from "../Component/AtomSt";
import { useRecoilState } from "recoil";

import movie1 from "../assets/poster/wonka.jpg";
import movie2 from "../assets/poster/gungook.jpg";
import movie3 from "../assets/poster/qukal.jpg";
import movie4 from "../assets/poster/simin.jpg";
import movie5 from "../assets/poster/sopung.jpg";
import movie6 from "../assets/poster/dogdys.jpg";
import movie7 from "../assets/poster/deadman.jpg";
import movie8 from "../assets/poster/agail.jpg";
import movie9 from "../assets/poster/shark.jpg";
import movie10 from "../assets/poster/dmz.jpg";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import StarIcon from "@mui/icons-material/Star";
import { red } from "@mui/material/colors";

import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function MovieDetail_toastfy() {
  const param = useParams().index;

  const apikey = process.env.REACT_APP_APIKEY;
  const [movie, setMovie] = useState();
  const [dbData, setDbData] = useState();
  const [dbReview, setDbReview] = useState();
  const [content, setContent] = useState();
  const [grade, setGrade] = useState();
  const [selectedReviewId, setSelectedReviewId] = useState();
  const [selectedDeleteId, setSelectedDeleteId] = useState();
  const [selectedContent, setSelectedContent] = useState();
  const [selectedGrade, setselectedGrade] = useState();
  const [userId] = useRecoilState(userEmail);
  const [sortBy, setSortBy] = useState("grade") // 정렬 기준 - Grade or Date
  const [orderBy, setOrderBy] = useState("asc") // 정렬 방식 - asc(default) or desc

  const posterImage = [
    movie1,
    movie2,
    movie3,
    movie4,
    movie5,
    movie6,
    movie7,
    movie8,
    movie9,
    movie10,
  ];

  // API에서 무비 데이터를 받아오기
  const getMovie = async (param) => {
    let url =
      "https://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?";
    url = url + `key=${apikey}`;
    url = url + "&targetDt=20240216";
    console.log(url);

    fetch(url)
      .then((resp) => resp.json())
      .then((data) => setMovie(data.boxOfficeResult.dailyBoxOfficeList[param]))
      .catch((err) => console.error(err));
  };

  // DBMovieData에서 무비 데이터를 받아오기
  const getDbMovie = (id) => {
    fetch(`http://10.125.121.181:8080/movie/${id}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => setDbData(data))
      .catch((err) => console.error(err));
  };

  // DBReview에서 리뷰 데이터를 받아오기
  const getDbReview = (movieId, type, order) => {
    fetch(`http://10.125.121.181:8080/movie/review/${movieId}?ordertype=${type}&order=${order}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => { console.log(data); return setDbReview(data) })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getMovie(param);

    const id = parseInt(param) + 1
    getDbMovie(id)
    getDbReview(id, sortBy, orderBy); // sortBy와 orderBy 값을 전달
  }, [param, sortBy, orderBy]);

  // const [rating, setRating] = useState([]);
  // const handleRating = (idx, selectedRating) => {
  //   const newRating = [...rating];
  //   newRating[idx] = selectedRating;
  //   setRating(newRating);
  // };

  const [openModify, setOpenModify] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [openInsert, setOpenInsert] = React.useState(false);

  const handleClickOpenUpdate = (e, reviewId, content, grade) => {
    setSelectedReviewId(reviewId);
    setSelectedContent(content);
    setselectedGrade(grade);
    setOpenModify(true);
  };

  const handleClickOpenDelete = (e, reviewId) => {
    setSelectedDeleteId(reviewId);
    setOpenDelete(true);
  };

  const handleClickOpenInsert = (e) => {
    setOpenInsert(true);
  };

  const handleClose = () => {
    setSelectedReviewId(null);
    setSelectedDeleteId(null);
    setOpenModify(false);
    setOpenDelete(false);
    setOpenInsert(false);
  };

  const divWriter = document.getElementById("writer");

  const getWriterId = (string) => {
    return string.substring(0, string.indexOf("@"));
  };

  const handleContent = (e) => {
    setContent(e.target.value);
  };

  const handleGrade = (e) => {
    setGrade(e.target.value);
  };

  // 리뷰 수정 fetch
  const handleUpdate = (reviewId) => {
    fetch(`http://10.125.121.181:8080/movie/review/${reviewId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("loginToken"),
      },
      body: JSON.stringify({
        content: content,
        grade: grade,
      })
    })
      .then((res) => {
        if (res.ok) {
          toastSuccess("리뷰 수정 성공")
          window.location.reload()
        } else {
          throw new Error("리뷰 수정 실패")
        }
      })
      .catch((err) => {
        console.error(err)
        toastErr('리뷰 수정 권한 에러');
      })
  };

  // 리뷰 삭제 fetch
  const handleDelete = (reviewId) => {
    fetch(`http://10.125.121.181:8080/movie/review/${reviewId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("loginToken"),
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error");
        }
        toastSuccess("리뷰 삭제 성공");
        window.location.reload();
      })
      .catch((err) => {
        console.error(err)
        toastErr('리뷰 삭제 권한 에러')
      });
  };

  // 리뷰 등록 fetch
  const handleInsert = () => {
    fetch(`http://10.125.121.181:8080/movie/review/${dbData.movie_id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("loginToken"),
      },
      body: JSON.stringify({
        content: content,
        grade: grade,
      }),
    })
      .then((res) => {
        if (res.ok) {
          toastSuccess("리뷰 등록 성공")
          window.location.reload()
        } else {
          throw new Error("리뷰 등록 실패")
        }
      })
      .catch((err) => {
        console.error(err)
        toastErr('리뷰 등록 권한 에러')
      });
  };

  const toastSuccess = (message) => {
    toast.success(message)
  }

  const toastErr = (message) => {
    toast.error(message)
  }

  // const [sortedReviews, setSortedReviews] = useState([]); // 정렬된 리뷰
  // const [sortBy, setSortBy] = useState("grade") // 정렬 기준 - Grade or Date
  // const [orderBy, setOrderBy] = useState("asc") // 정렬 방식 - asc(default) or desc

  // // sortBy에 따라 Grade or Date로 리뷰를 정렬
  // const sortReviews = (reviews) => {
  //   // sortBy(정렬 기준)이 Grade일 때
  //   if (sortBy === "grade") {
  //     return reviews.slice().sort((a, b) => a.grade - b.grade);
  //     // sortBy(정렬 기준)이 Data일 때
  //   } else if (sortBy === "date") {
  //     return reviews
  //       .slice()
  //       .sort((a, b) => new Date(a.date) - new Date(b.date));
  //   } else {
  //     return reviews;
  //   }
  // };

  // // sortBy(정렬 기준)을 변경
  // const handleSortBy = (criteria) => {
  //   setSortBy(criteria);
  // };

  // // sortBy(정렬 기준)이 변경될 때마다 리뷰를 정렬하고 정렬된 리뷰를 sortedRevies에 저장
  // useEffect(() => {
  //   setSortedReviews(sortReviews(dbReview));
  // }, [dbReview, sortBy]);

  // // orderBy 상태에 따라 sortedReviews를 오름차순 또는 내림차순으로 정렬
  // const handleSortReviews = (orderBy) => {
  //   if (orderBy === "asc") {
  //     setSortBy("grade");
  //   } else {
  //     const reversedReviews = [...sortedReviews].reverse();
  //     setSortedReviews(reversedReviews);
  //   }
  // };

  return (
    <div className="bg-black h-full w-full">
      {movie && dbReview && (
        <div>
          <div className="pl-10 pt-10 pr-10 flex">
            <img src={posterImage[param]} alt="Movie Poster" className="w-72 mb-5" />
            <div className="ml-5 mt-24">
              <div className="text-3xl font-extrabold mb-3 text-white">
                {movie.movieNm}
              </div>
              <div className="text-lg font-medium text-white">
                개봉일: {dbData.release_date}
              </div>
              <div className="text-lg font-medium text-white">
                상영시간: {dbData.running_time}
              </div>
              <div className="text-lg font-medium text-white">
                등급: {dbData.age_rating}
              </div>
              <div className="text-lg font-medium text-white">
                장르: {dbData.genre}
              </div>
              <div className="text-lg font-medium text-white">
                시놉시스: {dbData.synopsis}
              </div>
              <div className="text-lg font-medium text-white">
                감독: {dbData.director}
              </div>
              <div className="text-lg font-medium text-white">
                출연진: {dbData.casts}
              </div>
            </div>
          </div>
          <div className="flex justify-end items-center text-white mb-3 mr-12">
            {/* 리뷰 등록 모달 */}
            <React.Fragment>
              <Button variant="outlined" onClick={(e) => handleClickOpenInsert(e)}
                style={{
                  backgroundColor: red[400], // 300하면 비슷한데 음 몰라
                  fontWeight: "bold",
                  color: "white",
                  borderColor: red[400],
                  marginRight: "5px",
                }}>
                등록
              </Button>
              <Dialog open={openInsert} onClose={handleClose}>
                <DialogTitle>등록</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    등록할 내용을 작성해주세요
                  </DialogContentText>
                  <TextField
                    disabled
                    id="email"
                    label="Email"
                    defaultValue={localStorage.getItem("userId")}
                    variant="standard"
                    fullWidth
                  />
                  <TextField
                    onChange={handleContent}
                    autoFocus
                    required
                    margin="dense"
                    id="content"
                    name="content"
                    label="새로운 내용"
                    type="text"
                    fullWidth
                    variant="standard"
                  />
                  <TextField
                    onChange={handleGrade}
                    autoFocus
                    required
                    margin="dense"
                    id="grade"
                    name="grade"
                    label="새로운 등급"
                    type="number"
                    fullWidth
                    variant="standard"
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>취소</Button>
                  <Button onClick={handleInsert}>등록</Button>
                </DialogActions>
              </Dialog>
            </React.Fragment>
          </div>
          <div className="flex justify-end m-3">
            {/* 리뷰 정렬 버튼 */}
            <button
              variant="outlined"
              className="hover:underline text-white rounded-md mr-2"
              onClick={() => {
                // setSortBy(sortBy === "grade" ? "date" : "grade")
                setSortBy("grade")
                setOrderBy(orderBy === "asc" ? "desc" : "asc");
                // handleSortReviews(orderBy === "asc" ? "desc" : "asc");
              }}>
              {orderBy === "asc" ? "▼ 등급 낮은 순" : "▲ 등급 높은 순"}
            </button>
            <button
              variant="outlined"
              className="hover:underline text-white px-4 py-2 rounded-md mr-5"
              onClick={() => {
                // setSortBy(sortBy === "date" ? "grade" : "date")
                setSortBy("date")
                setOrderBy(orderBy === "asc" ? "desc" : "asc");
              }}>
              {orderBy === "asc" ? "▼ 오래된 순" : "▲ 최신 순"}
            </button>
          </div>
          <div className="pl-10 pr-10 pb-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {dbReview.map((rv, idx) => (
                <div key={idx} className="bg-gray-800 rounded-lg overflow-hidden">
                  <div className="p-4">
                    <div className="flex items-center mb-2">
                      <svg className="fill-white h-10 w-10 mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
                      </svg>
                      <div className="flex w-full content-between">
                        <div className="text-lg font-medium text-white">
                          {getWriterId(rv.writer)}
                        </div>
                      </div>
                      <div
                        className="text-2xl font-bold text-center text-white mb-2"
                        style={{ whiteSpace: "nowrap" }}>
                        {Array.from({ length: 5 }, (_, index) => (
                          <StarIcon
                            key={index}
                            sx={{ color: index < rv.grade ? "#FFD700" : "gray", fontSize: 24 }}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="text-lg font-medium text-white mb-4">
                      {rv.content}
                    </div>
                    <div className="text-lg font-medium text-white mb-2">
                      {rv.date}
                    </div>
                    <div className="flex justify-end">
                      <div className="items-center text-white mt-1">
                        {/* 리뷰 수정 모달 */}
                        <React.Fragment>
                          <Button
                            review={rv}
                            variant="outlined"
                            onClick={(e) => handleClickOpenUpdate(e, rv.review_id, rv.content, rv.grade)}
                            style={{
                              backgroundColor: red[400],
                              fontWeight: "bold",
                              color: "white",
                              borderColor: red[400],
                              marginRight: "5px",
                            }}>
                            수정
                          </Button>
                          <Dialog
                            open={openModify}
                            onClose={handleClose}>
                            <DialogTitle>수정</DialogTitle>
                            <DialogContent>
                              <DialogContentText>
                                수정할 내용을 작성해주세요
                              </DialogContentText>
                              <TextField
                                onChange={handleGrade}
                                autoFocus
                                required
                                margin="dense"
                                id="grade"
                                name="grade"
                                label="새로운 등급"
                                type="number"
                                fullWidth
                                variant="standard"
                                defaultValue={selectedGrade}
                              />
                              <TextField
                                onChange={handleContent}
                                autoFocus
                                required
                                margin="dense"
                                id="content"
                                name="content"
                                label="새로운 내용"
                                type="text"
                                fullWidth
                                variant="standard"
                                defaultValue={selectedContent}
                              />
                            </DialogContent>
                            <DialogActions>
                              <Button onClick={handleClose}>취소</Button>
                              <Button onClick={(e) => handleUpdate(selectedReviewId)}>저장</Button>
                            </DialogActions>
                          </Dialog>
                        </React.Fragment>
                      </div>
                      {/* 리뷰 삭제 모달 */}
                      <div className="items-center text-white mt-1">
                        <React.Fragment>
                          <Button
                            review={rv}
                            variant="outlined"
                            onClick={(e) => handleClickOpenDelete(e, rv.review_id)}
                            style={{
                              backgroundColor: red[400],
                              fontWeight: "bold",
                              color: "white",
                              borderColor: red[400],
                              marginRight: "5px",
                            }}>
                            삭제
                          </Button>
                          <Dialog
                            open={openDelete}
                            onClose={handleClose}
                            // aria-labelledby="alert-dialog-title"
                            // aria-describedby="alert-dialog-description"
                          >
                            <DialogTitle id="alert-dialog-title">
                              삭제
                            </DialogTitle>
                            <DialogContent>
                              <DialogContentText id="alert-dialog-description">
                                해당 리뷰를 삭제하시겠습니까?
                              </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                              <Button onClick={(e) => handleDelete(selectedDeleteId)}>
                                삭제
                              </Button>
                              <Button onClick={handleClose} autoFocus>
                                취소
                              </Button>
                            </DialogActions>
                          </Dialog>
                        </React.Fragment>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

