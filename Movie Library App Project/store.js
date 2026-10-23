import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./movieSlice.js";
import authReducer from "./authSlice.js";

export const store = configureStore({
  reducer: {
    movies: movieReducer,
    auth: authReducer,
  },
});