import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import CelebrationOutlinedIcon from '@mui/icons-material/CelebrationOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import { Box, Grid, useMediaQuery, useTheme } from '@mui/material';
import '../index.css';
import HeaderCards from './HeaderCards';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const VisaoGeralHeaderButtons = () => {
  const theme = useTheme();
  const downLg = useMediaQuery(theme.breakpoints.down('lg'));
  const [showAddIcon, setShowAddIcon] = useState([true, true, true]);
  const navigate = useNavigate();

  return (
    <Grid
      container
      spacing={downLg ? 1 : 10}
      component={'section'}
      aria-label="Atalhos para cada página"
    >
      <Grid item xs={4} lg={4} aria-label="Atalho para página de casa">
        <HeaderCards
          to={'/casa'}
          content={'CASA'}
          icon={<HomeOutlinedIcon sx={{ fontSize: '4rem' }} />}
          subtitle={'Adicionar nova atividade'}
          className_={'icon-container'}
          index={0}
          bgColor="#0c264e"
          setShowAddIcon={setShowAddIcon}
          containerDecoration={
            <Box
              className="casaCard"
              id="0"
              component={'span'}
              sx={{
                position: 'absolute',
                color: 'white',
                backgroundColor: ' #0c264e',
                top: '-3.5rem',
                left: '-0.8rem',
                width: '4rem',
                height: '10rem',
                transform: 'rotate(40deg)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '50%',
                transition:
                  ' width 0.4s ease, height 0.4s ease, top 0.5s ease , left 0.5s ease ',
              }}
            >
              <Box sx={{ transform: 'rotate(320deg)', ml: 1 }}>
                {showAddIcon[0] && <AddToPhotosIcon />}
              </Box>
            </Box>
          }
        />
      </Grid>
      <Grid item xs={4} lg={4} aria-label="Atalho para página de lazer">
        <HeaderCards
          to={'/lazer'}
          content={'LAZER'}
          icon={<CelebrationOutlinedIcon sx={{ fontSize: '4rem' }} />}
          subtitle={'Adicionar nova atividade'}
          index={1}
          bgColor="#f4b26a"
          setShowAddIcon={setShowAddIcon}
          containerDecoration={
            <Box
              className="lazerCard"
              id="1"
              component={'span'}
              sx={{
                position: 'absolute',
                color: 'white',
                backgroundColor: '#f4b26a',
                borderRadius: '50%',
                top: '-3.5rem',
                left: '-0.8rem',
                width: '4rem',
                height: '10rem',
                transform: 'rotate(40deg)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                transition:
                  ' width 0.4s ease, height 0.4s ease, top 0.5s ease , left 0.5s ease ',
              }}
            >
              <Box sx={{ transform: 'rotate(320deg)', ml: 1 }}>
                {showAddIcon[1] && <AddToPhotosIcon />}
              </Box>
            </Box>
          }
        />
      </Grid>
      <Grid item xs={4} lg={4} aria-label="Atalho para página de educação">
        <HeaderCards
          to={'/educacao'}
          content={'EDUCAÇÃO'}
          icon={<SchoolOutlinedIcon sx={{ fontSize: '4rem' }} />}
          subtitle={'Adicionar nova atividade'}
          index={2}
          bgColor="#648d64"
          setShowAddIcon={setShowAddIcon}
          containerDecoration={
            <Box
              className="educacaoCard"
              id="2"
              component={'span'}
              sx={{
                position: 'absolute',
                color: 'white',
                backgroundColor: '#648d64',
                borderRadius: '50%',
                top: '-3.5rem',
                left: '-0.8rem',
                width: '4rem',
                height: '10rem',
                transform: 'rotate(40deg)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                transition:
                  ' width 0.4s ease, height 0.4s ease, top 0.5s ease , left 0.5s ease ',
              }}
            >
              <Box sx={{ transform: 'rotate(320deg)', ml: 1 }}>
                {showAddIcon[2] && <AddToPhotosIcon />}
              </Box>
            </Box>
          }
        />
      </Grid>
    </Grid>
  );
};

export default VisaoGeralHeaderButtons;
