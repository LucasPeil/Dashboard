import { configureStore } from "@reduxjs/toolkit";

import casaReducer from "./features/casa/casaSlice";
import lazerReducer from "./features/lazer/lazerSlice";
import educacaoReducer from "./features/educacao/educacaoSlice";
import dinheiroGastoReducer from "./features/visaoGeral/visaoGeralSlice";
import authReducer from "./features/auth/authSlice";
import axios from "axios";
const store = configureStore({
  reducer: {
    atividadesCasa: casaReducer,
    atividadesLazer: lazerReducer,
    atividadesEducacao: educacaoReducer,
    dinheiroGasto: dinheiroGastoReducer,
    auth: authReducer,
  },
});

axios.interceptors.response.use(
    response => response,
    error => {
        if(error.response.status === 401){
           localStorage.removeItem("user")
           window.location.href = import.meta.env.BASE_URL + '/login'
        }else{
            return Promise.reject(error);
        }
    }
    )
export default store;
