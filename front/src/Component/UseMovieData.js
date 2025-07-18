import { useState, useEffect } from 'react';

const useMovieData = (category, page) => {
    const [movies, setMovies] = useState([]);
  
    // 2. fetch 해온 response에 바로 접근
    useEffect(() => {
          const options = {
              method: 'GET',
              headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNGQwY2FkMGU1NDAyMzFkODQ1OTI1MjNhNzAxNzc1MyIsInN1YiI6IjY1YzA5NmVlYTM1YzhlMDE3Y2Q3ODE4YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WsPfi3MDkQ3R01A5_w0Cn43_P8_8cCQp7cRoYyylPsg'
              }
            };
            const endpoint = `https://api.themoviedb.org/3/movie/${category}?language=ko-KR&page=${page}`;
            
            fetch(endpoint, options)
              .then(response => response.json())
              .then(response => setMovies(response))
              .catch(err => console.error(err));
      }, [page]); // page가 변할때 마다 재랜더링 하도록 한다
  
    return movies;
  };

// const useMovieData = (category, page) => {
//   const [movies, setMovies] = useState([]);

// 1. fetch 해온 response의 results에 바로 접근
//   useEffect(() => {
//         const options = {
//             method: 'GET',
//             headers: {
//               accept: 'application/json',
//               Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNGQwY2FkMGU1NDAyMzFkODQ1OTI1MjNhNzAxNzc1MyIsInN1YiI6IjY1YzA5NmVlYTM1YzhlMDE3Y2Q3ODE4YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WsPfi3MDkQ3R01A5_w0Cn43_P8_8cCQp7cRoYyylPsg'
//             }
//           };
//           const endpoint = `https://api.themoviedb.org/3/movie/${category}?language=ko-KR&page=${page}`;
          
//           fetch(endpoint, options)
//             .then(response => response.json())
//             .then(response => setMovies(response.results))
//             .catch(err => console.error(err));
//     }, [page]); // page가 변할때 마다 재랜더링 하도록 한다

//   return movies;
// };

export default useMovieData;
