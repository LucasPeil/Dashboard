import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import authService from './authService';

const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
  user: user ? user : null,

  cadastrar: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: '',
  },
  login: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: '',
  },
  resetPassword: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: '',
  },
};

export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  try {
    return await authService.login(user);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});
export const cadastrar = createAsyncThunk(
  'auth/cadastrar',
  async (userData, thunkAPI) => {
    try {
      return await authService.cadastrarUser(userData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const logout = createAsyncThunk('auth/logout', async () => {
  return await authService.logout();
});

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (newPassword, thunkAPI) => {
    try {
      return await authService.resetPassword(newPassword);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state, action) => {
      const type = action.payload; // 'login' or 'cadastrar' or 'resetPassword'
      if (type && state[type]) {
        state[type] = initialState[type];
      } else {
        state.cadastrar = initialState.cadastrar;
        state.login = initialState.login;
        state.resetPassword = initialState.resetPassword;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.login.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.login.isLoading = false;
        state.login.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.login.isLoading = false;
        state.login.isSuccess = false;
        state.login.isError = true;

        state.login.message = action.payload;
      })
      .addCase(cadastrar.pending, (state) => {
        state.cadastrar.isLoading = true;
      })
      .addCase(cadastrar.fulfilled, (state, action) => {
        state.cadastrar.isLoading = false;
        state.cadastrar.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(cadastrar.rejected, (state, action) => {
        state.cadastrar.isLoading = false;
        state.cadastrar.isSuccess = false;
        state.cadastrar.isError = true;
        state.cadastrar.message = action.payload;
      })
      .addCase(resetPassword.pending, (state) => {
        state.resetPassword.isLoading = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.resetPassword.isLoading = false;
        state.resetPassword.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.resetPassword.isLoading = false;
        state.resetPassword.isSuccess = false;
        state.resetPassword.isError = true;
        state.resetPassword.message = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
