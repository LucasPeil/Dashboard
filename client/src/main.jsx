import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { Provider } from 'react-redux';
import store from './store.js';

import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login.jsx';
import ProtectedRoutes from './components/ProtectedRoutes.jsx';
import Cadastrar from './components/Cadastrar.jsx';
const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 568,
      md: 800,
      lg: 1024,
      xl: 1336,
      xxl: 1536,
    },
  },
  palette: {
    primary: {
      main: '#6a807a', // azul escuro
      light: '#b387e2', // azul escuro
      dark: '#38165c',
    },
    secondary: {
      main: '#FFB703', //amarelo queimado
      light: '#ffd364',
      dark: '#FB8500',
    },
    greyBlue: {
      main: '#219EBC', // azul acinzentado
      light: '#3bbedf',
      dark: '#004d6f',
      contrastText: '#000000',
    },
    vividBlue: {
      main: '#1b89d3', // azul acinzentado
      light: '#80CBFC',
      dark: '#157bbe',
      contrastText: '#000000',
    },
    vividRed: {
      main: '#D62828', // azul acinzentado
      light: '#fa8282',
      dark: '#c52525',
      contrastText: '#000000',
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          <Routes>
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/cadastrar" element={<Cadastrar />} />
            {/*   <Route path="/resetPassword" element={<Login />} /> */}
            <Route
              exact
              path="*"
              element={
                <ProtectedRoutes>
                  <App />
                </ProtectedRoutes>
              }
            />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
