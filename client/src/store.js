import { configureStore } from '@reduxjs/toolkit';

import casaReducer from './features/casa/casaSlice';
import lazerReducer from './features/lazer/lazerSlice';
import educacaoReducer from './features/educacao/educacaoSlice';
import dinheiroGastoReducer from './features/visaoGeral/visaoGeralSlice';
import authReducer from './features/auth/authSlice';
import axios from 'axios';
const store = configureStore({
  reducer: {
    atividadesCasa: casaReducer,
    atividadesLazer: lazerReducer,
    atividadesEducacao: educacaoReducer,
    dinheiroGasto: dinheiroGastoReducer,
    auth: authReducer,
  },
});

axios.defaults.withCredentials = true;

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('user');
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);
export default store;
