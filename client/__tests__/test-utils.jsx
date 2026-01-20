import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router-dom';
import casaReducer from '../src/features/casa/casaSlice';
import lazerReducer from '../src/features/lazer/lazerSlice';
import educacaoReducer from '../src/features/educacao/educacaoSlice';
import dinheiroGastoReducer from '../src/features/visaoGeral/visaoGeralSlice';
import authReducer from '../src/features/auth/authSlice';
export function renderWithProviders(
  ui,
  {
    preloadedState = {},
    store = configureStore({
      reducer: {
        atividadesCasa: casaReducer,
        atividadesLazer: lazerReducer,
        atividadesEducacao: educacaoReducer,
        dinheiroGasto: dinheiroGastoReducer,
        auth: authReducer,
      },
      preloadedState,
    }),
    ...renderOptions
  } = {}
) {
  const Wrapper = ({ children }) => (
    <Provider store={store}>
      <BrowserRouter>{children}</BrowserRouter>
    </Provider>
  );
  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
}
