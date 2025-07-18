import React from 'react'
import { Link } from 'react-router-dom'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

export default function Mypage() {

    const userRole = localStorage.getItem("userRole")
    const userId = localStorage.getItem("userId");  // localStorage에서 USERID를 가져옴

    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                    <svg className="h-7 w-7 mr-3 text-gray-900" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
                        <title>Profile</title>
                        <path fill="currentColor" d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
                    </svg>
                    <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                </Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">

                    <Menu.Item>
                            {({ active }) => (
                                <Link to={`/user/${userId}`}  // USERID를 URL에 포함
                                    href="#"
                                    className={`block w-full px-4 py-2 text-left text-sm ${active ? 'bg-gray-100 text-black' : 'text-gray-700'}`}>
                                    마이페이지
                                </Link>
                            )}
                        </Menu.Item>

                        <Menu.Item>
                            {({ active }) => (
                                <Link to='/memberUpdate'
                                    href="#"
                                    className={`block w-full px-4 py-2 text-left text-sm ${active ? 'bg-gray-100 text-black' : 'text-gray-700'}`}>
                                    회원 정보 수정
                                </Link>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <Link to='/memberDelete'
                                    href="#"
                                    className={`block w-full px-4 py-2 text-left text-sm ${active ? 'bg-gray-100 text-black' : 'text-gray-700'}`}>
                                    회원 탈퇴
                                </Link>
                            )}
                        </Menu.Item>
                        {userRole == 'admin' && ( // 관리자 메뉴 추가
                            <Menu.Item>
                                {({ active }) => (
                                    <Link to='/Admin'
                                        className={`block w-full px-4 py-2 text-left text-sm ${active ? 'bg-gray-100 text-black' : 'text-gray-700'}`}>
                                        관리자 페이지
                                    </Link>
                                )}
                            </Menu.Item>
                        )}
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}
