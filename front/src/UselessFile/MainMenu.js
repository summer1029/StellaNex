import { Link, Navigate } from "react-router-dom";
import { useState, useRef } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { stLogin } from "../Component/AtomSt";
import { useNavigate } from 'react-router-dom';

import MovieInfo from "../Component/MovieInfo";
import Login from '../Component/Login'
import Mypage from "../Component/Mypage";

import bgimg from "../assets/poster/wonkaHorizon.jpg";
import movie0 from "../assets/poster/wonka.jpg"
import movie1 from "../assets/poster/gungook.jpg"
import movie2 from "../assets/poster/qukal.jpg"
import movie3 from "../assets/poster/simin.jpg"
import movie4 from "../assets/poster/sopung.jpg"
import movie5 from "../assets/poster/dogdys.jpg"
import movie6 from "../assets/poster/deadman.jpg"
import movie7 from "../assets/poster/agail.jpg"
import movie8 from "../assets/poster/shark.jpg"
import movie9 from "../assets/poster/dmz.jpg"

export default function MainMenu() {
    const [currentPage, setPage] = useState("Home");
    const [isLogin, setIsLogin] = useRecoilState(stLogin);
    // 현재 로그인 상태 콘솔에 출력 (로그인되면 true, 로그아웃되면 false)
    console.log(isLogin)

    const movieLinks = [
        { to: "/movie/0", title: "웡카" },
        { to: "/movie/1", title: "건국전쟁" },
        { to: "/movie/2", title: "귀멸의 칼날" },
        { to: "/movie/3", title: "시민덕희" },
        { to: "/movie/4", title: "소풍" },
        { to: "/movie/5", title: "도그데이즈" },
        { to: "/movie/6", title: "데드맨" },
        { to: "/movie/7", title: "아가일" },
        { to: "/movie/8", title: "아기상어 극장판" },
        { to: "/movie/9", title: "DMZ 동물특공대" }
    ];

    const navigate = useNavigate()
    const navigateToRegister = () => {

        navigate("/Register")
    }

    // 페이지 변경함수
    const changePage = (page) => {
        setPage(page)
    }

    const moviePoster = [movie0, movie1, movie2, movie3, movie4, movie5, movie6, movie7, movie8, movie9]
    const page = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
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

    const renderPage = () => {
        switch (currentPage) {
            case "Home":
                return (
                    <div className="flex-col w-4/5 bg-black h-svh">
                        <div className="tracking-tight ml-5 mr-5 h-1/2 border-solid border-2 border-black" style={{ backgroundImage: `url(${bgimg})`, backgroundSize: "auto" }}>
                            <div className='font-semibold text-3xl text-end mr-5 mt-40 tracking-tight text-white'>
                                웡카
                            </div>
                            <div className='font-semibold text-lg text-end mr-5 tracking-tight text-white'>
                                세상에서 가장 달콤한 여정 좋은 일은 모두 꿈에서부터 시작된다!
                            </div>
                        </div>
                        <div className='tracking-tight h-1/2'>
                            <div className='font-semibold text-lg tracking-tight text-white m-5'>
                                무비차트
                            </div>

                            <div ref={slideRef} style={{ overflowX: "auto", whiteSpace: "nowrap", marginLeft: "26px", marginRight: "26px" }}>

                                {moviePoster.map((item, page) => (
                                    console.log("page:", page),
                                    <Link to={`/movie/${page}`} style={{
                                        display: "inline-block",
                                        width: "180px", // 여기에 슬라이드의 너비 조정
                                        height: "248px",
                                        // minWidth: "200px", // 최소 너비 지정 (원하는 값으로 변경 가능)
                                        background: `url(${item})`,
                                        backgroundSize: "cover", // 이미지가 요소에 맞게 확대/축소되도록 설정
                                        marginRight: "10px",
                                        flexDirection: "column",
                                        justifyItems: "center"
                                    }}
                                        className="mb-5">
                                    </Link>
                                ))}
                            </div>

                            <div className="flex justify-center items-center">
                                <button onClick={scrollLeft} className="font-semibold text-lg tracking-tight text-white mt-2 mr-1 hover:text-red-400">◀️</button>
                                <button onClick={scrollRight} className="font-semibold text-lg tracking-tight text-white mt-2 ml-1 hover:text-red-400">▶️</button>
                            </div>
                        </div>
                    </div>
                )
            case "Movie":
                return (
                    <MovieInfo />
                )
            case "Help":
                return (

                    <div className='flex justify-center items-center bg-black w-4/5' disabled>
                        <svg className="animate-spin items-center fill-white h-20 w-20 mr-5 ..." xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z" />
                        </svg>
                        <div className="text-white text-3xl">Processing...</div>
                    </div>
                )
        }
    }

    return (
        <div className="flex flex-col h-screen">
            <nav className="flex flex-nowrap justify-between items-center bg-black flex-grow">
                <button type="button" onClick={() => changePage("Home")} className='flex items-center text-red-400 m-5'>
                    <div className='font-extrabold font-appleB text-4xl tracking-tight'>
                        StellaNeX
                    </div>
                </button>

                <div className='flex justify-end items-center m-5'>
                    <div className="mr-3">
                        <Mypage />
                    </div>
                    <Login />
                    <button onClick={navigateToRegister} className='block lg:inline-block p-1.5 mr-3 border rounded text-lg font-appleB text-white border-white hover:text-red-400 hover:bg-white'>
                        Register
                    </button>
                    {/* <Link to='/Register' className='block lg:inline-block p-1.5 mr-3 border rounded text-lg text-white border-white hover:text-red-400 hover:bg-white' >
                            Register
                        </Link> */}
                </div>
            </nav>

            <div className='flex h-full'>
                <div className='flex-col bg-zinc-800 w-1/5 p-5 min-w-72'>
                    <div className='flex mt-5 ml-5 mb-10'>
                        <input className="input" type='search' style={{ width: '80%' }} />
                        <button className='type="button" p-1 ml-1 border text-base font-appleB text-white border-white hover:bg-white hover:text-black' >
                            검색
                        </button>
                    </div>
                    <button type="button" onClick={() => changePage("Movie")} className='flex m-5'>
                        <svg className='fill-white h-7 w-7 hover:fill-red-400' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path d="M0 96C0 60.7 28.7 32 64 32H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM48 368v32c0 8.8 7.2 16 16 16H96c8.8 0 16-7.2 16-16V368c0-8.8-7.2-16-16-16H64c-8.8 0-16 7.2-16 16zm368-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V368c0-8.8-7.2-16-16-16H416zM48 240v32c0 8.8 7.2 16 16 16H96c8.8 0 16-7.2 16-16V240c0-8.8-7.2-16-16-16H64c-8.8 0-16 7.2-16 16zm368-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V240c0-8.8-7.2-16-16-16H416zM48 112v32c0 8.8 7.2 16 16 16H96c8.8 0 16-7.2 16-16V112c0-8.8-7.2-16-16-16H64c-8.8 0-16 7.2-16 16zM416 96c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V112c0-8.8-7.2-16-16-16H416zM160 128v64c0 17.7 14.3 32 32 32H320c17.7 0 32-14.3 32-32V128c0-17.7-14.3-32-32-32H192c-17.7 0-32 14.3-32 32zm32 160c-17.7 0-32 14.3-32 32v64c0 17.7 14.3 32 32 32H320c17.7 0 32-14.3 32-32V320c0-17.7-14.3-32-32-32H192z" />
                        </svg>
                        <div className='font-semibold text-lg tracking-tight ml-3 text-white hover:text-red-400'>영화<br /></div>
                    </button>
                    {movieLinks.map((link, index) => (
                        <Link key={index} to={link.to} className='flex m-5 ml-12'>
                            <div className='font-semibold text-lg tracking-tight ml-3 text-white hover:text-red-400'>{link.title}<br /></div>
                        </Link>
                    ))}
                    <button type="button" onClick={() => changePage("Help")} className='flex m-5'>
                        <svg className='fill-white h-7 w-7 hover:fill-red-400' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
                        </svg>
                        <div className='font-semibold text-lg tracking-tight ml-3 text-white hover:text-red-400'>고객센터<br /></div>
                    </button>
                </div>
                {renderPage()}
            </div>

            <footer className='flex p-5 h-36 bg-black'>
                <div>
                    <ul className='font-medium text-lg tracking-tight text-zinc-400 mb-5'>StellaNeX<br /></ul>
                    <ul className='font-normal text-sm tracking-tight text-zinc-400'>전화번호 : 000-0000-0000<br /></ul>
                    <ul className='font-normal text-sm tracking-tight text-zinc-400'>위치 : 부산시 금정구 부산대학교<br /></ul>
                    <ul className='font-normal text-sm tracking-tight text-zinc-400'>관리자 : 이지원<br /></ul>
                    {/* <ul className='font-normal text-sm tracking-tight text-zinc-400'>관리자 : 이지원, 허선행<br /></ul> */}
                </div>
            </footer>
        </div>
    )
}
