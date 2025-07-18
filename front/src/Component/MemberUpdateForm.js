import React, { useState } from "react";
import { userEmail } from "./AtomSt";
import { useRecoilState } from "recoil";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MemberUpdatePage = () => {
    const [password, setPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");
    const [userId] = useRecoilState(userEmail);

    // 회원 정보를 업데이트하는 함수
    const handleUpdate = async (e) => {
        e.preventDefault();

        if (password !== confirmedPassword) {
            return alert('Confirmed password is wrong')
        }

        fetch("http://192.168.56.1:8080/member/update", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("loginToken"),
            },
            body: JSON.stringify({ password: password }), // JSON 형태로 데이터 전송
        })
            .then(res => res.json())
            .then(data => {
                if (data.message === "비밀번호가 성공적으로 변경되었습니다.") {
                    alert("비밀번호가 성공적으로 변경되었습니다.")
                    window.location.href = "http://192.168.56.1:3000/" // 이거는 컴퓨터 ip주소로
                }
            })
            .catch((err) => console.error(err));
    };

    return (
        <div className="bg-black min-h-screen flex justify-center items-center">
            <div className="w-full max-w-md p-8 bg-white rounded-lg">
                <div className="text-2xl font-extrabold text-center text-red-400 mb-5">비밀번호 변경</div>
                <form className="space-y-2 md:space-y-3">
                    <div>
                        <label htmlFor="name" className="block mb-2 text-base font-medium text-gray-900">Name</label>
                        <div className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5">
                            {localStorage.getItem("userId")}
                        </div>
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-base font-medium text-gray-900">New password</label>
                        <input type="text" name="password" id="password" onChange={(e) => setPassword(e.target.value)} className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " required="" />
                    </div>
                    <div>
                        <label htmlFor="confirm-password" className="block mb-2 text-base font-medium text-gray-900">Confirm password</label>
                        <input type="confirm-password" name="confirm-password" id="confirm-password" onChange={(e) => setConfirmedPassword(e.target.value)} className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " required="" />
                    </div>
                    <button onClick={handleUpdate}
                        className="w-full text-white bg-red-400 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-semibold rounded-lg text-base px-5 py-2.5 text-center">Update</button>
                </form>
            </div>
        </div>
    );
};

export default MemberUpdatePage;