import { NavLink } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import RocketLaunchOutlinedIcon from '@mui/icons-material/RocketLaunchOutlined';
import {
  Menu,
  MenuList,
  MenuItem,
  ListItemText,
  ListItemIcon,
  AppBar,
  Container,
  Stack,
  Box,
  Paper,
  useMediaQuery,
  useTheme,
  Backdrop,
  IconButton,
  Typography,
  Button,
} from '@mui/material';
import Hamburger from 'hamburger-react';
import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { visuallyHidden } from '@mui/utils';
import { useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';
const HorizontalMenu = ({ menus }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const hamburgerRef = useRef(null);
  const location = useLocation();
  const dispatch = useDispatch();
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        open &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  const theme = useTheme();
  const upSm = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <AppBar
      component={'section'}
      position="relative"
      aria-label="Menu"
      sx={{
        backgroundColor: 'black',
      }}
    >
      <Container maxWidth="xl">
        {/* Mobile Menu  */}
        <Box
          sx={{
            display: { xs: 'flex', sm: 'none', md: 'none' },
            alignItems: 'center',
            position: 'relative',
            justifyContent: 'space-between',
            zIndex: 5,
          }}
        >
          <Box ref={hamburgerRef}>
            <Hamburger
              toggled={open}
              toggle={setOpen}
              color={'#FFF'}
              size={22}
            />
          </Box>

          <RocketLaunchOutlinedIcon
            aria-hidden
            sx={{ fontSize: '2.3rem', color: 'white' }}
          />
        </Box>
        <MenuList
          ref={menuRef}
          sx={{
            height: open ? '15rem' : '0px',
            position: 'absolute',
            top: '100%',
            left: 0,
            width: '100%',
            overflow: 'auto',
            transition: 'all 0.5s ease-in-out',
            zIndex: open ? 10 : -1,
            backgroundColor: 'white',
            display: { xs: 'flex', sm: 'none', md: 'none' },
            flexDirection: 'column',
            visibility: open ? 'visible' : 'hidden',
            opacity: open ? 1 : 0,
            boxSizing: 'border-box',
            p: 0,
          }}
        >
          {menus.map((menu) => (
            <MenuItem
              key={menu.title}
              sx={{
                width: '100%',
                p: 0,
              }}
            >
              <NavLink
                key={menu.title}
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 0 0 .3em',
                  gap: 5,
                  backgroundColor:
                    location.pathname == menu.path ? 'black' : 'transparent',
                  color: location.pathname == menu.path ? 'white' : 'black',
                }}
                to={menu.path}
              >
                {menu.icon('small', location.pathname != menu.path)}
                <span>{menu.title}</span>
              </NavLink>
            </MenuItem>
          ))}
          <MenuItem sx={{ p: 0 }}>
            <Button
              sx={{
                color: 'black',
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'start',
              }}
              onClick={() => dispatch(logout())}
            >
              <LogoutIcon fontSize="small" />
              <Typography sx={{}}>LOGOUT</Typography>
            </Button>
          </MenuItem>
        </MenuList>

        {/* Small Desktop Menu */}
        <MenuList
          sx={{
            width: '100%',
            boxSizing: 'border-box',
            display: { xs: 'none', sm: 'flex' },
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <RocketLaunchOutlinedIcon sx={{ fontSize: '2rem', color: 'white' }} />
          {menus.map((menu, index) => (
            <MenuItem sx={{ fontSize: '0.9rem' }} key={index}>
              <NavLink
                className="animated-underline"
                key={index}
                style={{
                  width: '100%',
                  height: '100%',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                to={menu.path}
              >
                <span>{menu.title}</span>
              </NavLink>
            </MenuItem>
          ))}
          <MenuItem>
            <Button
              className="animated-underline"
              sx={{
                color: 'white',
              }}
              onClick={() => dispatch(logout())}
            >
              <Typography sx={{ fontSize: '0.9rem' }}>LOGOUT</Typography>
            </Button>
          </MenuItem>
        </MenuList>
      </Container>
      <Backdrop
        aria-hidden
        open={open}
        sx={{ zIndex: 2, display: { xs: 'block', sm: 'none' } }}
      />
    </AppBar>
  );
};

export default HorizontalMenu;
