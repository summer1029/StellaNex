import React, { useRef } from 'react'
import useMovieData from './UseMovieData';
import { Link } from 'react-router-dom';

export default function Popular() {
    // 방법 2) API 데이터를 받아오는 useMovieData 커스텀훅을 사용하여 category와 page지정하여 데이터 사용
    const category = "popular"
    const page = 1
    const popularMovies = useMovieData(category, page);

    // // 방법 1) popular API 데이터를 직접 fetch
    // // Popular Movie List
    // const [topMovie, setTopMovie] = useState();
    // useEffect(() => {
    //     const options = {
    //         method: 'GET',
    //         headers: {
    //           accept: 'application/json',
    //           Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNGQwY2FkMGU1NDAyMzFkODQ1OTI1MjNhNzAxNzc1MyIsInN1YiI6IjY1YzA5NmVlYTM1YzhlMDE3Y2Q3ODE4YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WsPfi3MDkQ3R01A5_w0Cn43_P8_8cCQp7cRoYyylPsg'
    //         }
    //       };
    //       const endpoint = `https://api.themoviedb.org/3/movie/${category}?language=ko-KR&page=1`;

    //       fetch(endpoint, options)
    //         .then(response => response.json())
    //         .then(response => setTopMovie(response.results))
    //         .catch(err => console.error(err));
    // }, []); // 빈 배열을 전달하여 컴포넌트가 처음 렌더링될 때만 실행되도록 함

    // console.log("topMovie", topMovie)

    // slide bar
    const slideRef = useRef(null);

    const scrollLeft = () => {
        if (slideRef.current) {
            const slideWidth = slideRef.current.offsetWidth / 5
            slideRef.current.scrollLeft = slideRef.current.scrollLeft - slideWidth
        }
    }

    const scrollRight = () => {
        if (slideRef.current) {
            const slideWidth = slideRef.current.offsetWidth / 5
            slideRef.current.scrollLeft = slideRef.current.scrollLeft + slideWidth
        }
    }

    // Save popular movie data in DB
    // const sendData = () => {

    //     fetch('http://192.168.56.1:8080/saving', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json'
    //       },
    //       body: JSON.stringify(popularMovies.results) // 영화 데이터 배열을 JSON 문자열로 변환하여 전송
    //     })
    //     .then((res) => {
    //       // 서버의 DB랑 비교해서 서버에서 에러를 전달해주면
    //       if (res.ok) {
    //        console.log("Success in saving movie data")
    //       } else {
    //         alert("Failed to save movie data")
    //       }
    //     }).catch(err => console.log(err))
    //   };

    console.log("popular", popularMovies)

    return (
        <div className="flex-col w-full h-screen bg-black">
            <div className="tracking-tight ml-5 mr-5 h-1/2 bg-cover relative" 
            style={{ backgroundImage: popularMovies && popularMovies && popularMovies.results ? `url('https://image.tmdb.org/t/p/w500/${popularMovies.results[0].backdrop_path}')` : '', backgroundSize: "auto" }}>
                {popularMovies && popularMovies && popularMovies.results && (
                    <div>
                        {/* <div className='font-semibold text-3xl text-end mr-5 mt-40 tracking-tight text-white'> */}
                        <div className='font-semibold text-3xl text-end tracking-tight text-white absolute right-10 bottom-40 md:block hidden'>
                            {popularMovies.results[0].title}
                        </div>
                        {/* <div className='font-semibold text-md text-end mr-5 tracking-tight text-white mt-5 overflow-hidden'> */}
                        <div className='font-semibold text-md text-end tracking-tight text-white overflow-hidden absolute right-10 bottom-10 md:block hidden'>
                            {popularMovies.results[0].overview}
                        </div>
                    </div>
                )}
            </div>

            {/* Save popular movie data in DB */}
            {/* <button onClick={sendData} className='bg-white'>Saving data to DB</button> */}

            <div className='tracking-tight h-auto'>
                <div className='font-semibold text-lg tracking-tight text-white ml-5 mt-5'>
                    무비차트
                </div>

                <div ref={slideRef} className="flex" style={{ overflowX: "auto", whiteSpace: "nowrap", marginLeft: "26px", marginRight: "26px" }}>
                    {popularMovies && popularMovies.results && popularMovies.results.map((item, index) => (
                        // <div key={index} className="flex-shrink-0 flex flex-col items-center mr-3" style={{ width: "272px" }}>
                        //     {/* 영화 포스터 */}
                        //     <img
                        //         src={`https://image.tmdb.org/t/p/w500/${item.backdrop_path}`}
                        //         alt={`Backdrop ${index}`}
                        //         className="inline-block w-full h-52 m-2"
                        //     />
                        //     {/* 영화 제목 */}
                        //     <p className="text-white text-center mb-1">{item.title}</p>
                        // </div>

                        <Link to={`/movieInfo/${item.id}`} key={index} className="flex-shrink-0 flex flex-col items-center mr-3" style={{ width: "192px" }}> 
                            {/* 영화 포스터 */}
                            <img
                                src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                                alt={`Backdrop ${index}`}
                                className="inline-block w-48 h-52 m-2"
                            />
                            {/* 영화 제목 */}
                            <p className="text-white text-center mb-1">{item.title}</p>
                        </Link>
                    ))}
                </div>

                <div className="flex justify-center items-center pb-2">
                    <button onClick={scrollLeft} className="font-semibold text-lg tracking-tight text-white mt-2 mr-1 hover:text-red-400">◀️</button>
                    <button onClick={scrollRight} className="font-semibold text-lg tracking-tight text-white mt-2 ml-1 hover:text-red-400">▶️</button>
                </div>
            </div>
        </div>
    )
}
