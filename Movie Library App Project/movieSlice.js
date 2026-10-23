import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API = "http://localhost:3000/movies";

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API);
      return response.data;
    } catch {
      return rejectWithValue("Movies load nahi hui. JSON Server check karo.");
    }
  }
);

export const fetchMovieById = createAsyncThunk(
  "movies/fetchMovieById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API}/${id}`);
      return response.data;
    } catch {
      return rejectWithValue("Movie details nahi mili.");
    }
  }
);

const movieSlice = createSlice({
  name: "movies",

  initialState: {
    list: [],
    selectedMovie: null,
    loading: false,
    error: "",
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error loading movies";
      })
      .addCase(fetchMovieById.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.selectedMovie = null;
      })
      .addCase(fetchMovieById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedMovie = action.payload;
      })
      .addCase(fetchMovieById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error loading movie";
      });
  },
});

export default movieSlice.reducer;