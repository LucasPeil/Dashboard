import Breadcrumbs from '@mui/material/Breadcrumbs';

import CelebrationOutlinedIcon from '@mui/icons-material/CelebrationOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import { Box } from '@mui/material';
import { NavLink, useLocation } from 'react-router-dom';
const VisaoGeralBreadcrumbs = () => {
  const pathname = useLocation();
  console.log(pathname);
  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
      }}
      role="presentation"
    >
      <Breadcrumbs aria-label="breadcrumb">
        <NavLink
          style={{ display: 'flex', alignItems: 'center', color: 'black' }}
          to="/casa"
        >
          <HomeOutlinedIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Casa
        </NavLink>
        <NavLink
          style={{ display: 'flex', alignItems: 'center', color: 'black' }}
          to="/lazer"
        >
          <CelebrationOutlinedIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Lazer
        </NavLink>
        <NavLink
          style={{ display: 'flex', alignItems: 'center', color: 'black' }}
          to="/educacao"
        >
          <SchoolOutlinedIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Educação
        </NavLink>
      </Breadcrumbs>
    </Box>
  );
};

export default VisaoGeralBreadcrumbs;
