import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import casaService from './casaService';

const initialState = {
  atividadesCasa: [],
  atividadeCasa: {},
  quantidadeCompras: 0,
  quantidadeLimpeza: 0,
  quantidadeRefeicoes: 0,
  isSuccess: false,
  isLoading: false,
  isError: false,
  singleAtividadeCasa: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: '',
  },
  register: {
    isSuccess: false,
    isLoading: false,
    isError: false,
    message: '',
  },
  update: {
    isSuccess: false,
    isLoading: false,
    isError: false,
    message: '',
  },
  remove: {
    isSuccess: false,
    isLoading: false,
    isError: false,
    message: '',
  },

  message: '',
};

export const setNewAtividadeCasa = createAsyncThunk(
  'atividadeCasa/post',
  async (data, thunkAPI) => {
    try {
      return await casaService.setNewAtividadeCasa(data);
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
export const getAllAtividadesCasa = createAsyncThunk(
  'atividadesCasa/getAll',
  async (params, thunkAPI) => {
    try {
      return await casaService.getAllAtividadesCasa(params);
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

export const getSingleAtividadeCasa = createAsyncThunk(
  'atividadesCasa/getId',
  async (id, thunkAPI) => {
    try {
      return await casaService.getSingleAtividadeCasa(id);
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
export const removeSingleAtividadeCasa = createAsyncThunk(
  'atividadesCasa/remove',
  async ({ id, userId }, thunkAPI) => {
    try {
      return await casaService.removeSingleAtividadeCasa({ id, userId });
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
export const getComprasQty = createAsyncThunk(
  'atividadesCasa/getComprasQty',
  async (_, thunkAPI) => {
    try {
      return await casaService.getComprasQty();
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
export const getLimpezaQty = createAsyncThunk(
  'atividadesCasa/getLimpezaQty',
  async (_, thunkAPI) => {
    try {
      return await casaService.getLimpezaQty();
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
export const getRefeicoesQty = createAsyncThunk(
  'atividadesCasa/getRefeicoesQty',
  async (_, thunkAPI) => {
    try {
      return await casaService.getRefeicoesQty();
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
export const casaSlice = createSlice({
  name: 'casaSlice',
  initialState,
  reducers: {
    resetRegisterCasa(state) {
      state.register.isSuccess = false;
      state.register.isLoading = false;
      state.register.isError = false;
    },
    resetUpdateCasa(state) {
      state.update.isSuccess = false;
      state.update.isLoading = false;
      state.update.isError = false;
    },
    resetRemoveCasa(state) {
      state.remove.isSuccess = false;
      state.remove.isLoading = false;
      state.remove.isError = false;
    },
    resetGetSingleAtividadeCasa(state) {
      state.singleAtividadeCasa.isSuccess = false;
      state.singleAtividadeCasa.isLoading = false;
      state.singleAtividadeCasa.isError = false;
      state.atividadeCasa = {};
    },
    reset(state) {
      state.isSuccess = false;
      state.isLoading = false;
      state.isError = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setNewAtividadeCasa.pending, (state) => {
        state.register.isLoading = true;
      })
      .addCase(setNewAtividadeCasa.fulfilled, (state, action) => {
        state.register.isError = false;
        state.register.isSuccess = true;
        state.register.message = action.payload.message;
        state.atividadeCasa = action.payload.atividadeCasa;

        state.atividadesCasa.documents.unshift(state.atividadeCasa);
        state.register.isLoading = false;
      })
      .addCase(setNewAtividadeCasa.rejected, (state, action) => {
        state.register.isLoading = false;
        state.register.isSuccess = false;
        state.register.isError = true;
        state.message = action.payload;
      })
      .addCase(getAllAtividadesCasa.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(getAllAtividadesCasa.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.atividadesCasa = action.payload;
      })
      .addCase(getAllAtividadesCasa.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(getSingleAtividadeCasa.pending, (state) => {
        state.singleAtividadeCasa.isLoading = true;
        state.singleAtividadeCasa.isError = false;
        state.singleAtividadeCasa.isSuccess = false;
      })
      .addCase(getSingleAtividadeCasa.fulfilled, (state, action) => {
        state.singleAtividadeCasa.isLoading = false;
        state.singleAtividadeCasa.isError = false;
        state.singleAtividadeCasa.isSuccess = true;
        state.atividadeCasa = action.payload;
      })
      .addCase(getSingleAtividadeCasa.rejected, (state, action) => {
        state.singleAtividadeCasa.isLoading = false;
        state.singleAtividadeCasa.isSuccess = false;
        state.singleAtividadeCasa.isError = true;
        state.singleAtividadeCasa.message = action.payload;
      })
      .addCase(getComprasQty.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(getComprasQty.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.quantidadeCompras = action.payload.comprasQuantidade;
      })
      .addCase(getComprasQty.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getLimpezaQty.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(getLimpezaQty.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.quantidadeLimpeza = action.payload.limpezaQuantidade;
      })
      .addCase(getLimpezaQty.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getRefeicoesQty.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(getRefeicoesQty.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.quantidadeRefeicoes = action.payload.refeicoesQuantidade;
      })
      .addCase(getRefeicoesQty.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(removeSingleAtividadeCasa.pending, (state) => {
        state.remove.isLoading = true;
        state.remove.isError = false;
        state.remove.isSuccess = false;
      })
      .addCase(removeSingleAtividadeCasa.fulfilled, (state, action) => {
        state.remove.isLoading = false;
        state.remove.isError = false;
        state.remove.isSuccess = true;

        const idx = state.atividadesCasa.documents.findIndex(
          (atividade) => atividade._id === action.payload.atividade._id,
        );
        state.atividadesCasa.documents.splice(idx, 1);

        state.remove.message = action.payload.message;
      })
      .addCase(removeSingleAtividadeCasa.rejected, (state, action) => {
        state.remove.isLoading = false;
        state.remove.isSuccess = false;
        state.remove.isError = true;
      });
  },
});

export const {
  reset,
  resetRegisterCasa,
  resetRemoveCasa,
  resetUpdateCasa,
  setOpenModalCasa,
  closeModalCasa,
  resetGetSingleAtividadeCasa,
} = casaSlice.actions;

export default casaSlice.reducer;
