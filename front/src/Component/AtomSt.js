// 전역 변수 생성 (변동이 일어날때 다른 컴포넌트에서도 반영)

import { atom } from "recoil";

export const stLogin = atom({
    key : "stLogin",
    default : false
})

export const userEmail = atom({
    key : "userEmail",
    default : ""
})
