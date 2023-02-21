import { Dispatch } from "@reduxjs/toolkit";
import { userDiaryAction } from "./user-diary-slice";
import { useDispatch } from "react-redux"; // useDispath 의 사전 생성
import type { AppDispatch } from "./index"; //  action 생성자용 Dispatch 타입

export const getRequest = (userEmail: string) => {
  return async (dispatch: Dispatch) => {
    const getUserDiaryData = async () => {
      const response = await fetch(
        `http://localhost:5000/api/diary/${userEmail}`
      );

      const responseData = await response.json();

      return responseData.data;
    };

    const userDiaryData = await getUserDiaryData();

    dispatch(userDiaryAction.putUserDiary(userDiaryData));
  };
};

export const useAppDispatch: () => AppDispatch = useDispatch;
