import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",

  initialState: {
    isLoggedIn: localStorage.getItem("movieUser") === "true",
  },

  reducers: {
    login: (state) => {
      state.isLoggedIn = true;
      localStorage.setItem("movieUser", "true");
    },

    logout: (state) => {
      state.isLoggedIn = false;
      localStorage.removeItem("movieUser");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;