import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import lazerService from "./lazerService";

const initialState = {
  atividadesLazer: [],
  atividadeLazer: {},
  quantidadeJogos: 0,
  quantidadeCultura: 0,
  quantidadeEmGrupo: 0,
  quantidadeOutros: 0,
  isSuccess: false,
  isLoading: false,
  isError: false,
  openModalLazer: false,
  register: {
    isSuccess: false,
    isLoading: false,
    isError: false,
  },
  update: {
    isSuccess: false,
    isLoading: false,
    isError: false,
  },
  remove: {
    isSuccess: false,
    isLoading: false,
    isError: false,
  },

  message: "",
};

export const getJogosQty = createAsyncThunk(
  "atividadesLazer/getJogosQty",
  async (id, thunkAPI) => {
    try {
      return await lazerService.getJogosQty();
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
export const getCulturaQty = createAsyncThunk(
  "atividadesLazer/getCulturaQty",
  async (id, thunkAPI) => {
    try {
      return await lazerService.getCulturaQty();
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
export const getEmGrupoQty = createAsyncThunk(
  "atividadesLazer/getEmGrupoQty",
  async (id, thunkAPI) => {
    try {
      return await lazerService.getEmGrupoQty();
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
export const getOutrosQty = createAsyncThunk(
  "atividadesLazer/getOutrosQty",
  async (id, thunkAPI) => {
    try {
      return await lazerService.getOutrosQty();
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

export const getAllAtividadesLazer = createAsyncThunk(
  "atividadesLazer/get",
  async (params, thunkAPI) => {
    try {
      return await lazerService.getAllAtividadesLazer(params);
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

export const setNewAtividadeLazer = createAsyncThunk(
  "atividadesLazer/post",
  async (data, thunkAPI) => {
    try {
      return await lazerService.setNewAtividadeLazer(data);
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

export const getSingleAtividadeLazer = createAsyncThunk(
  "atividadesLazer/getId",
  async (id, thunkAPI) => {
    try {
      return await lazerService.getSingleAtividadeLazer(id);
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

export const removeSingleAtividadeLazer = createAsyncThunk(
  "atividadesLazer/delete",
  async (id, thunkAPI) => {
    try {
      return await lazerService.removeSingleAtividadeLazer(id);
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

export const lazerSlice = createSlice({
  name: "lazerSlice",
  initialState,
  reducers: {
    resetRegisterLazer(state) {
      state.register.isSuccess = false;
      state.register.isLoading = false;
      state.register.isError = false;
    },
    resetUpdateLazer(state) {
      state.update.isSuccess = false;
      state.update.isLoading = false;
      state.update.isError = false;
    },
    resetRemoveLazer(state) {
      state.remove.isSuccess = false;
      state.remove.isLoading = false;
      state.remove.isError = false;
    },
    reset(state) {
      state.isSuccess = false;
      state.isLoading = false;
      state.isError = false;
    },
    setOpenModalLazer(state) {
      state.openModalLazer = true;
    },
    closeModalLazer(state) {
      state.openModalLazer = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setNewAtividadeLazer.pending, (state) => {
        state.register.isLoading = true;
      })
      .addCase(setNewAtividadeLazer.fulfilled, (state, action) => {
        state.register.isError = false;
        state.register.isSuccess = true;
        state.register.message = action.payload.message;
        state.atividadeLazer = action.payload.atividadeLazer;
        state.atividadesLazer.documents.unshift(state.atividadeLazer);
        state.register.isLoading = false;
      })
      .addCase(setNewAtividadeLazer.rejected, (state, action) => {
        state.register.isLoading = false;
        state.register.isSuccess = false;
        state.register.isError = true;
        state.message = action.payload;
      })
      .addCase(getJogosQty.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(getJogosQty.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.quantidadeJogos = action.payload.jogosQuantidade;
      })
      .addCase(getJogosQty.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getCulturaQty.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(getCulturaQty.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.quantidadeCultura = action.payload.culturaQuantidade;
      })
      .addCase(getCulturaQty.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getEmGrupoQty.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(getEmGrupoQty.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.quantidadeEmGrupo = action.payload.emGrupoQuantidade;
      })
      .addCase(getEmGrupoQty.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getOutrosQty.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(getOutrosQty.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.quantidadeOutros = action.payload.outrosQuantidade;
      })
      .addCase(getOutrosQty.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAllAtividadesLazer.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(getAllAtividadesLazer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.atividadesLazer = action.payload;
      })
      .addCase(getAllAtividadesLazer.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(getSingleAtividadeLazer.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(getSingleAtividadeLazer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.atividadeLazer = action.payload;
      })
      .addCase(getSingleAtividadeLazer.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(removeSingleAtividadeLazer.pending, (state) => {
        state.remove.isLoading = true;
        state.remove.isError = false;
        state.remove.isSuccess = false;
      })
      .addCase(removeSingleAtividadeLazer.fulfilled, (state, action) => {
        state.remove.isLoading = false;
        state.remove.isError = false;
        state.remove.isSuccess = true;
        const idx = state.atividadesLazer.documents.findIndex(
          (atividade) => atividade._id === action.payload.atividade._id
        );
        state.atividadesLazer.documents.splice(idx, 1);

        state.remove.message = action.payload.message;
      })
      .addCase(removeSingleAtividadeLazer.rejected, (state, action) => {
        state.remove.isLoading = false;
        state.remove.isSuccess = false;
        state.remove.isError = true;
      });
  },
});

export const {
  reset,
  resetRegisterLazer,
  resetRemoveLazer,
  resetUpdateLazer,
  setOpenModalLazer,
  closeModalLazer,
} = lazerSlice.actions;

export default lazerSlice.reducer;
