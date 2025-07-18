import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';

// 사용자(네티즌, 평론가) 정보 페이지
export default function UserInfoPage() {

    // 이전 페이지로 이동
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);  // 이전 페이지로 이동
    };

    // 파라미터에서 가져온 writer 표시
    const { writerId } = useParams();  // 'writerId'는 URL 매개변수의 이름입니다.

    // 전체 리뷰 데이터 가져오기 from Backend
    const [reviewData, setReviewData] = useState([])

    const getReviewData = () => {

        fetch('http://192.168.56.1:8080/movie/review', {
            method: "GET",
        })
            .then((res) => res.json())
            .then((data) => { console.log("전체 리뷰 데이터: ", data); return setReviewData(data) })
            .catch((err) => console.error(err));
    };

    useEffect(() => {
        getReviewData();
    }, []);

    // 사용자 ID로 review data filtering
    const [filteredReviews, setFilteredReviews] = useState([]);

    // 리뷰 데이터가 업데이트될 때마다 필터링
    useEffect(() => {
        if (reviewData.length > 0) {
            const userReviews = reviewData.filter(review => review.email === writerId); // writerId로 필터링
            console.log("필터링된 리뷰 데이터: ", userReviews); // 여기에 콘솔 출력 추가
            setFilteredReviews(userReviews);
        }
    }, [reviewData, writerId]);

    // 좋아요 수 총합을 계산
    const totalLikes = filteredReviews.reduce((sum, review) => sum + review.love, 0);

    // 싫어요 수 총합을 계산
    const totalDislikes = filteredReviews.reduce((sum, review) => sum + review.hate, 0);

    // 작성자 이메일을 받아와서 이름 분리
    const getWriterId = (string) => {
        return string.substring(0, string.indexOf("@"));
    };

    return (
        <div>
            <nav className="flex flex-nowrap justify-between items-center bg-black">
                <Link to="/" className='font-extrabold font-appleB text-4xl text-red-400 m-5 tracking-tight'>
                    StellaNeX
                </Link>
                <button onClick={goBack} className='m-5'>
                    <svg className='fill-red-400 w-8 h-8' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
                    </svg>
                </button>
            </nav>

            <div className='flex-col bg-zinc-800 w-full h-auto'>
                <div className='flex justify-start items-center'>
                    <div className='border-2 m-10'>
                        <svg className="fill-white w-10 h-10 m-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM164.1 325.5C182 346.2 212.6 368 256 368s74-21.8 91.9-42.5c5.8-6.7 15.9-7.4 22.6-1.6s7.4 15.9 1.6 22.6C349.8 372.1 311.1 400 256 400s-93.8-27.9-116.1-53.5c-5.8-6.7-5.1-16.8 1.6-22.6s16.8-5.1 22.6 1.6zM144.4 208a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm156.4 25.6c-5.3 7.1-15.3 8.5-22.4 3.2s-8.5-15.3-3.2-22.4c30.4-40.5 91.2-40.5 121.6 0c5.3 7.1 3.9 17.1-3.2 22.4s-17.1 3.9-22.4-3.2c-17.6-23.5-52.8-23.5-70.4 0z" />
                        </svg>
                    </div>
                    <div>
                        <div className='flex justify-between mb-4'>
                            <div className='font-semibold text-3xl text-white'>{getWriterId(writerId)}</div>
                            {filteredReviews.length > 0 && (
                                <div className='flex items-end font-semibold text-base text-red-400'>{filteredReviews[0].role == "user" ? "네티즌" : "평론가"}</div>
                            )}
                        </div>

                        <div className='font-medium text-xl text-white mb-1'>작성한 리뷰 수 : {filteredReviews.length}개 </div>
                        <div className='font-medium text-xl text-white mb-1'>받은 좋아요 수👍 : {totalLikes} </div>
                        <div className='font-medium text-xl text-white mb-1'>받은 싫어요 수👎 : {totalDislikes} </div>
                    </div>
                </div>

                <div className='flex-col min-h-screen'>
                    <div className='font-semibold text-2xl text-white ml-10'>
                        {getWriterId(writerId)}가 쓴 리뷰
                    </div>
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 rounded-md ml-10 mt-5 mb-5 mr-10'>
                        {filteredReviews.map(review=> {

                            return (
                                <div key={review.review_id} className='p-3 bg-gray-800 rounded-md shadow-md'>
                                    <div className='font-semibold text-2xl text-white m-2'>
                                        {review.movieTitle}
                                    </div>
                                    <div className='flex-col'>
                                        <div className='font-medium text-1xl text-gray-500 ml-2 mb-1'>
                                        평가: 
                                        </div>
                                        <div className='font-medium text-1xl text-white ml-2 mb-1'>
                                        {review.content}
                                        </div>
                                    </div>
                                    <div className='flex-col'>
                                    <div className='font-medium text-1xl text-gray-500 ml-2 mb-1'>
                                        평점: 
                                        </div>
                                        <div className='font-medium text-1xl text-white ml-2 mb-1'>
                                        {review.grade}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}
