import { configureStore } from "@reduxjs/toolkit";

import userDiarySlice from "./user-diary-slice";

export const store = configureStore({
  reducer: { userDiary: userDiarySlice },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
