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
