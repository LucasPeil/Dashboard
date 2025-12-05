import { configureStore } from "@reduxjs/toolkit";

import casaReducer from "./features/casa/casaSlice";
import lazerReducer from "./features/lazer/lazerSlice";
import educacaoReducer from "./features/educacao/educacaoSlice";
import dinheiroGastoReducer from "./features/visaoGeral/visaoGeralSlice";
import authReducer from "./features/auth/authSlice";
const store = configureStore({
  reducer: {
    atividadesCasa: casaReducer,
    atividadesLazer: lazerReducer,
    atividadesEducacao: educacaoReducer,
    dinheiroGasto: dinheiroGastoReducer,
    auth: authReducer,
  },
});

export default store;
