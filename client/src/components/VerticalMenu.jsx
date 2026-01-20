import LogoutIcon from '@mui/icons-material/Logout';
import {
  Backdrop,
  Box,
  IconButton,
  Paper,
  Tooltip,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { animated, useSpring } from '@react-spring/web';
import { motion } from 'framer-motion';
import Hamburger from 'hamburger-react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { logout } from '../features/auth/authSlice';
const VerticalMenu = ({ menus }) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const location = useLocation();
  const dispatch = useDispatch();

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
    zIndex: 10000,
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
    zIndex: 10000,
  });
  return (
    <>
      <Paper elevation={8} component={animated.aside} style={verticalNavStyle}>
        <IconButton
          sx={{
            ml: 2,
            mt: 2,
            p: 0,
            borderRadius: '50%',
            boxSizing: 'border-box',
            height: '3.5rem',
            width: '3.5rem',
            backgroundColor: open
              ? 'white'
              : theme.palette.greyBlue.contrastText,
            '&:hover': {
              backgroundColor: open
                ? 'transparent'
                : theme.palette.greyBlue.contrastText,
            },
          }}
          onClick={() => setOpen(!open)}
        >
          <Hamburger
            toggled={open}
            toggle={setOpen}
            color={open ? '#000' : '#FFF'}
            size={22}
          />
        </IconButton>
        <Box component={'nav'} aria-label="Menu">
          <Box component={'ul'}>
            {menus.map((menu, index) => (
              <Box key={index} component={'li'}>
                <NavLink
                  component={animated.link}
                  style={{
                    marginTop: '4rem',
                    display: 'flex',
                    maxHeight: '35px',
                    width: open ? '14rem' : '6rem',
                  }}
                  to={menu.path}
                >
                  <Tooltip
                    title={
                      <Typography
                        component={'span'}
                        sx={{ fontSize: '12px', fontWeight: 'bold' }}
                      >
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
                          borderLeft: open
                            ? '7px solid black'
                            : '5px solid white',
                        },
                      }}
                    >
                      {menu.icon('large', open)}

                      <Typography component={animated.span} style={menuIsOpen}>
                        {menu.title}
                      </Typography>
                    </Box>
                  </Tooltip>
                </NavLink>
              </Box>
            ))}

            <Box component={'li'}>
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
            </Box>
          </Box>
        </Box>
      </Paper>
      <Backdrop open={open} sx={{ zIndex: 2 }} />
    </>
  );
};

export default VerticalMenu;
