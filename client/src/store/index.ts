import { configureStore } from "@reduxjs/toolkit";

import userDiarySlice from "./user-diary-slice";
import selectedDiarySlice from "./selected-diary-slice";

export const store = configureStore({
  reducer: { userDiary: userDiarySlice, selectedDiary: selectedDiarySlice },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
