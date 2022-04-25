import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { UserDataInterface } from "../type/type";

const slice = createSlice({
  name: "auth",
  initialState: { user: null, token: null } as {
    user: null | UserDataInterface;
    token: null | string;
  },
  reducers: {
    setCredentials: (
      state,
      {
        payload: { user, token },
      }: PayloadAction<{ user: UserDataInterface | null; token: string | null }>
    ) => {
      state.user = user;
      state.token = token;
    },
  },
  extraReducers: (builder) => {},
});

export const { setCredentials } = slice.actions;

export default slice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
