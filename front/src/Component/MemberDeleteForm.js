import React, { useState } from "react";
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MemberDeletePage = () => {

    const [email, setEmail] = useState("");
    const [confirmedEmail, setConfirmedEmail] = useState("");

    const toastSuccess = (message) => {
        toast.success(message)
    }

    const toastErr = (message) => {
        toast.error(message)
    }

    // 회원 계정을 삭제하는 함수
    const handleDelete = async (e) => {
        e.preventDefault();

        if (email !== confirmedEmail) {
            // return alert('Confirmed email is wrong')
            return toastErr('Confirmed email is wrong')
        }

        fetch("http://192.168.56.1:8080/member/delete", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("loginToken")
            }
        })
            .then((res) => {
                if (res.ok) {
                    // alert("회원 계정 삭제 성공")
                    toastSuccess("회원 계정 삭제 성공");

                      // localStorage에서 특정 항목 제거
                      localStorage.removeItem("loginToken");
                      localStorage.removeItem("userId");
                      localStorage.removeItem("userRole");

                    window.location.href = "http://192.168.56.1:3000/";
                } else {
                    throw new Error("회원 계정 삭제 실패");
                }
            })
            .catch((err) => {
                console.error(err);
                // alert('회원 계정 삭제 중 오류 발생')
                toastErr('회원 계정 삭제 중 오류 발생');
            });
    };

    return (
        <div>
            <div className="bg-black min-h-screen flex justify-center items-center">
                <div className="w-full max-w-md p-8 bg-white rounded-lg">
                    <div className="text-2xl font-extrabold text-center text-red-400 mb-5">회원 계정 삭제</div>
                    <div className="text-1xl font-bold text-center text-red-400 mb-5">정말로 계정을 삭제하시겠습니까? <br /> 이메일 확인을 진행해주세요</div>
                    <form className="space-y-2 md:space-y-3">
                        <div>
                            <label htmlFor="email" className="block mb-2 text-base font-medium text-gray-900">Email</label>
                            <input type="text" name="email" id="email" 
                            className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " 
                            value = {email}  onChange={(e) => setEmail(e.target.value)} // 입력할 때 상태 업데이트 
                            required="" />
                        </div>
                        <div>
                            <label htmlFor="confirm-email" className="block mb-2 text-base font-medium text-gray-900">Confirm email</label>
                            <input type="text" name="confirm-email" id="confirm-email" 
                            className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                            value={confirmedEmail} onChange={(e) => setConfirmedEmail(e.target.value)} // 입력할 때 상태 업데이트
                            required="" />
                        </div>
                        <button onClick={handleDelete}
                            className="w-full text-white bg-red-400 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-semibold rounded-lg text-base px-5 py-2.5 text-center">Delete</button>
                    </form>
                </div>
            </div>
            <ToastContainer transition={Bounce} />
        </div>
    );
};

export default MemberDeletePage;
