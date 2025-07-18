import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Nav from "../UI/Nav";
import YouTube from "react-youtube";
import LikeDislikeFunc from "./LikeDislikeFunc";
import FindMovieData from "./FindMovieData";

import StarIcon from "@mui/icons-material/Star";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { red } from "@mui/material/colors";

export default function MovieInfo() {

  const param = useParams().index;
  console.log("Movie id : ", param)

  const id = param
  const movieInfo = FindMovieData(id);

  console.log("Movie info : ", movieInfo)

  const [dbReview, setDbReview] = useState([]);
  const [content, setContent] = useState();
  const [grade, setGrade] = useState();
  const [selectedReviewId, setSelectedReviewId] = useState();
  const [selectedDeleteId, setSelectedDeleteId] = useState();
  const [selectedContent, setSelectedContent] = useState();
  const [selectedGrade, setselectedGrade] = useState();
  // const [sortBy, setSortBy] = useState("grade") // 정렬 기준 - Grade or Date 
  // const [orderBy, setOrderBy] = useState("asc") // 정렬 방식 -asc(default) or desc 
  const [sortBy, setSortBy] = useState("date") // 정렬 기준 - Grade or Date 
  const [orderBy, setOrderBy] = useState("desc") // 정렬 방식 -asc(default) or desc 
  const [filteredReviews, setFilteredReviews] = useState([]); // 필터링된 리뷰 목록
  const [role, setRole] = useState(''); // 현재 역할
  const [useFiltered, setUseFiltered] = useState(false);
  const [video, setVideo] = useState(null);

  // 리뷰 DB에서 리뷰 정보 받아오기
  const getDbReview = (id, sortby, orderby) => {

    fetch(`http://192.168.56.1:8080/movie/review/${id}?ordertype=${sortby}&order=${orderby}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => { console.log("리뷰 데이터: ", data); return setDbReview(data) })
      .catch((err) => console.error(err));
  };

  // MovieId로 트레일러 key값 구하는 함수
  const fetchMovieVideos = (param) => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNGQwY2FkMGU1NDAyMzFkODQ1OTI1MjNhNzAxNzc1MyIsIm5iZiI6MTcyOTU3MDc4My4xMjYwMDUsInN1YiI6IjY1YzA5NmVlYTM1YzhlMDE3Y2Q3ODE4YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bwFICUfD2bOgphuXUFyDwFlz7FV9Hqp5LUIdQVWfa4A'
      }
    };

    fetch(`https://api.themoviedb.org/3/movie/${param}/videos?&language=en-US`, options)
      .then(res => res.json())
      // data를 setVideo로 업데이트
      .then((data) => {
        console.log("이거 뭐나오는데", data.results[0]?.key)
        const videoKey = data.results[0]?.key; // 첫 번째 영상의 key 값 가져오기
        setVideo(videoKey); // videoId 업데이트
      })
      .catch(err => console.error(err));
  };

  // 페이지가 로드될 때 param으로 영상 데이터 가져오기
  useEffect(() => {
    fetchMovieVideos(param);
  }, [param]);

  useEffect(() => {
    getDbReview(id, sortBy, orderBy); // sortBy와 orderBy 값을 전달
  }, [id, sortBy, orderBy]);

  useEffect(() => {
    if (dbReview) {
      handleSortReviews(dbReview, sortBy, orderBy);
      setUseFiltered(false)
    }
  }, [dbReview, sortBy, orderBy]);

  const filterReviewsByRole = (selectedRole) => {
    setRole(selectedRole);
    const newFilteredReviews = dbReview.filter(review => review.role === selectedRole);
    setFilteredReviews(newFilteredReviews);
    setUseFiltered(true)
  };

  // 클라이언트 측에서 리뷰를 정렬하는 함수
  // const handleSortReviews = (reviews, sortBy, orderBy) => {

  //   return reviews.sort((a, b) => {

  //     if (sortBy === "grade") {
  //       if (a.grade === b.grade) {
  //         // 평점이 같으면 날짜순으로 정렬
  //         return orderBy === "asc" ? new Date(a.date) - new Date(b.date) : new Date(b.date) - new Date(a.date);
  //       }
  //       // 평점으로 정렬
  //       return orderBy === "asc" ? a.grade - b.grade : b.grade - a.grade;
  //     } else {
  //       // 날짜순으로 정렬
  //       return orderBy === "asc" ? new Date(a.date) - new Date(b.date) : new Date(b.date) - new Date(a.date);
  //     }
  //   });
  // };

  // const handleSortReviews = (reviews, sortBy, orderBy) => {
  //   console.log("Before sort:", reviews);  // 추가: 정렬 전 상태 확인

  //   return reviews.sort((a, b) => {
  //     const dateA = new Date(a.date);
  //     const dateB = new Date(b.date);

  //     console.log("dateA:", dateA, "dateB:", dateB);  // 추가: 비교되는 날짜 확인

  //     if (sortBy === "grade") {
  //       if (a.grade === b.grade) {
  //         // 평점이 같으면 날짜순으로 정렬
  //         return orderBy === "asc" ? dateA - dateB : dateB - dateA;
  //       }
  //       // 평점으로 정렬
  //       return orderBy === "asc" ? a.grade - b.grade : b.grade - a.grade;
  //     } else {
  //       // 날짜순으로 정렬
  //       return orderBy === "desc" ? dateB - dateA : dateA - dateB;
  //     }
  //   });
  // };

  const handleSortReviews = (reviews, sortBy, orderBy) => {
    console.log("Before sort:", reviews);  // 추가: 정렬 전 상태 확인

    // 리뷰 배열을 복사하여 새로운 배열 생성
    const sortedReviews = [...reviews];

    // 복사한 배열을 정렬
    sortedReviews.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);

      if (sortBy === "grade") {
        if (a.grade === b.grade) {
          return orderBy === "asc" ? dateA - dateB : dateB - dateA;
        }
        return orderBy === "asc" ? a.grade - b.grade : b.grade - a.grade;
      } else {
        return orderBy === "desc" ? dateB - dateA : dateA - dateB;
      }
    });
    return sortedReviews
  };

  // 작성자 이메일을 받아와서 이름 분리
  const getWriterId = (string) => {
    return string.substring(0, string.indexOf("@"));
  };

  // 리뷰 내용 받아오기
  const handleContent = (e) => {
    setContent(e.target.value);
  };

  // 리뷰 별점 받아오기
  const handleGrade = (e) => {
    // setGrade(e.target.value);

    const value = Number(e.target.value);
    if (value > 5) {
      toastErr("등급은 5를 초과할 수 없습니다."); // 오류 메시지 출력
      setGrade(5); // 5로 설정
    } else {
      setGrade(value);
    }

  };

  // toast 설정
  const toastSuccess = (message) => {
    toast.success(message)
  }

  const toastErr = (message) => {
    toast.error(message)
  }

  // 리뷰 등록 fetch
  const handleInsert = () => {

    // grade나 content가 비어 있는지 확인
    if (!content || !grade) {
      toastErr("리뷰 내용을 모두 입력해주세요."); // 오류 메시지 출력
      return; // 함수 종료
    }

    fetch(`http://192.168.56.1:8080/movie/review/${id}`, {

      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("loginToken"),
      },
      body: JSON.stringify({
        content: content,
        grade: grade,
        role: localStorage.getItem("userRole")
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

  // 리뷰 수정 fetch
  const handleUpdate = (reviewId) => {
    fetch(`http://192.168.56.1:8080/movie/review/${reviewId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("loginToken"),
      },
      body: JSON.stringify({
        content: content !== undefined ? content : selectedContent, // 새로운 내용이 있을 경우 사용
        grade: grade !== undefined ? grade : selectedGrade, // 새로운 등급이 있을 경우 사용
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
    fetch(`http://192.168.56.1:8080/movie/review/${reviewId}`, {
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}.${month}.${day} ${hours}:${minutes}`;
  };

  return (
    <div className="bg-black h-full w-full">
      <Nav />
      {movieInfo && (
        <div>
          <div className="flex-col">
            <div className="flex justify-center w-full">
              <div className="relative w-full" style={{ paddingTop: '56.25%' }}> {/* 16:9 비율 유지 */}
                <iframe
                  src={`https://www.youtube.com/embed/${video}`}
                  className="absolute top-0 left-0 w-full h-full p-3"
                  style={{ border: 'none', objectFit: 'cover' }} // 테두리 제거 및 비율 조정
                  allowFullScreen
                />
              </div>
            </div>

            <div className="p-10 flex">
              <img
                src={`https://image.tmdb.org/t/p/w500/${movieInfo.backdrop_path}`}
                className="w-full mb-10"
              />
              {/* <img src={posterImage[param]} alt="Movie Poster" className="w-72 mb-5" /> */}
              <div className="ml-5">
                <div className="text-3xl font-extrabold mb-3 text-white">
                  {movieInfo.title}
                </div>
                <div className="text-2xl font-extrabold mb-3 text-white">
                  {movieInfo.original_title}
                </div>
                <div className="text-xl font-extrabold mb-3 text-white">
                  {movieInfo.tagline}
                </div>
                <div className="text-lg font-medium text-white">
                  개봉일 | {movieInfo.release_date}
                </div>
                <div className="text-lg font-medium text-white">
                  상영시간 | {movieInfo.runtime}분
                </div>
                <div className="text-lg font-medium text-white">
                  부적절 등급 | {movieInfo.adult ? "청소년 관람 불가" : "청소년 관람 가능"}
                </div>
                <div className="text-lg font-medium text-white">
                  장르 | {movieInfo.genres && movieInfo.genres.map(genre => genre.name).join(', ')}
                </div>
                <div className="flex justify-between items-start text-lg font-medium text-white">
                  <div className="inline-block w-auto lg:min-w-22">시놉시스 | </div>
                  <div className="w-full">{movieInfo.overview}</div>
                </div>
                <div className="text-lg font-medium text-white">
                  관람객 | {movieInfo.popularity}명
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

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

      <div className="flex justify-between items-center text-white">
        <div className="flex justify-start m-3 pl-8">

          <button
            variant="outlined"
            className="hover:underline text-white rounded-md mr-2"
            onClick={() => { filterReviewsByRole('critic') }}>
            평론가
          </button>

          <button
            variant="outlined"
            className="hover:underline text-white px-4 py-2 rounded-md mr-5"
            onClick={() => { filterReviewsByRole('user') }}>
            네티즌
          </button>
        </div>

        <div className="flex justify-end m-3">

          <button
            variant="outlined"
            className="hover:underline text-white rounded-md mr-2"
            onClick={() => {
              if (sortBy === "grade") {
                setOrderBy(orderBy === "asc" ? "desc" : "asc");
              } else {
                setSortBy("grade");
                setOrderBy("asc");
              }
            }}>
            {sortBy === "grade" && orderBy === "asc" ? "▲ 평점 높은 순" : "▼ 평점 낮은 순"}
          </button>

          <button
            variant="outlined"
            className="hover:underline text-white px-4 py-2 rounded-md mr-5"
            onClick={() => {
              if (sortBy === "date") {
                setOrderBy(orderBy === "asc" ? "desc" : "asc");
              } else {
                setSortBy("date");
                setOrderBy("asc");
              }
            }}>
            {sortBy === "date" && orderBy === "asc" ? "▲ 최신 순" : "▼ 오래된 순"}
          </button>
        </div>
      </div>
      <div className="pl-10 pr-10 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {/* {(useFiltered ? filteredReviews : dbReview).map((rv, idx) => (  */}
          {/* {(filteredReviews && filteredReviews).map((rv, idx) => ( */}
          {/* {dbReview && dbReview.map((rv, idx) => (           */}
          {(useFiltered ? filteredReviews : dbReview).map((rv, idx) => (
            <div key={idx} className="bg-gray-800 rounded-lg overflow-hidden">
              <div className="p-4">
                <div className="flex items-center mb-2">
                  <svg className="fill-white h-10 w-10 mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
                  </svg>
                  <div className="flex w-full content-between">
                    <Link
                      to={{
                        pathname: `/User/${rv.writer}`
                      }}
                      className="text-lg font-medium text-white"
                    >
                      {getWriterId(rv.writer)}
                    </Link>

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
                  {/* {rv.date} */}
                  {formatDate(rv.date)}
                </div>

                <div className="flex justify-end items-center m-2">
                  <LikeDislikeFunc reviewId={rv.review_id} love={rv.love} hate={rv.hate} />
                </div>


                <div className="flex justify-between">
                  <div className="flex">
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
                          aria-labelledby="alert-dialog-title"
                          aria-describedby="alert-dialog-description"
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}