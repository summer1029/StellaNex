// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import RegisterForm from './RegisterForm';

// export default function Register() {
//   const navigate = useNavigate();

//   const handleSubmit = async (name, email, password, birth) => {
//     try {

//       if (name.trim() === "" || email.trim() === "" || password.trim() === "" || birth.trim() === "") {
//         alert("Email address, password, name and birth cannot be empty!")
//         return
//       }

//       const response = await fetch("http://192.168.56.1:8080/member/join", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           name: name,
//           email: email,
//           password: password,
//           birth: birth
//         }),
//       });
//       // json 형식이 아님
//       const data = await response.json();
//       console.log("res 결과", response)
//       console.log("데이터 결과", data)

//       if (data.status === 200) {
//         navigate("/Login"); // 회원가입 성공 시 로그인 페이지로 이동합니다.
//       } else {
//         console.error("회원가입 실패:", data.error);
//       }
//     } catch (error) {
//       console.log(error)
//       console.error('에러 발생:', error);
//       throw error; // 에러를 다시 던져서 상위 컴포넌트에서 처리할 수 있도록 합니다.
//     }
//   }

//   return <RegisterForm onSubmit={handleSubmit} />;
// }

// import React from 'react'
// import RegisterForm from './RegisterForm'

// export default function Register() {

//   const handleSubmit = (name, email, password, birth) => {

//     if (name.trim() == "" || email.trim() == "" || password.trim() == "" || birth.trim() == "") {
//       alert("Email address, password, name and birth cannot be empty!")
//       return
//     }

//     fetch("http://10.125.121.181:8080/member/join", {
//       method : "POST", 
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body : JSON.stringify({
//         name : name,
//         email : email,
//         password : password,
//         birth : birth
//       }),
//     })
//     .then(res => {
//       console.log(res)
//       res.json()})
//     .catch(err => console.log('에러 발생:', err))
//   }

//   return (
//     <RegisterForm onSubmit={handleSubmit} />
//   )
// }

import React from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterForm from './RegisterForm';

export default function Register() {
  const navigate = useNavigate();

  const handleSubmit = async (name, email, password, birth) => {
    try {
      if (name.trim() === "" || email.trim() === "" || password.trim() === "" || birth.trim() === "") {
        alert("Email address, password, name and birth cannot be empty!");
        return;
      }

      const response = await fetch("http://192.168.56.1:8080/member/join", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body : JSON.stringify({
                  name : name,
                  email : email,
                  password : password,
                  birth : birth
                }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // 응답의 Content-Type이 application/json인지 확인
      const contentType = response.headers.get("Content-Type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        console.log("데이터 결과", data);

        if (data.status === 200) {
          navigate("/Login"); // 회원가입 성공 시 로그인 페이지로 이동합니다.
        } else {
          console.error("회원가입 실패:", data.error);
        }
      } else {
        throw new Error("서버 응답이 JSON 형식이 아닙니다.");
      }
    } catch (error) {
      console.error('에러 발생:', error);
    }
  };

  return <RegisterForm onSubmit={handleSubmit} />;
}

