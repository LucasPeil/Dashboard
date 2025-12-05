import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import visaoGeralService from "./visaoGeralService";
const initialState = {
  dinheiroGasto: {},
  isLoading: false,
  isSuccess: false,
  isError: false,
};

export const getTotalDinheiroGasto = createAsyncThunk(
  "visaoGeral/getTotalDinheiroGasto",
  async (ano, thunkAPI) => {
    try {
      return await visaoGeralService.getDinheiroGasto(ano);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const dinheiroGastoSlice = createSlice({
  name: "dinheiroGasto",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTotalDinheiroGasto.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTotalDinheiroGasto.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.dinheiroGasto = action.payload;
      })
      .addCase(getTotalDinheiroGasto.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
      });
  },
});

export const { reset } = dinheiroGastoSlice.actions;

export default dinheiroGastoSlice.reducer;
