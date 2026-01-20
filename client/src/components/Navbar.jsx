import { useMemo } from 'react';
import VerticalMenu from './VerticalMenu';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import HorizontalMenu from './HorizontalMenu';
import CelebrationOutlinedIcon from '@mui/icons-material/CelebrationOutlined';
import ContentPasteSearchOutlinedIcon from '@mui/icons-material/ContentPasteSearchOutlined';
import MapsHomeWorkOutlinedIcon from '@mui/icons-material/MapsHomeWorkOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';

const Navbar = () => {
  const theme = useTheme();
  const upMd = useMediaQuery(theme.breakpoints.up('md'));
  const menus = useMemo(
    () => [
      {
        title: 'VISÃO GERAL',
        icon: (size, condition) => (
          <ContentPasteSearchOutlinedIcon
            fontSize={size}
            sx={{ color: condition ? 'black' : 'white' }}
          />
        ),
        path: '/',
      },

      {
        title: 'CASA',
        icon: (size, condition) => (
          <MapsHomeWorkOutlinedIcon
            fontSize={size}
            sx={{ color: condition ? 'black' : 'white' }}
          />
        ),
        path: '/casa',
      },
      {
        title: 'LAZER',
        icon: (size, condition) => (
          <CelebrationOutlinedIcon
            fontSize={size}
            sx={{ color: condition ? 'black' : 'white' }}
          />
        ),
        path: '/lazer',
      },
      {
        title: 'EDUCAÇÃO',
        icon: (size, condition) => (
          <SchoolOutlinedIcon
            fontSize={size}
            sx={{ color: condition ? 'black' : 'white' }}
          />
        ),
        path: '/educacao',
      },
    ],
    [],
  );
  return (
    <>
      {upMd ? <VerticalMenu menus={menus} /> : <HorizontalMenu menus={menus} />}
    </>
  );
};

export default Navbar;
