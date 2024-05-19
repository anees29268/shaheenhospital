import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUser } from "./apis";

const initialState = {
  mode: "light",
  isLoaderLoading: false,
  user: null,
};

const Slice = createSlice({
  name: "addUserSlice",
  initialState,
  reducers: {
    changeMode: (state, action) => {
      state.mode = action.payload;
    },
    changeSidebarMode: (state, action) => {
      state.isSidebarOpen = action.payload;
    },
    changeLoadingLoader: (state) => {
      state.isLoaderLoading = !state.isLoaderLoading;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        // Handle rejected state if needed
      });
  },
});

export const { changeMode, changeSidebarMode, changeLoadingLoader } =
  Slice.actions;

export default Slice.reducer;
