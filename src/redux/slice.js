import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { dashboardMain, dashboardToday, fetchUser } from "./apis";

const initialState = {
  mode: "light",
  isLoaderLoading: false,
  user: null,
  mainData: null,
  todayData: null,
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
      })
      .addCase(dashboardMain.fulfilled, (state, action) => {
        state.mainData = action.payload;
      })
      .addCase(dashboardMain.rejected, (state, action) => {
        // Handle rejected state if needed
      })
      .addCase(dashboardToday.fulfilled, (state, action) => {
        state.todayData = action.payload;
      })
      .addCase(dashboardToday.rejected, (state, action) => {
        // Handle rejected state if needed
      });
  },
});

export const { changeMode, changeSidebarMode, changeLoadingLoader } =
  Slice.actions;

export default Slice.reducer;
