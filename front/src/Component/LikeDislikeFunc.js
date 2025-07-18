import { FlareSharp } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';

export default function LikeDislikeFunc({ reviewId, love, hate }) {

    const [like, setLike] = useState(love);
    const [dislike, setDislike] = useState(hate);
    const [isLiked, setIsLiked] = useState(false);
    const [isDisliked, setIsDisliked] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가

    // props가 변경될 때마다 상태를 업데이트
    useEffect(() => {
        setLike(love);
        setDislike(hate);
    }, [love, hate]);

    useEffect(() => {
        console.log("상태 값: 좋아요 ", isLiked, ", 싫어요 ", isDisliked)
        console.log("좋아요", like, "싫어요", dislike)
    }, [isLiked, isDisliked ])
   
    const handleLike = async () => {
        if (isLoading) return;
    
        setIsLoading(true);
        try {
            if (!isLiked) {
                // 좋아요 클릭
                setLike((prev) => prev + 1);
                setIsLiked(true);
                
                if (isDisliked) {
                    // 싫어요가 눌린 상태에서 좋아요 클릭 시
                    setDislike((prev) => prev - 1);
                    setIsDisliked(false);
                    await fetchHateUpdate(-1);
                }
    
                await fetchLoveUpdate(1); // 서버에 좋아요 추가 요청
    
            } else {
                // 이미 눌린 좋아요 취소
                setLike((prev) => prev - 1);
                setIsLiked(false);
                await fetchLoveUpdate(-1); // 서버에 좋아요 취소 요청
            }
        } catch (error) {
            console.error('좋아요 요청 오류:', error);
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleDislike = async () => {
        if (isLoading) return;
    
        setIsLoading(true);
        try {
            if (!isDisliked) {
                // 싫어요 클릭
                setDislike((prev) => prev + 1);
                setIsDisliked(true);
                
                if (isLiked) {
                    // 좋아요가 눌린 상태에서 싫어요 클릭 시
                    setLike((prev) => prev - 1);
                    setIsLiked(false);
                    await fetchLoveUpdate(-1);
                }
    
                await fetchHateUpdate(1); // 서버에 싫어요 추가 요청
    
            } else {
                // 이미 눌린 싫어요 취소
                setDislike((prev) => prev - 1);
                setIsDisliked(false);
                await fetchHateUpdate(-1); // 서버에 싫어요 취소 요청
            }
        } catch (error) {
            console.error('싫어요 요청 오류:', error);
        } finally {
            setIsLoading(false);
        }
    };
   
    const fetchLoveUpdate = async (action) => {
        const response = await fetch(`http://192.168.56.1:8080/movie/love/${reviewId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                love: action,
            }),
        });
        return handleResponse(response);
    };

    const fetchHateUpdate = async (action) => {
        const response = await fetch(`http://192.168.56.1:8080/movie/hate/${reviewId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                hate: action,
            }),
        });
        return handleResponse(response);
    };

    const handleResponse = async (res) => {
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await res.json();
        console.log('서버 응답:', data);

        // 서버에서 반환된 값을 상태에 업데이트
        setLike(data.love);
        setDislike(data.hate);

        return data
    };

    return (

        <div className='flex justify-end items-center'>
            {like !== null && (
                <button onClick={handleLike} className='flex items-center mr-2' disabled={isLoading}>
                    {isLiked ?
                        <svg className='fill-white w-6 h-6' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path d="M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2l144 0c26.5 0 48 21.5 48 48c0 18.5-10.5 34.6-25.9 42.6C497 275.4 504 288.9 504 304c0 23.4-16.8 42.9-38.9 47.1c4.4 7.3 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48l-97.5 0c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3l0-38.3 0-48 0-24.9c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192l64 0c17.7 0 32 14.3 32 32l0 224c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32-14.3-32-32L0 224c0-17.7 14.3-32 32-32z" />
                        </svg>
                        :
                        <svg className='fill-white w-6 h-6' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path d="M323.8 34.8c-38.2-10.9-78.1 11.2-89 49.4l-5.7 20c-3.7 13-10.4 25-19.5 35l-51.3 56.4c-8.9 9.8-8.2 25 1.6 33.9s25 8.2 33.9-1.6l51.3-56.4c14.1-15.5 24.4-34 30.1-54.1l5.7-20c3.6-12.7 16.9-20.1 29.7-16.5s20.1 16.9 16.5 29.7l-5.7 20c-5.7 19.9-14.7 38.7-26.6 55.5c-5.2 7.3-5.8 16.9-1.7 24.9s12.3 13 21.3 13L448 224c8.8 0 16 7.2 16 16c0 6.8-4.3 12.7-10.4 15c-7.4 2.8-13 9-14.9 16.7s.1 15.8 5.3 21.7c2.5 2.8 4 6.5 4 10.6c0 7.8-5.6 14.3-13 15.7c-8.2 1.6-15.1 7.3-18 15.2s-1.6 16.7 3.6 23.3c2.1 2.7 3.4 6.1 3.4 9.9c0 6.7-4.2 12.6-10.2 14.9c-11.5 4.5-17.7 16.9-14.4 28.8c.4 1.3 .6 2.8 .6 4.3c0 8.8-7.2 16-16 16l-97.5 0c-12.6 0-25-3.7-35.5-10.7l-61.7-41.1c-11-7.4-25.9-4.4-33.3 6.7s-4.4 25.9 6.7 33.3l61.7 41.1c18.4 12.3 40 18.8 62.1 18.8l97.5 0c34.7 0 62.9-27.6 64-62c14.6-11.7 24-29.7 24-50c0-4.5-.5-8.8-1.3-13c15.4-11.7 25.3-30.2 25.3-51c0-6.5-1-12.8-2.8-18.7C504.8 273.7 512 257.7 512 240c0-35.3-28.6-64-64-64l-92.3 0c4.7-10.4 8.7-21.2 11.8-32.2l5.7-20c10.9-38.2-11.2-78.1-49.4-89zM32 192c-17.7 0-32 14.3-32 32L0 448c0 17.7 14.3 32 32 32l64 0c17.7 0 32-14.3 32-32l0-224c0-17.7-14.3-32-32-32l-64 0z" />
                        </svg>
                    }
                    <div className='text-white m-2'> 좋아요 {like} </div>
                </button>
            )}
            {dislike !== null && (
                <button onClick={handleDislike} className='flex items-center' disabled={isLoading}>
                    {isDisliked ?
                        <svg className='fill-white w-6 h-6' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path d="M313.4 479.1c26-5.2 42.9-30.5 37.7-56.5l-2.3-11.4c-5.3-26.7-15.1-52.1-28.8-75.2l144 0c26.5 0 48-21.5 48-48c0-18.5-10.5-34.6-25.9-42.6C497 236.6 504 223.1 504 208c0-23.4-16.8-42.9-38.9-47.1c4.4-7.3 6.9-15.8 6.9-24.9c0-21.3-13.9-39.4-33.1-45.6c.7-3.3 1.1-6.8 1.1-10.4c0-26.5-21.5-48-48-48l-97.5 0c-19 0-37.5 5.6-53.3 16.1L202.7 73.8C176 91.6 160 121.6 160 153.7l0 38.3 0 48 0 24.9c0 29.2 13.3 56.7 36 75l7.4 5.9c26.5 21.2 44.6 51 51.2 84.2l2.3 11.4c5.2 26 30.5 42.9 56.5 37.7zM32 384l64 0c17.7 0 32-14.3 32-32l0-224c0-17.7-14.3-32-32-32L32 96C14.3 96 0 110.3 0 128L0 352c0 17.7 14.3 32 32 32z" />
                        </svg>
                        : <svg className='fill-white w-6 h-6' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path d="M323.8 477.2c-38.2 10.9-78.1-11.2-89-49.4l-5.7-20c-3.7-13-10.4-25-19.5-35l-51.3-56.4c-8.9-9.8-8.2-25 1.6-33.9s25-8.2 33.9 1.6l51.3 56.4c14.1 15.5 24.4 34 30.1 54.1l5.7 20c3.6 12.7 16.9 20.1 29.7 16.5s20.1-16.9 16.5-29.7l-5.7-20c-5.7-19.9-14.7-38.7-26.6-55.5c-5.2-7.3-5.8-16.9-1.7-24.9s12.3-13 21.3-13L448 288c8.8 0 16-7.2 16-16c0-6.8-4.3-12.7-10.4-15c-7.4-2.8-13-9-14.9-16.7s.1-15.8 5.3-21.7c2.5-2.8 4-6.5 4-10.6c0-7.8-5.6-14.3-13-15.7c-8.2-1.6-15.1-7.3-18-15.2s-1.6-16.7 3.6-23.3c2.1-2.7 3.4-6.1 3.4-9.9c0-6.7-4.2-12.6-10.2-14.9c-11.5-4.5-17.7-16.9-14.4-28.8c.4-1.3 .6-2.8 .6-4.3c0-8.8-7.2-16-16-16l-97.5 0c-12.6 0-25 3.7-35.5 10.7l-61.7 41.1c-11 7.4-25.9 4.4-33.3-6.7s-4.4-25.9 6.7-33.3l61.7-41.1c18.4-12.3 40-18.8 62.1-18.8L384 32c34.7 0 62.9 27.6 64 62c14.6 11.7 24 29.7 24 50c0 4.5-.5 8.8-1.3 13c15.4 11.7 25.3 30.2 25.3 51c0 6.5-1 12.8-2.8 18.7C504.8 238.3 512 254.3 512 272c0 35.3-28.6 64-64 64l-92.3 0c4.7 10.4 8.7 21.2 11.8 32.2l5.7 20c10.9 38.2-11.2 78.1-49.4 89zM32 384c-17.7 0-32-14.3-32-32L0 128c0-17.7 14.3-32 32-32l64 0c17.7 0 32 14.3 32 32l0 224c0 17.7-14.3 32-32 32l-64 0z" />
                        </svg>
                    }
                    <div className='text-white ml-2'> 싫어요 {dislike} </div>
                </button>
            )}
        </div>
    );
}


