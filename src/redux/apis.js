import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUser = createAsyncThunk(
  "addUserSlice/fetchUser",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/api/users/banks");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const dashboardMain = createAsyncThunk(
  "addUserSlice/dashoboardMain",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/api/dashboard");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const dashboardToday = createAsyncThunk(
  "addUserSlice/dashboardToday",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/api/dashboard/today");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
