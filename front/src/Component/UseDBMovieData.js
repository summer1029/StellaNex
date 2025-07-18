import { useState, useEffect } from 'react';

const useDBMovieData = (id) => {
    const [dbData, setDbData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getDbMovie = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(`http://192.168.56.1:8080/movie/${id}`, {
                    method: 'GET',
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch movie data');
                }
                const data = await response.json();
                setDbData(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        getDbMovie();
    }, [id]); // id가 변할 때마다 호출

    return { dbData, loading, error };
};

export default useDBMovieData;
