import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  name: string;
  email: string;
}

const initialState: UserState = {
  name: "",
  email: "",
};

export const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    updateUserInfo: (state, action: PayloadAction<UserState>) => ({
      ...action.payload,
    }),
    deleteUserInfo: (state) => {
      state = initialState;
    },
  },
});

export const { updateUserInfo, deleteUserInfo } = userInfoSlice.actions;

export default userInfoSlice.reducer;
