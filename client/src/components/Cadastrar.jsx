import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PersonIcon from '@mui/icons-material/Person';
import RocketLaunchOutlinedIcon from '@mui/icons-material/RocketLaunchOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  Alert,
  Box,
  Button,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  TextField,
} from '@mui/material';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { cadastrar, reset } from '../features/auth/authSlice';

const Cadastrar = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [usernameValue, setUsernameValue] = useState('');
  const [confirmPasswordValue, setConfirmPasswordValue] = useState('');

  const { user, cadastrar: registrationState } = useSelector(
    (state) => state.auth,
  );
  const { isSuccess, message, isError, isLoading } = registrationState;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showError, setShowError] = useState(false);
  useEffect(() => {
    if (isSuccess) {
      navigate('/');
    }
    return () => {
      dispatch(reset('cadastrar'));
    };
  }, [user, isSuccess]);

  useEffect(() => {
    if (isError) {
      setShowError(true);
    }
  }, [user, isError]);

  return (
    <Box
      component={motion.div}
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
            dispatch(
              cadastrar({
                password: passwordValue,
                email: emailValue,
                username: usernameValue,
              }),
            );
          }}
        >
          <FormControl fullWidth variant="outlined">
            <TextField
              onChange={(e) => setUsernameValue(e.target.value)}
              value={usernameValue}
              id="username"
              type={'text'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <PersonIcon />
                  </InputAdornment>
                ),
              }}
              autoComplete="username"
              label="Username"
            />
          </FormControl>

          <FormControl fullWidth variant="outlined">
            <TextField
              onChange={(e) => setEmailValue(e.target.value)}
              value={emailValue}
              id="email"
              type={'text'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <MailOutlineIcon />
                  </InputAdornment>
                ),
              }}
              autoComplete="email"
              label="E-mail"
            />
          </FormControl>

          <FormControl fullWidth variant="outlined">
            <TextField
              onChange={(e) => setPasswordValue(e.target.value)}
              value={passwordValue}
              id="password"
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              autoComplete="new-password"
              label="Senha"
            />
          </FormControl>

          <FormControl fullWidth variant="outlined">
            <TextField
              onChange={(e) => setConfirmPasswordValue(e.target.value)}
              value={confirmPasswordValue}
              id="confirmPassword"
              error={passwordValue !== confirmPasswordValue}
              helperText={
                passwordValue !== confirmPasswordValue &&
                'Por favor, repita a mesma senha.'
              }
              type={showConfirmPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              autoComplete="new-password"
              label="Confirmar Senha"
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
            type="submit"
            disabled={
              isLoading ||
              !passwordValue ||
              !emailValue ||
              !usernameValue ||
              !confirmPasswordValue ||
              passwordValue !== confirmPasswordValue
            }
            variant="contained"
            sx={{
              backgroundColor: '#000000',
              width: '100%',
              fontWeight: 'bold',
              letterSpacing: '0.2rem',
            }}
          >
            Cadastrar-se
          </Button>
        </form>

        <Link
          style={{
            color: '#002486ff',
            fontWeight: 'semibold',
            textDecoration: 'underline',
          }}
          to={'/login'}
        >
          Já tem uma conta? Faça seu login aqui!
        </Link>
      </Paper>
    </Box>
  );
};

export default Cadastrar;
