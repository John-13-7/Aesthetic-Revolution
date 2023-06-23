import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    isLogged: false,
    data: "",
  },
  reducers: {
    login: (state, action) => {
      state.isLogged = true;
      state.data = action.payload;
    },
    logout: (state) => {
      state.isLogged = false;
      state.data = "";
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
