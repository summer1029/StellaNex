import React from 'react'
import Mypage from '../Component/Mypage'
import Login from '../Component/Login'
import { Link } from 'react-router-dom'

export default function Nav() {
    return (
        <div>
            <nav className="flex flex-nowrap justify-between items-center bg-black">
                <Link to = "/" className='flex items-center text-red-400 m-5'>
                    <div className='font-extrabold font-appleB text-4xl tracking-tight'>
                        StellaNeX
                    </div>
                </Link>

                <div className='flex justify-end items-center m-5'>
                    <div className="mr-3">
                        <Mypage />
                    </div>
                    <Login />
                    <Link to = '/Register' className='block lg:inline-block p-1.5 mr-3 border rounded text-lg font-appleB text-white border-white hover:text-red-400 hover:bg-white'>
                        Register
                    </Link>
                </div>
            </nav>
        </div>
    )
}
