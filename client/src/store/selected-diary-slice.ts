import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TypeUserDiary } from "./user-diary-slice";

const initialState: { userDiaryData?: TypeUserDiary | null } = {};

const selectedDiarySlice = createSlice({
  name: "selectedDiary",
  initialState,
  reducers: {
    selectDiary(state, action: PayloadAction<TypeUserDiary>) {
      state.userDiaryData = action.payload;
    },
    unSelectDiary(state) {
      state.userDiaryData = null;
    },
  },
});

export const selectedDiaryAction = selectedDiarySlice.actions;

export default selectedDiarySlice.reducer;
