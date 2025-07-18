// 제일 처음 코드
// import React, { useState } from 'react';

// function LikeDislikeFunc({reviewId}) {
//     const [like, setLike] = useState(0);
//     const [dislike, setDislike] = useState(0);
//     const [isLiked, setIsLiked] = useState(false);
//     const [isDisliked, setIsDisliked] = useState(false);

//     const updateLike = (value) => {

//         console.log("loveValue: ", value)

//         fetch(`http://192.168.56.1:8080/movie/love/${reviewId}`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 love: value
//             })
//         })
//         .then((res) => {
//             // 응답 상태가 성공적이면 JSON으로 파싱
//             if (!res.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             return res.json();
//         })
//         .then((data) => {
//             console.log("서버 응답:", data); // 서버의 응답 내용 확인
//             // 필요한 로직 추가
//             setLike(data.love); // 업데이트된 좋아요 수로 상태 업데이트
//         })
//         .catch((err) => console.error(err));
//     }

//     const updateDislike = (value) => {

//         console.log("hateValue: ", value)

//         fetch(`http://192.168.56.1:8080/movie/hate/${reviewId}`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 hate: value
//             })
//         })
//         .then((res) => {
//             // 응답 상태가 성공적이면 JSON으로 파싱
//             if (!res.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             return res.json();
//         })
//         .then((data) => {
//             console.log("서버 응답:", data); // 서버의 응답 내용 확인
//             // 필요한 로직 추가
//             setDislike(data.hate); // 업데이트된 좋아요 수로 상태 업데이트
//         })
//         .catch((err) => console.error(err));
//     }


//     // 좋아요 버튼 클릭 처리 함수
//     const handleLike = () => {
//         if (isLiked) {
//             setLike(like - 1); // 좋아요 취소
//             updateLike(-1) // 좋아요 취소 전송
//             setIsLiked(false);
//         } else {
//             setLike(like + 1); // 좋아요
//             updateLike(1) // 좋아요 전송
//             setIsLiked(true);
//             if (isDisliked) {
//                 setDislike(dislike - 1); // 싫어요 취소
//                 updateDislike(-1) // 싫어요 취소 전송
//                 setIsDisliked(false);
//             }
//         }
//     };

//     // 싫어요 버튼 클릭 처리 함수
//     const handleDislike = () => {
//         if (isDisliked) {
//             setDislike(dislike - 1); // 싫어요 취소
//             updateDislike(-1) // 싫어요 취소 전송
//             setIsDisliked(false);
//         } else {
//             setDislike(dislike + 1); // 싫어요
//             updateDislike(1) // 싫어요 전송
//             setIsDisliked(true);
//             if (isLiked) {
//                 setLike(like - 1); // 좋아요 취소
//                 updateLike(-1) // 좋아요 취소 전송
//                 setIsLiked(false);
//             }
//         }
//     };

//     return (
//         <div>
//             <button onClick={handleLike} className='text-white mr-2'>
//                 👍 좋아요 {like}
//             </button>
//             <button onClick={handleDislike} className='text-white'>
//                 👎 싫어요 {dislike}
//             </button>
//         </div>
//     );
// }

// export default LikeDislikeFunc;

// 내가 수정한거
// import React, { useEffect, useState } from 'react';

// function LikeDislikeFunc({ reviewId, love, hate }) {

//     const [isLiked, setIsLiked] = useState(false);
//     const [like, setLike] = useState();
//     const [isDisliked, setIsDisliked] = useState(false);
//     const [dislike, setDislike] = useState();

//     useEffect(() => {
//         setLike(love);
//     }, [love])

//     useEffect(() => {
//         setDislike(hate);
//     }, [hate])

//     useEffect(() => {

//         fetch(`http://192.168.56.1:8080/movie/love/${reviewId}`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 love: isLiked ? 1 : -1  // 좋아요 상태에 따라 1 또는 -1 전달
//             })
//         })
//             .then((res) => {
//                 // 응답 상태가 성공적이면 JSON으로 파싱
//                 if (!res.ok) {
//                     throw new Error('Network response was not ok');
//                 }
//                 return res.json();
//             })
//             .then((data) => {
//                 console.log("서버 응답:", data); // 서버의 응답 내용 확인
//             })
//             .catch((err) => console.error(err));

//     }, [like, dislike])

//     useEffect(() => {

//         fetch(`http://192.168.56.1:8080/movie/hate/${reviewId}`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 hate: isDisliked ? 1 : -1  // 좋아요 상태에 따라 1 또는 -1 전달
//             })
//         })
//             .then((res) => {
//                 // 응답 상태가 성공적이면 JSON으로 파싱
//                 if (!res.ok) {
//                     throw new Error('Network response was not ok');
//                 }
//                 return res.json();
//             })
//             .then((data) => {
//                 console.log("서버 응답:", data); // 서버의 응답 내용 확인
//             })
//             .catch((err) => console.error(err));

//     }, [dislike, like])



//     const handleLike = () => {
//         if (isLiked) {
//             setIsLiked(false)
//             setLike(like - 1)
//         } else {
//             setIsLiked(true)
//             setLike(like + 1)
//             if (isDisliked) {
//                 setIsDisliked(false);
//                 setDislike(dislike - 1);
//             }
//         }
//     }

//     const handleDislike = () => {
//         if (isDisliked) {
//             setIsDisliked(false)
//             setDislike(dislike - 1)
//         } else {
//             setIsDisliked(true)
//             setDislike(dislike + 1)
//             if (isLiked) {
//                 setIsLiked(false);
//                 setLike(like - 1);
//             }
//         }
//     }

//     console.log(reviewId, love, hate);

//     return (
//         <div className='flex justify-end items-center'>
//             {like !== null && (
//                 <button onClick={handleLike} className='flex items-center mr-2'>
//                     {isLiked ?
//                         <svg className='fill-white w-6 h-6' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
//                             <path d="M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2l144 0c26.5 0 48 21.5 48 48c0 18.5-10.5 34.6-25.9 42.6C497 275.4 504 288.9 504 304c0 23.4-16.8 42.9-38.9 47.1c4.4 7.3 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48l-97.5 0c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3l0-38.3 0-48 0-24.9c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192l64 0c17.7 0 32 14.3 32 32l0 224c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32-14.3-32-32L0 224c0-17.7 14.3-32 32-32z" />
//                         </svg>
//                         :
//                         <svg className='fill-white w-6 h-6' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
//                             <path d="M323.8 34.8c-38.2-10.9-78.1 11.2-89 49.4l-5.7 20c-3.7 13-10.4 25-19.5 35l-51.3 56.4c-8.9 9.8-8.2 25 1.6 33.9s25 8.2 33.9-1.6l51.3-56.4c14.1-15.5 24.4-34 30.1-54.1l5.7-20c3.6-12.7 16.9-20.1 29.7-16.5s20.1 16.9 16.5 29.7l-5.7 20c-5.7 19.9-14.7 38.7-26.6 55.5c-5.2 7.3-5.8 16.9-1.7 24.9s12.3 13 21.3 13L448 224c8.8 0 16 7.2 16 16c0 6.8-4.3 12.7-10.4 15c-7.4 2.8-13 9-14.9 16.7s.1 15.8 5.3 21.7c2.5 2.8 4 6.5 4 10.6c0 7.8-5.6 14.3-13 15.7c-8.2 1.6-15.1 7.3-18 15.2s-1.6 16.7 3.6 23.3c2.1 2.7 3.4 6.1 3.4 9.9c0 6.7-4.2 12.6-10.2 14.9c-11.5 4.5-17.7 16.9-14.4 28.8c.4 1.3 .6 2.8 .6 4.3c0 8.8-7.2 16-16 16l-97.5 0c-12.6 0-25-3.7-35.5-10.7l-61.7-41.1c-11-7.4-25.9-4.4-33.3 6.7s-4.4 25.9 6.7 33.3l61.7 41.1c18.4 12.3 40 18.8 62.1 18.8l97.5 0c34.7 0 62.9-27.6 64-62c14.6-11.7 24-29.7 24-50c0-4.5-.5-8.8-1.3-13c15.4-11.7 25.3-30.2 25.3-51c0-6.5-1-12.8-2.8-18.7C504.8 273.7 512 257.7 512 240c0-35.3-28.6-64-64-64l-92.3 0c4.7-10.4 8.7-21.2 11.8-32.2l5.7-20c10.9-38.2-11.2-78.1-49.4-89zM32 192c-17.7 0-32 14.3-32 32L0 448c0 17.7 14.3 32 32 32l64 0c17.7 0 32-14.3 32-32l0-224c0-17.7-14.3-32-32-32l-64 0z" />
//                         </svg>
//                     }
//                     <div className='text-white m-2'> 좋아요 {like} </div>
//                 </button>
//             )}
//             {dislike !== null && (
//                 <button onClick={handleDislike} className='flex items-center'>
//                     {isDisliked ?
//                         <svg className='fill-white w-6 h-6' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
//                             <path d="M313.4 479.1c26-5.2 42.9-30.5 37.7-56.5l-2.3-11.4c-5.3-26.7-15.1-52.1-28.8-75.2l144 0c26.5 0 48-21.5 48-48c0-18.5-10.5-34.6-25.9-42.6C497 236.6 504 223.1 504 208c0-23.4-16.8-42.9-38.9-47.1c4.4-7.3 6.9-15.8 6.9-24.9c0-21.3-13.9-39.4-33.1-45.6c.7-3.3 1.1-6.8 1.1-10.4c0-26.5-21.5-48-48-48l-97.5 0c-19 0-37.5 5.6-53.3 16.1L202.7 73.8C176 91.6 160 121.6 160 153.7l0 38.3 0 48 0 24.9c0 29.2 13.3 56.7 36 75l7.4 5.9c26.5 21.2 44.6 51 51.2 84.2l2.3 11.4c5.2 26 30.5 42.9 56.5 37.7zM32 384l64 0c17.7 0 32-14.3 32-32l0-224c0-17.7-14.3-32-32-32L32 96C14.3 96 0 110.3 0 128L0 352c0 17.7 14.3 32 32 32z" />
//                         </svg>
//                         : <svg className='fill-white w-6 h-6' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
//                             <path d="M323.8 477.2c-38.2 10.9-78.1-11.2-89-49.4l-5.7-20c-3.7-13-10.4-25-19.5-35l-51.3-56.4c-8.9-9.8-8.2-25 1.6-33.9s25-8.2 33.9 1.6l51.3 56.4c14.1 15.5 24.4 34 30.1 54.1l5.7 20c3.6 12.7 16.9 20.1 29.7 16.5s20.1-16.9 16.5-29.7l-5.7-20c-5.7-19.9-14.7-38.7-26.6-55.5c-5.2-7.3-5.8-16.9-1.7-24.9s12.3-13 21.3-13L448 288c8.8 0 16-7.2 16-16c0-6.8-4.3-12.7-10.4-15c-7.4-2.8-13-9-14.9-16.7s.1-15.8 5.3-21.7c2.5-2.8 4-6.5 4-10.6c0-7.8-5.6-14.3-13-15.7c-8.2-1.6-15.1-7.3-18-15.2s-1.6-16.7 3.6-23.3c2.1-2.7 3.4-6.1 3.4-9.9c0-6.7-4.2-12.6-10.2-14.9c-11.5-4.5-17.7-16.9-14.4-28.8c.4-1.3 .6-2.8 .6-4.3c0-8.8-7.2-16-16-16l-97.5 0c-12.6 0-25 3.7-35.5 10.7l-61.7 41.1c-11 7.4-25.9 4.4-33.3-6.7s-4.4-25.9 6.7-33.3l61.7-41.1c18.4-12.3 40-18.8 62.1-18.8L384 32c34.7 0 62.9 27.6 64 62c14.6 11.7 24 29.7 24 50c0 4.5-.5 8.8-1.3 13c15.4 11.7 25.3 30.2 25.3 51c0 6.5-1 12.8-2.8 18.7C504.8 238.3 512 254.3 512 272c0 35.3-28.6 64-64 64l-92.3 0c4.7 10.4 8.7 21.2 11.8 32.2l5.7 20c10.9 38.2-11.2 78.1-49.4 89zM32 384c-17.7 0-32-14.3-32-32L0 128c0-17.7 14.3-32 32-32l64 0c17.7 0 32 14.3 32 32l0 224c0 17.7-14.3 32-32 32l-64 0z" />
//                         </svg>
//                     }
//                     <div className='text-white ml-2'> 싫어요 {dislike} </div>
//                 </button>
//             )}
//         </div>
//     );
// }

// export default LikeDislikeFunc;


// 오빠가 수정한 거
import React, { useEffect, useState } from 'react';

function LikeDislikeFunc({ reviewId, love, hate }) {

    const [isLiked, setIsLiked] = useState(false);
    const [like, setLike] = useState();
    const [isDisliked, setIsDisliked] = useState(false);
    const [dislike, setDislike] = useState();

    useEffect(() => {
        setLike(love);
    }, [love])

    useEffect(() => {
        setDislike(hate);
    }, [hate])

    // useEffect(() => {

    //     fetch(`http://192.168.56.1:8080/movie/love/${reviewId}`, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({
    //             love: isLiked ? 1 : -1  // 좋아요 상태에 따라 1 또는 -1 전달
    //         })
    //     })
    //         .then((res) => {
    //             // 응답 상태가 성공적이면 JSON으로 파싱
    //             if (!res.ok) {
    //                 throw new Error('Network response was not ok');
    //             }
    //             return res.json();
    //         })
    //         .then((data) => {
    //             console.log("서버 응답:", data); // 서버의 응답 내용 확인
    //         })
    //         .catch((err) => console.error(err));

    // }, [like])

    // useEffect(() => {

    //     fetch(`http://192.168.56.1:8080/movie/hate/${reviewId}`, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({
    //             hate: isDisliked ? 1 : -1  // 좋아요 상태에 따라 1 또는 -1 전달
    //         })
    //     })
    //         .then((res) => {
    //             // 응답 상태가 성공적이면 JSON으로 파싱
    //             if (!res.ok) {
    //                 throw new Error('Network response was not ok');
    //             }
    //             return res.json();
    //         })
    //         .then((data) => {
    //             console.log("서버 응답:", data); // 서버의 응답 내용 확인
    //         })
    //         .catch((err) => console.error(err));

    // }, [dislike])



    // const handleLike = () => {
    //     if (isLiked) {
    //         setIsLiked(false)
    //         setLike(like - 1)
    //     } else {
    //         setIsLiked(true)
    //         setLike(like + 1)
    //         if (isDisliked) {
    //             setIsDisliked(false);
    //             setDislike(dislike - 1);
    //         }
    //     }
    // }

    // const handleDislike = () => {
    //     if (isDisliked) {
    //         setIsDisliked(false)
    //         setDislike(dislike - 1)
    //     } else {
    //         setIsDisliked(true)
    //         setDislike(dislike + 1)
    //         if (isLiked) {
    //             setIsLiked(false);
    //             setLike(like - 1);
    //         }
    //     }
    // }


    // const updateFeedback = (type, value) => {
    //     fetch(`http://192.168.56.1:8080/movie/${type}/${reviewId}`, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({ [type]: value }),
    //     })
    //         .then((res) => {
    //             if (!res.ok) throw new Error('Network response was not ok');
    //             return res.json();
    //         })
    //         .then((data) => console.log("서버 응답:", data))
    //         .catch((err) => console.error(err));
    // };

    // const handleLike = () => {
    //     if (isLiked) {
    //         setLike((prev) => prev - 1);
    //         updateFeedback('love', -1);
    //     } else {
    //         setLike((prev) => prev + 1);
    //         updateFeedback('love', 1);
    //         if (isDisliked) {
    //             setDislike(false);
    //             setDislike((prev) => prev - 1);
    //             updateFeedback('hate', -1);
    //         }
    //     }
    //     setIsLiked(!isLiked);
    // };
    // // 좋아요 방어 0이하 방어 로직
    // const handleDislike = () => {
    //     if (isDisliked) {
    //         // dislike를 취소하는 경우
    //         setDislike((prev) => Math.max(prev - 1, 0)); // 0 이하로 떨어지지 않도록
    //         updateFeedback('hate', -1);
    //     } else {
    //         // dislike를 추가하는 경우
    //         setDislike((prev) => prev + 1);
    //         updateFeedback('hate', 1);

    //         // 이미 좋아요가 눌렸다면
    //         if (isLiked) {
    //             setIsLiked(false);
    //             setLike((prev) => Math.max(prev - 1, 0)); // 0 이하로 떨어지지 않도록
    //             updateFeedback('love', -1);
    //         }
    //     }
    //     setIsDisliked(!isDisliked);
    // };

    // // dislike를 업데이트하는 부분
    // const handleDislikeChange = (newDislikeCount) => {
    //     // 새로운 dislike 수가 0보다 작은 경우 0으로 설정
    //     const validDislikeCount = Math.max(newDislikeCount, 0);
    //     setDislike(validDislikeCount);
    // };


    const updateCount = (count, setter) => Math.max(count, 0);

    const updateFeedback = (feedbackType, value) => {
    fetch(`http://192.168.56.1:8080/movie/${feedbackType}/${reviewId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ [feedbackType]: value }),
    })
        .then((res) => {
            if (!res.ok) throw new Error('Network response was not ok');
            return res.json();
        })
        .then((data) => console.log("서버 응답:", data))
        .catch((err) => console.error(err));
};

// const handleLike = () => {
//     setLike((prev) => {
//         const newLike = isLiked ? updateCount(prev - 1, setLike) : updateCount(prev + 1, setLike);
//         updateFeedback('love', isLiked ? -1 : 1);
//         return newLike;
//     });
//     setIsLiked(!isLiked);

//     // 라이크를 클릭했는데 싫어요가 클릭되어있을때 
//     if (isDisliked) {
//         setDislike((prev) => updateCount(prev - 1, setDislike));
//         updateFeedback('hate', -1);
//         setIsDisliked(false);
//     }
// };

// const handleDislike = () => {
//     setDislike((prev) => {
//         const newDislike = isDisliked ? updateCount(prev - 1, setDislike) : updateCount(prev + 1, setDislike);
//         updateFeedback('hate', isDisliked ? -1 : 1);
//         return newDislike;
//     });
//     setIsDisliked(!isDisliked);

//     if (isLiked) {
//         setLike((prev) => updateCount(prev - 1, setLike));
//         updateFeedback('love', -1);
//         setIsLiked(false);
//     }
// };
const handleLike = () => {
    if (isLiked) {
        // 좋아요가 이미 눌려져 있다면 좋아요 해제
        setLike((prev) => {
            const newLike = updateCount(prev - 1);
            updateFeedback('love', -1);
            return newLike;
        });
        setIsLiked(false); // 좋아요 상태 해제
    } else {
        // 좋아요가 눌려져 있지 않다면 좋아요 추가
        setLike((prev) => {
            const newLike = updateCount(prev + 1);
            updateFeedback('love', 1);
            return newLike;
        });
        setIsLiked(true); // 좋아요 상태 설정

        // 만약 싫어요가 눌려져 있다면 싫어요 해제
        if (isDisliked) {
            setDislike((prev) => {
                const newDislike = updateCount(prev - 1);
                updateFeedback('hate', -1);
                return newDislike;
            });
            setIsDisliked(false); // 싫어요 상태 해제
        }
    }
};

const handleDislike = () => {
    if (isDisliked) {
        // 싫어요가 이미 눌려져 있다면 싫어요 해제
        setDislike((prev) => {
            const newDislike = updateCount(prev - 1);
            updateFeedback('hate', -1);
            return newDislike;
        });
        setIsDisliked(false); // 싫어요 상태 해제
    } else {
        // 싫어요가 눌려져 있지 않다면 싫어요 추가
        setDislike((prev) => {
            const newDislike = updateCount(prev + 1);
            updateFeedback('hate', 1);
            return newDislike;
        });
        setIsDisliked(true); // 싫어요 상태 설정

        // 만약 좋아요가 눌려져 있다면 좋아요 해제
        if (isLiked) {
            setLike((prev) => {
                const newLike = updateCount(prev - 1);
                updateFeedback('love', -1);
                return newLike;
            });
            setIsLiked(false); // 좋아요 상태 해제
        }
    }
};


// JSX 부분 생략


    console.log(reviewId, love, hate);
    return (
        <div className='flex justify-end items-center'>
            {like !== null && (
                <button onClick={handleLike} className='flex items-center mr-2'>
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
                <button onClick={handleDislike} className='flex items-center'>
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

export default LikeDislikeFunc;
