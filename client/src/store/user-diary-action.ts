import { Dispatch } from "@reduxjs/toolkit";
import { userDiaryAction } from "./user-diary-slice";
import { useDispatch } from "react-redux"; // useDispath 의 사전 생성
import type { AppDispatch } from "./index"; //  action 생성자용 Dispatch 타입
import { getUserDairy } from "../api/user-diary"; // 유저데이터 api

export const getRequest = (userEmail: string) => {
  return async (dispatch: Dispatch) => {
    const userDiaryData = await getUserDairy(userEmail);

    dispatch(userDiaryAction.putUserDiary(userDiaryData));
  };
};

export const useAppDispatch: () => AppDispatch = useDispatch;
