import React, { useEffect, useState } from 'react'
import useMovieData from './UseMovieData';
import { Link } from 'react-router-dom';

export default function NowPlayingList() {

    // const [nowPlaying, setNowPlaying] = useState()

    // useEffect(() => {
    //     const options = {
    //         method: 'GET',
    //         headers: {
    //             accept: 'application/json',
    //             Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNGQwY2FkMGU1NDAyMzFkODQ1OTI1MjNhNzAxNzc1MyIsInN1YiI6IjY1YzA5NmVlYTM1YzhlMDE3Y2Q3ODE4YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WsPfi3MDkQ3R01A5_w0Cn43_P8_8cCQp7cRoYyylPsg'
    //         }
    //     };
    //     const endpoint = `https://api.themoviedb.org/3/movie/${category}?language=ko-KR&page=1`;

    //     fetch(endpoint, options)
    //         .then(response => response.json())
    //         .then(response => setNowPlaying(response.results))
    //         .catch(err => console.error(err));
    // }, [])

    const category = "now_playing"
    const [page, setPage] = useState(1); // 페이지 상태 추가
    // console.log("page", page)

    const nowPlaying = useMovieData(category, page); // 페이지를 useMovieData로 전달
    // console.log("nowplaying", nowPlaying)

    const handlePrevClick = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const handleNextClick = () => {
        if (page < 10) {
            setPage(page + 1);
        }
    };

    const handlePageClick = (pageNumber) => {
        setPage(pageNumber);
    };

    // Save nowplaying movie data in DB
    const sendData = () => {

        fetch('http://192.168.56.1:8080/saving', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(nowPlaying.results) // 영화 데이터 배열을 JSON 문자열로 변환하여 전송
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
        <div className='flex-col w-full bg-black'>
            <div className='text-center text-3xl font-appleB font-extrabold text-red-400'>Now Playing</div>
            <div className='text-end text-lg font-appleL font-extrabold text-red-300 mr-8'>
                {nowPlaying && nowPlaying.dates &&
                    <div>{nowPlaying.dates.minimum} ~ {nowPlaying.dates.maximum}</div>
                }
            </div>

            {/* Save nowplaying movie data in DB */}
            {/* <button onClick={sendData} className='bg-white'>Saving data to DB</button> */}

            <div className="flex flex-wrap justify-center items-center mb-5">
                {nowPlaying && nowPlaying.results && nowPlaying.results.map((item, index) => (
                    // <div className="flex-col justify-center items-center">
                    //     <img
                    //         src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                    //         alt={`Backdrop ${index}`}
                    //         className="inline-block h-60 w-56 mb-2 p-2"
                    //     />
                    //     <div className="overflow-hidden whitespace-nowrap text-ellipsis w-56 text-center text-white">{item.title}</div>
                    // </div>
                    <Link to = {`/movieInfo/${item.id}`} key={index} className="flex-col justify-center items-center">
                    <img
                        src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                        alt={`Poster ${index}`}
                        className="inline-block h-60 w-56 mb-2 p-2"
                    />
                    <div className="overflow-hidden whitespace-nowrap text-ellipsis w-56 text-center text-white">{item.title}</div>
                </Link>
                    
                ))}
            </div>

            <div className='flex justify-center items-center'>
                <ul className="flex items-center -space-x-px h-8 text-sm">
                    <li>
                        <button onClick={handlePrevClick} className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            Previous
                        </button>
                    </li>
                    {Array.from({ length: 10 }, (_, i) => (
                        <li key={i}>
                            <button onClick={() => handlePageClick(i + 1)} className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${page === i + 1 ? 'bg-red-50 text-red-600' : ''}`}>
                                {i + 1}
                            </button>
                        </li>
                    ))}
                    <li>
                        <button onClick={handleNextClick} className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            Next
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    )
}
