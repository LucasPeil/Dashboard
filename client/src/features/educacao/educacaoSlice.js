import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import educacaoService from "./educacaoService";

const initialState = {
  atividadesEducacao: [],
  atividadeEducacao: {},
  quantidadeLivros: 0,
  quantidadeCursos: 0,
  isSuccess: false,
  isLoading: false,
  isError: false,
  openModalEducacao: false,
  register: {
    isSuccess: false,
    isLoading: false,
    isError: false,
    message: "",
  },
  update: {
    isSuccess: false,
    isLoading: false,
    isError: false,
    message: "",
  },
  remove: {
    isSuccess: false,
    isLoading: false,
    isError: false,
    message: "",
  },

  message: "",
};
export const getCursosQty = createAsyncThunk(
  "atividadesEducacao/getCursosQty",
  async (id, thunkAPI) => {
    try {
      return await educacaoService.getCursosQty();
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
export const getLivrosQty = createAsyncThunk(
  "atividadesEducacao/getLivrosQty",
  async (id, thunkAPI) => {
    try {
      return await educacaoService.getLivrosQty();
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
export const getAllAtividadesEducacao = createAsyncThunk(
  "atividadesEducacao/get",
  async (params, thunkAPI) => {
    try {
      return await educacaoService.getAllAtividadesEducacao(params);
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

export const setNewAtividadeEducacao = createAsyncThunk(
  "atividadesEducacao/post",
  async (data, thunkAPI) => {
    try {
      return await educacaoService.setNewAtividadeEducacao(data);
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

export const getSingleAtividadeEducacao = createAsyncThunk(
  "atividadesEducacao/getId",
  async (id, thunkAPI) => {
    try {
      return await educacaoService.getSingleAtividadeEducacao(id);
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

export const removeSingleAtividadeEducacao = createAsyncThunk(
  "atividadesEducacao/delete",
  async (id, thunkAPI) => {
    try {
      return await educacaoService.removeSingleAtividadeEducacao(id);
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

export const educacaoSlice = createSlice({
  name: "educacaoSlice",
  initialState,
  reducers: {
    resetRegisterEducacao(state) {
      state.register.isSuccess = false;
      state.register.isLoading = false;
      state.register.isError = false;
    },
    resetUpdateEducacao(state) {
      state.update.isSuccess = false;
      state.update.isLoading = false;
      state.update.isError = false;
    },
    resetRemoveEducacao(state) {
      state.remove.isSuccess = false;
      state.remove.isLoading = false;
      state.remove.isError = false;
    },
    resetEducacao(state) {
      state.isSuccess = false;
      state.isLoading = false;
      state.isError = false;
    },
    setOpenModalEducacao(state) {
      state.openModalEducacao = true;
    },
    closeModalEducacao(state) {
      state.openModalEducacao = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setNewAtividadeEducacao.pending, (state) => {
        state.register.isLoading = true;
      })
      .addCase(setNewAtividadeEducacao.fulfilled, (state, action) => {
        state.register.isError = false;
        state.register.isSuccess = true;
        state.register.message = action.payload.message;
        state.atividadeEducacao = action.payload.atividadeEducacao;
        state.atividadesEducacao.documents.unshift(state.atividadeEducacao);
        state.register.isLoading = false;
      })
      .addCase(setNewAtividadeEducacao.rejected, (state, action) => {
        state.register.isLoading = false;
        state.register.isSuccess = false;
        state.register.isError = true;
        state.message = action.payload;
      })
      .addCase(getCursosQty.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(getCursosQty.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.quantidadeCursos = action.payload.cursosQuantidade;
      })
      .addCase(getCursosQty.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getLivrosQty.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(getLivrosQty.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.quantidadeLivros = action.payload.livrosQuantidade;
      })
      .addCase(getLivrosQty.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAllAtividadesEducacao.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(getAllAtividadesEducacao.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.atividadesEducacao = action.payload;
      })
      .addCase(getAllAtividadesEducacao.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(getSingleAtividadeEducacao.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(getSingleAtividadeEducacao.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.atividadeEducacao = action.payload;
      })
      .addCase(getSingleAtividadeEducacao.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(removeSingleAtividadeEducacao.pending, (state) => {
        state.remove.isLoading = true;
        state.remove.isError = false;
        state.remove.isSuccess = false;
      })
      .addCase(removeSingleAtividadeEducacao.fulfilled, (state, action) => {
        state.remove.isLoading = false;
        state.remove.isError = false;
        state.remove.isSuccess = true;
        const idx = state.atividadesEducacao.documents.findIndex(
          (atividade) => atividade._id === action.payload.atividade._id
        );
        state.atividadesEducacao.documents.splice(idx, 1);

        state.remove.message = action.payload.message;
      })
      .addCase(removeSingleAtividadeEducacao.rejected, (state, action) => {
        state.remove.isLoading = false;
        state.remove.isSuccess = false;
        state.remove.isError = true;
      });
  },
});

export const {
  reset,
  resetRegisterEducacao,
  resetRemoveEducacao,
  resetUpdateEducacao,
  setOpenModalEducacao,
  closeModalEducacao,
} = educacaoSlice.actions;

export default educacaoSlice.reducer;
