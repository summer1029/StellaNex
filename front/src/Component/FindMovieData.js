import { useState, useEffect } from 'react';

const FindMovieData = (id) => {
    const [info, setInfo] = useState([]);
  
    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNGQwY2FkMGU1NDAyMzFkODQ1OTI1MjNhNzAxNzc1MyIsInN1YiI6IjY1YzA5NmVlYTM1YzhlMDE3Y2Q3ODE4YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WsPfi3MDkQ3R01A5_w0Cn43_P8_8cCQp7cRoYyylPsg'
            }
          };
          const endpoint = `https://api.themoviedb.org/3/movie/${id}?language=ko-KR`;
          
          fetch(endpoint, options)
            .then(response => response.json())
            .then(response => setInfo(response))
            .catch(err => console.error(err));
      }, []); 
  
    return info;
  };
export default FindMovieData;


  