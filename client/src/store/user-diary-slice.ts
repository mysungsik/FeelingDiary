import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TypeUserDiary {
  _id?: string; // mongodb 자동
  userEmail: string; // OAuth 에서 온 값
  diaryTitle: string;
  diaryContent: string;
  feeling: number;
  date: string;
}

const initialState: { userDiaryData: TypeUserDiary[] } = { userDiaryData: [] };

const userDiarySlice = createSlice({
  name: "userDiary",
  initialState,
  reducers: {
    putUserDiary(state, action: PayloadAction<TypeUserDiary[]>) {
      state.userDiaryData = action.payload;
    },
    addUserDiary(state, action: PayloadAction<TypeUserDiary>) {
      state.userDiaryData = [...state.userDiaryData, action.payload];
    },
    deleteUserDiary(state, action: PayloadAction<string>) {
      state.userDiaryData = state.userDiaryData.filter(
        (diary) => diary._id !== action.payload
      );
    },
  },
});

export const userDiaryAction = userDiarySlice.actions;

export default userDiarySlice.reducer;
