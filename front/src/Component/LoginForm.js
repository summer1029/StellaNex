import { Link } from "react-router-dom";
import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from "recoil";
import { stLogin } from "../Component/AtomSt";
import { userEmail } from "../Component/AtomSt";

export default function LoginForm() {
  const [inputId, setInputId] = useState("")
  const [inputPw, setInputPw] = useState("")
  const [isLogin, setIsLogin] = useRecoilState(stLogin);
  const setUserId = useSetRecoilState(userEmail);
  const navigate = useNavigate();

  // userId가 계속 유지 되지 않는 이유 : 로컬 스토리지에 저장되지 않아, 페이지를 새로고침 하거나 이동할 때 userId가 초기화 된다
  // -> userId를 지속적으로 사용하기 위해서는 로컬 스토리지에 userId를 저장하고 페이지가 로드될 때 로컬 스토리지에서 userId를 가져와 recoil상테에 설정 필요
  useEffect(() => {
    // 페이지가 로드될 때 로컬 스토리지에서 userId를 가져와 recoil 상태에 설정
    const userIdFromLocal = localStorage.getItem("userId")
    if (userIdFromLocal) {
      setUserId(userIdFromLocal)
    }
  }, [setUserId])

  const handleInputId = (e) => {
    setInputId(e.target.value)
  }

  const handleInputPw = (e) => {
    setInputPw(e.target.value)
  }

  const handleSubmit = () => {
    console.log("id: ", inputId, "pw: ", inputPw)

    // email과 password가 빈칸인지 확인
    if (inputId.trim() == "" || inputPw.trim() == "") {
      alert("Email address and password cannot be empty!")
      return
    }
              
    // 로그인 시, 백에 아이디와 비밀번호 post
    fetch('http://192.168.56.1:8080/member/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: inputId,
        password: inputPw,
      }),
    })
      .then((response) => {
        // 서버의 DB랑 비교해서 서버에서 에러를 전달해주면
        if (response.ok) {
          const accessToken = response.headers.get("Authorization");
          // 저장된 userId를 로컬 스토리지에 저장
          localStorage.setItem('loginToken', accessToken);
          return response.json(); // JSON 형식으로 응답을 가져옴
        } else {
          alert("Invalid email and password");
          throw new Error("Invalid credentials");
        }
      })
      .then((data) => {
        // 서버에서 반환된 JSON 데이터 사용
        console.log(data); // { message: "success!", role: "admin" } 형태로 출력

        // 로그인 성공 처리
        setIsLogin(true);
        // userId에 사용자가 입력한 이메일 저장
        setUserId(inputId);
        localStorage.setItem("userId", inputId);
        localStorage.setItem("userRole", data.role)

        // 역할에 따라 페이지 이동
        if (data.message === "success!") {
          if (data.role === 'admin') {
            navigate("/Admin"); // 관리자 페이지로 이동
          } else {
            navigate("/"); // 일반 사용자 페이지로 이동
          }
        }
      })
      .catch((err) => {
        console.error("Error logging in:", err);
      });
  };

  return (
    <div className="flex h-screen flex-col justify-center px-6 py-12 lg:px-8 bg-black">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Link to="/"> <h1 className="text-center text-red-400 font-bold text-5xl tracking-tight">StellaNeX</h1></Link>
        <h2 className="mt-5 text-center text-2xl font-semibold leading-9 tracking-tight text-white">Sign in to your account</h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-base font-medium leading-6 text-white">Email address</label>
            <div className="mt-2">
              <input id="email" name="email" type="email" autoComplete="email" required placeholder="name@company.com" value={inputId} onChange={handleInputId}
                className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6" />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-base font-medium leading-6 text-white">Password</label>
              <div className="text-sm">
                <a href="#" className="font-normal text-red-400 hover:text-red-400">Forgot password?</a>
              </div>
            </div>
            <div className="mt-2">
              <input id="password" name="password" type="password" autoComplete="current-password" placeholder="••••••••" required value={inputPw} onChange={handleInputPw}
                className="block w-full rounded-md border-0 p-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-400 sm:text-sm sm:leading-6" />
            </div>
          </div>

          <div>
            {/* type을 submit으로 주는 대신 button으로 변경 */}
            <button type="button" onClick={() => handleSubmit()}
              className="flex w-full justify-center rounded-md bg-red-400 px-3 py-2 text-base font-semibold leading-6 text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500">Login</button>
          </div>
        </form>

        <div className="mt-10 text-center text-sm text-gray-500">
          Not a member?
          <Link to="/Register" className="font-semibold leading-6 text-red-400 hover:text-red-400 ml-2 hover:underline">Sign up</Link>
          <div className="text-base mt-5">--------------------------- or ---------------------------</div>
          <div className="flex justify-center items-center mt-5">
            <div className="text-lg text-gray-400 font-medium mr-3">Sign in with</div>
            <div className="flex justify-center items-center w-10 h-10 rounded-full bg-gray-500 mr-5">
              <svg className="fill-white h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
              </svg>
            </div>
            <div className="flex justify-center items-center w-10 h-10 rounded-full bg-gray-500 mr-5">
              <svg className="fill-yellow-400 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                <path d="M147.3 114.4c0-56.2-32.5-82.4-73.4-82.4C26.2 32 0 68.2 0 113.4v283c0 47.3 25.3 83.4 74.9 83.4 39.8 0 72.4-25.6 72.4-83.4v-76.5l112.1 138.3c22.7 27.2 72.1 30.7 103.2 0 27-27.6 27.3-67.4 7.4-92.2l-90.8-114.8 74.9-107.4c17.4-24.7 17.5-63.1-10.4-89.8-30.3-29-82.4-31.6-113.6 12.8L147.3 185v-70.6z" />
              </svg>
            </div>
            <div className="flex justify-center items-center w-10 h-10 rounded-full bg-gray-500">
              <svg className="fill-green-400 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M415.4 512h-95.1L212.1 357.5v91.1L125.7 512H28V29.8L68.5 0h108.1l123.7 176.1V63.5L386.7 0h97.7v461.5zM38.8 35.3V496l72-52.9V194l215.5 307.6h84.8l52.4-38.2h-78.3L69 13zm82.5 466.6l80-58.8v-101l-79.8-114.4v220.9L49 501.9h72.3zM80.6 10.8l310.6 442.6h82.4V10.8h-79.8v317.6L170.9 10.8zM311 191.7l72 102.8V15.9l-72 53v122.7z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
