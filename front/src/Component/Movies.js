import React from 'react'
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function Movies() {
  
  const [movies, setMovies] = useState()

  const [page, setPage] = useState(1)
  const visiblePages = 10 // 페이지네이션에 보일 페이지 수
  const totalPages = 20 // 총 페이지 수
  const leftBound = Math.max(1, page - Math.floor(visiblePages / 2))
  const rightBound = Math.min(totalPages, leftBound + visiblePages - 1)

  const sortBy = "popularity.desc"
  // const sortBy = ["original_title.asc", "original_title.desc", "popularity.asc", "popularity.desc", "revenue.asc", "revenue.desc", "primary_release_date.asc", "title.asc", "title.desc", "vote_average.asc", "vote_average.desc", "vote_count.asc", "voe_count.desc"]

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNGQwY2FkMGU1NDAyMzFkODQ1OTI1MjNhNzAxNzc1MyIsInN1YiI6IjY1YzA5NmVlYTM1YzhlMDE3Y2Q3ODE4YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WsPfi3MDkQ3R01A5_w0Cn43_P8_8cCQp7cRoYyylPsg'
      }
    };
    
    fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=ko-KR&page=${page}&sort_by=${sortBy}`, options)
      .then(response => response.json())
      .then(response => setMovies(response.results))
      .catch(err => console.error(err));
  }, [page]) // page가 변할때 마다 재랜더링

  console.log("Movies", movies)

  // Save movies data in DB
  const sendData = () => {

    fetch('http://192.168.56.1:8080/saving', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(movies) // 영화 데이터 배열을 JSON 문자열로 변환하여 전송
    })
    .then((res) => {
      // 서버의 DB랑 비교해서 서버에서 에러를 전달해주면
      if (res.ok) {
       console.log("Success in saving movie data")
      } else {
        alert("Failed to save movie data")
      }
    }).catch(err => console.log(err))
  };

  return (
    <div className='flex-col w-full h-full bg-black'>
      <div className='text-center text-3xl font-appleB font-extrabold text-red-400'>Movie</div>

      {/* Save movies data in DB */}
      <button onClick={sendData} className='flex w-full justify-center items-center bg-slate-600 p-1 rounded-sm'>Saving data to DB</button>
      
      <div className="flex flex-wrap justify-center items-center mb-5">
        {movies && movies.map((item, index) => (
          <Link to={`/movieInfo/${item.id}`} key={index} className="flex-col justify-center items-center">
            <img
              src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
              alt={`Poster ${index}`}
              className="inline-block h-60 w-52 mb-2 m-2"
            />
            <div style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', width: '208px', textAlign: 'center', color: "white" }}>{item.title}</div>
          </Link>
        ))}
      </div>

      <div className='flex justify-center items-center'>
        <ul className="flex items-center -space-x-px h-8 text-sm">
          <li>
            <button onClick={() => setPage(page - 1)} disabled={page === 1} className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              Previous
            </button>
          </li>
          {Array.from({ length: rightBound - leftBound + 1 }, (_, i) => (
            <li key={leftBound + i}>
              <button onClick={() => setPage(leftBound + i)} className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${page === leftBound + i ? 'bg-red-50 text-red-600' : ''}`}>
                {leftBound + i}
              </button>
            </li>
          ))}
          <li>
            <button onClick={() => setPage(page + 1)} disabled={page === 20} className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              Next
            </button>
          </li>
        </ul>
      </div>
    </div>
  )
}

