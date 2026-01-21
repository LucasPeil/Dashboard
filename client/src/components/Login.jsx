import PersonIcon from '@mui/icons-material/Person';
import RocketLaunchOutlinedIcon from '@mui/icons-material/RocketLaunchOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  Box,
  Button,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  Stack,
  Alert,
} from '@mui/material';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login, reset } from '../features/auth/authSlice';
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginValue, setLoginValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showError, setShowError] = useState(false);
  const { user, login: loginState } = useSelector((state) => state.auth);
  const { isSuccess, message, isError, isLoading } = loginState;

  useEffect(() => {
    if (isSuccess) {
      navigate('/');
    }
    return () => {
      dispatch(reset('login'));
    };
  }, [user, isSuccess]);

  useEffect(() => {
    if (isError) {
      setShowError(true);
    }
  }, [user, isError]);
  return (
    <Box
      component={motion.main}
      initial={{ opacity: 0, y: 100, transition: { duration: 0.1 } }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.3, delay: 0.2 } }}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        px: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 5,
          boxSizing: 'border-box',
          width: { xs: '100%', sm: '70%', md: '50%', lg: '30%' },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 4,
        }}
      >
        <RocketLaunchOutlinedIcon sx={{ fontSize: '3rem' }} />

        <Divider
          textAlign="center"
          sx={{
            width: '100%',
            '&::before, &::after': {
              borderColor: '#000000',
            },
          }}
        >
          Dashboard
        </Divider>

        <form
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
          }}
          onSubmit={(e) => {
            e.preventDefault();
            dispatch(login({ password: passwordValue, email: loginValue }));
          }}
        >
          <FormControl fullWidth sx={{}} variant="outlined">
            <InputLabel htmlFor="login">Login </InputLabel>
            <OutlinedInput
              onChange={(e) => setLoginValue(e.target.value)}
              value={loginValue}
              id="login"
              type={'text'}
              endAdornment={
                <InputAdornment position="end">
                  <PersonIcon />
                </InputAdornment>
              }
              autoComplete="username"
              label="Login"
            />
          </FormControl>

          <FormControl fullWidth sx={{}} variant="outlined">
            <InputLabel htmlFor="password">Password </InputLabel>
            <OutlinedInput
              onChange={(e) => setPasswordValue(e.target.value)}
              value={passwordValue}
              id="password"
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              autoComplete="current-password"
              label="Password"
            />
          </FormControl>
          {showError && (
            <Alert
              severity="error"
              closeText="fechar"
              onClose={() => setShowError(false)}
            >
              {message}
            </Alert>
          )}
          <Button
            disabled={isLoading}
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: '#000000',
              width: '100%',
              fontWeight: 'bold',
              letterSpacing: '0.2rem',
            }}
          >
            Login
          </Button>
        </form>

        <Link
          style={{
            color: '#002486ff',
            fontWeight: 'semibold',
            textDecoration: 'underline',
          }}
          to={'/cadastrar'}
        >
          Não tem uma conta ainda? Cadastre-se aqui
        </Link>
      </Paper>
    </Box>
  );
};

export default Login;
