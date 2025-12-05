import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { NavLink, redirect, useLocation } from 'react-router-dom';
import { Box, IconButton, Typography, Paper, Tooltip } from '@mui/material';
import { useSpring, animated } from '@react-spring/web';
import Hamburger from 'hamburger-react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import FitnessCenterOutlinedIcon from '@mui/icons-material/FitnessCenterOutlined';
import MapsHomeWorkOutlinedIcon from '@mui/icons-material/MapsHomeWorkOutlined';
import CelebrationOutlinedIcon from '@mui/icons-material/CelebrationOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import ContentPasteSearchOutlinedIcon from '@mui/icons-material/ContentPasteSearchOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';
const VerticalMenu = ({ open, setOpen }) => {
  const theme = useTheme();
  const downSm = useMediaQuery(theme.breakpoints.down('sm'));
  const upMd = useMediaQuery(theme.breakpoints.up('md'));
  const upLg = useMediaQuery(theme.breakpoints.up('lg'));
  const location = useLocation();
  const path = location?.pathname?.split('/')[1];
  const dispatch = useDispatch();
  const menus = [
    {
      title: 'VISÃO GERAL',
      icon: (
        <ContentPasteSearchOutlinedIcon
          fontSize="large"
          sx={{ color: open ? 'black' : 'white' }}
        />
      ),
      path: '/',
    },

    {
      title: 'CASA',
      icon: (
        <MapsHomeWorkOutlinedIcon
          fontSize="large"
          sx={{ color: open ? 'black' : 'white' }}
        />
      ),
      path: '/casa',
    },
    {
      title: 'LAZER',
      icon: (
        <CelebrationOutlinedIcon
          fontSize="large"
          sx={{ color: open ? 'black' : 'white' }}
        />
      ),
      path: '/lazer',
    },
    {
      title: 'EDUCAÇÃO',
      icon: (
        <SchoolOutlinedIcon
          fontSize="large"
          sx={{ color: open ? 'black' : 'white' }}
        />
      ),
      path: '/educacao',
    },
  ];

  const menuIsOpen = useSpring({
    config: { duration: 300 },
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    transform: open ? 'translateX(0rem)' : 'translateX(-10rem)',
    opacity: open ? 1 : 0,
    textAlign: 'left',
    color: 'black',
    marginLeft: '1rem',
  });
  const verticalNavStyle = useSpring({
    position: 'fixed',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    height: '100vh',
    paddingTop: '1rem',
    width: open ? '14rem' : '6rem',
    backgroundColor: open ? 'white' : theme.palette.greyBlue.contrastText,
    borderRight: '1px solid #C6C6C6',
  });

  return (
    <Paper elevation={8} component={animated.div} style={verticalNavStyle}>
      <IconButton sx={{ ml: 2 }} onClick={() => setOpen(!open)}>
        <Hamburger
          toggled={open}
          toggle={setOpen}
          color={open ? '#000' : '#FFF'}
        />
      </IconButton>
      {menus.map((menu, index) => (
        <NavLink
          key={index}
          component={animated.div}
          style={{
            textDecoration: 'none',
            marginTop: '4rem',
            display: 'flex',
            maxHeight: '35px',
            width: open ? '14rem' : '6rem',
          }}
          to={menu.path}
        >
          {downSm ? (
            menu.icon
          ) : (
            <Tooltip
              title={
                <Typography sx={{ fontSize: '12px', fontWeight: 'bold' }}>
                  {menu.title}
                </Typography>
              }
              placement="right"
            >
              <Box
                component={motion.div}
                sx={{
                  display: 'flex',
                  justifyContent: 'start',
                  boxSizing: 'border-box',
                  px: 3,
                  width: open ? '14rem' : '6rem',

                  borderLeft:
                    location.pathname == menu.path
                      ? open
                        ? '7px solid black'
                        : '5px solid white'
                      : open && '1px solid white',

                  transition: 'all 0.2s ease',
                  '&:hover': {
                    borderLeft: open ? '7px solid black' : '5px solid white',
                  },
                }}
              >
                {menu.icon}

                <Typography component={animated.div} style={menuIsOpen}>
                  {menu.title}
                </Typography>
              </Box>
            </Tooltip>
          )}
        </NavLink>
      ))}

      <Tooltip
        title={
          <Typography sx={{ fontSize: '12px', fontWeight: 'bold' }}>
            LOGOUT
          </Typography>
        }
        placement="right"
      >
        <IconButton
          component={motion.div}
          sx={{
            pl: 3,
            height: 'auto',
            maxHeight: '35px',
            marginTop: '4rem',
            borderRadius: '0',
            transition: 'all 0.2s ease',
            '&:hover': {
              backgroundColor: 'transparent',
              borderLeft: open ? '7px solid black' : '5px solid white',
            },
          }}
          onClick={() => dispatch(logout())}
        >
          <LogoutIcon
            fontSize="large"
            sx={{
              color: open ? 'black' : 'white',
            }}
          />
          <Typography component={animated.div} style={menuIsOpen}>
            LOGOUT
          </Typography>
        </IconButton>
      </Tooltip>
    </Paper>
  );
};

export default VerticalMenu;
