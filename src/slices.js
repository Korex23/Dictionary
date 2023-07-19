import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
});

export const selectUser = (state) => state.user.value;
export default userSlice.reducer;
