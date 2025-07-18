import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Admin() {
    const [memberList, setMemberList] = useState();

    const getMember = () => {
        fetch(`http://192.168.56.1:8080/member/list`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("loginToken"),
              }
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("Received member list:", data); // 데이터 출력
                setMemberList(data);
            })
            .catch((err) => console.error(err));
    };

    useEffect(() => {
        getMember();
    }, []);

    // 역할 변경 요청 함수
    const updateUserRole = (email, newRole) => {
        console.log("Selected email:", email)
        
        fetch(`http://192.168.56.1:8080/member/updateRole?email=${email}&role=${newRole}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("loginToken"),
            },
        })
        .then((res) => res.json())
        .then((data) => {
            console.log("Role updated:", data);
            getMember(); // 변경된 목록을 다시 받아오기
        })
        .catch((err) => console.error(err));
    };
    
    return (
        <div className="flex flex-col h-screen">
            <nav className="flex flex-nowrap justify-between items-center bg-black">
                <Link to="/" className='font-extrabold font-appleB text-4xl text-red-400 m-5 tracking-tight'>
                    StellaNeX
                </Link>
            </nav>

            <div className='flex-col bg-zinc-800 w-full h-auto'>
                <div id="admin-page" className="bg-white m-5 p-5 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold font-appleB text-red-400 mb-4">사용자 목록</h2>
                    <table className="table-auto w-full text-left">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="px-4 py-2">Username</th>
                                <th className="px-4 py-2">User Type</th>
                                <th className="px-4 py-2">Action</th>
                            </tr>
                        </thead>
                        <tbody id="user-list">
                            {memberList && memberList.filter((member) => member.role !== "admin").map((member) => (
                                <tr key={member.email}> {/* unique key로 email 사용 */}
                                    <td className="border px-4 py-2">{member.name}</td> {/* 사용자 이름 */}
                                    <td className="border px-4 py-2">{member.role}</td> {/* 사용자 역할 */}
                                    <td className="border px-4 py-2">
                                        <td className="px-4 py-2">
                                            {member.role === "user" ? (
                                                <button 
                                                    onClick={() => updateUserRole(member.email, "critic")}
                                                    className="bg-red-400 text-white py-1 px-2 rounded">
                                                        평론가로 변경
                                                </button>
                                            ) : member.role === "critic" ? (
                                                <button 
                                                    onClick={() => updateUserRole(member.email, "user")}  
                                                    className="bg-red-400 text-white py-1 px-2 rounded">
                                                        일반 사용자로 변경
                                                </button>
                                            ) : (
                                                <div></div> 
                                            )}
                                        </td>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
