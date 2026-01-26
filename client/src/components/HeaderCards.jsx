import { Box, Paper, Tooltip, Typography, useMediaQuery } from '@mui/material';
import { useSpring, animated } from '@react-spring/web';
import '../index.css';
import { useTheme } from '@emotion/react';
import { Link } from 'react-router-dom';

const HeaderCards = ({
  content,
  icon,
  subtitle,
  containerDecoration,
  index,
  setShowAddIcon,
  to,
  bgColor,
}) => {
  const theme = useTheme();
  const downMd = useMediaQuery(theme.breakpoints.down('md'));
  const upMd = useMediaQuery(theme.breakpoints.up('md'));
  const decorationExpand = {
    height: '32rem !important',
    width: '32rem !important',
    top: '-7.5rem !important',
    left: '-2.5rem !important',
    zIndex: -2,
  };

  return (
    <Tooltip
      title={subtitle}
      slotProps={{
        tooltip: {
          sx: {
            display: downMd ? 'block' : 'none',
            fontSize: '1rem',
          },
        },
      }}
    >
      <Paper
        component={Link}
        to={to}
        onMouseOver={() => {
          setShowAddIcon((prev) => {
            return prev.map((listItem, listIdx) => {
              if (listIdx == index) {
                return false;
              }
              return listItem;
            });
          });
        }}
        onMouseOut={() => {
          setShowAddIcon((prev) => {
            return prev.map((listItem, listIdx) => {
              if (listIdx == index) {
                return true;
              }
              return listItem;
            });
          });
        }}
        elevation={4}
        sx={{
          position: 'relative',
          height: '11rem',
          borderRadius: '1rem',
          boxSizing: 'border-box',
          px: '2.5rem',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          transition: 'all 0.4s ease ',
          overflow: 'hidden',
          backgroundColor: 'white',
          color: 'black',
          '&:hover': {
            '.casaCard': content == 'CASA' && decorationExpand,
            '.lazerCard': content == 'LAZER' && decorationExpand,
            '.educacaoCard': content == 'EDUCAÇÃO' && decorationExpand,

            color: 'white',
            transform: 'scale(105%)',
          },
        }}
      >
        {containerDecoration}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column-reverse',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography
              variant="button"
              component={'h2'}
              sx={{
                fontSize: '1.8rem',
                fontWeight: 'bold',
                textAlign: 'center',
              }}
            >
              {content}
            </Typography>
            <Typography
              component={'span'}
              variant="caption"
              sx={{ fontSize: '0.9rem', textAlign: 'center' }}
            >
              {subtitle}
            </Typography>
          </Box>

          <Box>{icon}</Box>
        </Box>
      </Paper>
    </Tooltip>
  );
};

export default HeaderCards;
