import { useState, useRef, useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { stLogin } from "../Component/AtomSt";
import { useNavigate } from 'react-router-dom';

import Login from '../Component/Login'
import Mypage from "../Component/Mypage";
import NowPlayingList from "../Component/NowPlayingList";
import UpcomingList from "../Component/UpcomingList";
import Movies from "../Component/Movies";
import TopRated from "../Component/TopRated";
import useMovieData from "../Component/UseMovieData";
import Popular from "../Component/Popular";
import Nav from "./Nav";

export default function Home() {

    // 현재 로그인 상태 콘솔에 출력 (로그인되면 true, 로그아웃되면 false)
    const [isLogin, setIsLogin] = useRecoilState(stLogin);
    console.log("isLogin? ", isLogin)
    
    // 현재 페이지 상태 : default = Home
    const [currentPage, setPage] = useState("Home");

    const navigate = useNavigate()
    const navigateToRegister = () => {

        navigate("/Register")
    }

    // 페이지 변경함수
    const changePage = (page) => {
        setPage(page)
    }

    const renderPage = () => {
        switch (currentPage) {
            case "Home":
                return (
                    <Popular />
                )
            case "NowPlaying":
                return (
                    <NowPlayingList />
                )
            case "Upcoming":
                return (
                    <UpcomingList />
                )
            case "Movies":
                return (
                    <Movies />
                )
            case "Top":
                return (
                    <TopRated />
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
            {/* <nav className="flex flex-nowrap justify-between items-center bg-black">
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
                </div>
            </nav> */}
            <Nav />

            {/* sideBar */}
            <div className='flex flex-grow relative'>
                <div className='flex-col bg-zinc-800 w-8/30 p-5 h-full min-w-60'>
                    <div className='flex mt-5 ml-5 mb-10'>
                        <input className="input" type='search' style={{ width: '80%' }} />
                        <button className='type="button" p-1 ml-1 border text-base font-appleB text-white border-white hover:bg-white hover:text-black' >
                            검색
                        </button>
                    </div>
                    <button type="button" onClick={() => changePage("NowPlaying")} className='flex m-5'>
                        <svg className='fill-white h-7 w-7 hover:fill-red-400' xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                            <path d="m380-300 280-180-280-180v360ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z" />
                        </svg>
                        <div className='font-semibold text-lg tracking-tight ml-3 text-white hover:text-red-400'>현재상영영화<br /></div>
                    </button>

                    <button type="button" onClick={() => changePage("Upcoming")} className='flex m-5'>
                        <svg className='fill-white h-7 w-7 hover:fill-red-400' xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                            <path d="m160-800 80 160h120l-80-160h80l80 160h120l-80-160h80l80 160h120l-80-160h120q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800Zm0 240v320h640v-320H160Zm0 0v320-320Z" />
                        </svg>
                        <div className='font-semibold text-lg tracking-tight ml-3 text-white hover:text-red-400'>개봉예정영화<br /></div>
                    </button>

                    <button type="button" onClick={() => changePage("Movies")} className='flex m-5'>
                    <svg className='fill-white h-7 w-7 hover:fill-red-400' xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                        <path d="M160-120v-720h80v80h80v-80h320v80h80v-80h80v720h-80v-80h-80v80H320v-80h-80v80h-80Zm80-160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm400 320h80v-80h-80v80Zm0-160h80v-80h-80v80Zm0-160h80v-80h-80v80ZM400-200h160v-560H400v560Zm0-560h160-160Z"/>
                    </svg>
                        <div className='font-semibold text-lg tracking-tight ml-3 text-white hover:text-red-400'>영화<br /></div>
                    </button>

                    <button type="button" onClick={() => changePage("Top")} className='flex m-5'>
                        <svg className='fill-white h-7 w-7 hover:fill-red-400' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                            <path d="M353.8 54.1L330.2 6.3c-3.9-8.3-16.1-8.6-20.4 0L286.2 54.1l-52.3 7.5c-9.3 1.4-13.3 12.9-6.4 19.8l38 37-9 52.1c-1.4 9.3 8.2 16.5 16.8 12.2l46.9-24.8 46.6 24.4c8.6 4.3 18.3-2.9 16.8-12.2l-9-52.1 38-36.6c6.8-6.8 2.9-18.3-6.4-19.8l-52.3-7.5zM256 256c-17.7 0-32 14.3-32 32V480c0 17.7 14.3 32 32 32H384c17.7 0 32-14.3 32-32V288c0-17.7-14.3-32-32-32H256zM32 320c-17.7 0-32 14.3-32 32V480c0 17.7 14.3 32 32 32H160c17.7 0 32-14.3 32-32V352c0-17.7-14.3-32-32-32H32zm416 96v64c0 17.7 14.3 32 32 32H608c17.7 0 32-14.3 32-32V416c0-17.7-14.3-32-32-32H480c-17.7 0-32 14.3-32 32z" />
                        </svg>
                        <div className='font-semibold text-lg tracking-tight ml-3 text-white hover:text-red-400'>무비랭킹<br /></div>
                    </button>

                    <button type="button" onClick={() => changePage("Help")} className='flex m-5 absolute bottom-5 left-5 right-0'>
                        <svg className='fill-white h-7 w-7 hover:fill-red-400' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
                        </svg>
                        <div className='font-semibold text-lg tracking-tight ml-3 text-white hover:text-red-400'>고객센터<br /></div>
                    </button>
                </div>
                <div className="flex-grow w-22/30 h-full"> 
                  {renderPage()}
                </div>
            </div>

            <footer className='flex p-5 h-auto bg-black'>
                <div>
                    <ul className='font-medium text-lg tracking-tight text-zinc-400 mb-5'>StellaNeX<br /></ul>
                    <ul className='font-normal text-sm tracking-tight text-zinc-400'>전화번호 : 000-0000-0000<br /></ul>
                    <ul className='font-normal text-sm tracking-tight text-zinc-400'>위치 : 부산시 금정구 부산대학교<br /></ul>
                    <ul className='font-normal text-sm tracking-tight text-zinc-400'>관리자 : 이지원<br /></ul>
                </div>
            </footer>
        </div>
    )
}
