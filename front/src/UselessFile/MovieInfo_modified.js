import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import FindMovieData from "../Component/FindMovieData";
import StarIcon from "@mui/icons-material/Star";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { red } from "@mui/material/colors";

import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function MovieInfo_modified() {

  const param = useParams().index;
  console.log("Movie id : ", param)

  const id = param
  const movieInfo = FindMovieData(id);

  console.log("Movie info : ", movieInfo)


  const [dbReview, setDbReview] = useState();
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

  // 리뷰 DB에서 리뷰 정보 받아오기
  const getDbReview = (id, sortby, orderby) => {

    fetch(`http://192.168.56.1:8080/movie/review/${id}?ordertype=${sortby}&order=${orderby}`, {
      // http://192.168.56.1:8080/movie/review/823464?ordertype=asc&order=grade
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => { console.log("리뷰 데이터: ", data); return setDbReview(data) })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getDbReview(id, sortBy, orderBy); // sortBy와 orderBy 값을 전달
  }, [id, sortBy, orderBy]);

  // 작성자 이메일을 받아와서 이름 분리
  const divWriter = document.getElementById("writer");

  const getWriterId = (string) => {
    return string.substring(0, string.indexOf("@"));
  };

  // 리뷰 내용 받아오기
  const handleContent = (e) => {
    setContent(e.target.value);
  };

  // 리뷰 별점 받아오기
  const handleGrade = (e) => {
    setGrade(e.target.value);
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
    fetch(`http://192.168.56.1:8080/movie/review/${id}`, {
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

  // 리뷰 수정 fetch
  const handleUpdate = (reviewId) => {
    fetch(`http://192.168.56.1:8080/movie/review/${reviewId}`, {
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

  return (
    <div className="bg-black h-full w-full">
      {movieInfo && (
        <div>
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
                개봉일: {movieInfo.release_date}
              </div>
              <div className="text-lg font-medium text-white">
                상영시간: {movieInfo.runtime}분
              </div>
              <div className="text-lg font-medium text-white">
                부적절 등급: {movieInfo.adult ? "청소년 관람 불가" : "청소년 관람 가능"}
              </div>
              <div className="text-lg font-medium text-white">
                장르: {movieInfo.genres && movieInfo.genres.map(genre => genre.name).join(', ')}
              </div>
              {/* <div className="text-lg font-medium text-white">
                시리즈: {movieInfo.belongs_to_collection.name}
              </div> */}
              <div className="flex justify-start items-start text-lg font-medium text-white">
                <span className="inline-block w-auto lg:min-w-20">시놉시스:</span>
                <div className="ml-1 w-full">{movieInfo.overview}</div>
              </div>
              {/* <div className="text-lg font-medium text-white">
                제공사: {movieInfo.production_companies[0].name}
              </div> */}
              <div className="text-lg font-medium text-white">
                관람객: {movieInfo.popularity}명
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

      <div className="flex justify-end items-center text-white mb-3 mr-12">
  <div className="mr-2 text-lg font-medium">정렬 기준:</div>
  <select
    value={sortBy}
    onChange={(e) => setSortBy(e.target.value)}
    className="mr-2 text-black"
  >
    <option value="date">날짜</option>
    <option value="grade">별점</option>
  </select>

  <div className="mr-2 text-lg font-medium">정렬 방식:</div>
  <select
    value={orderBy}
    onChange={(e) => setOrderBy(e.target.value)}
    className="text-black"
  >
    <option value="desc">내림차순</option>
    <option value="asc">오름차순</option>
  </select>
</div>


      <div className="pl-10 pr-10 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {dbReview && dbReview.map((rv, idx) => (
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
          ))}
        </div>
      </div>


    </div>
  );
}