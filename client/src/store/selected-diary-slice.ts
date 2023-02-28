import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TypeUserDiary } from "./user-diary-slice";

const initialState: { userDiaryData?: TypeUserDiary } = {};

const selectedDiarySlice = createSlice({
  name: "selectedDiary",
  initialState,
  reducers: {
    selectDiary(state, action: PayloadAction<TypeUserDiary>) {
      state.userDiaryData = action.payload;
    },
  },
});

export const selectedDiaryAction = selectedDiarySlice.actions;

export default selectedDiarySlice.reducer;
