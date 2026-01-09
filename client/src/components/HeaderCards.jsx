import { Box, Paper, Tooltip, Typography, useMediaQuery } from '@mui/material';
import { useSpring, animated } from '@react-spring/web';
import '../index.css';
import { useTheme } from '@emotion/react';

const HeaderCards = ({
  content,
  icon,
  subtitle,
  containerDecoration,
  index,
  setShowAddIcon,
  onClickAction,
  bgColor,
}) => {
  const theme = useTheme();
  const downMd = useMediaQuery(theme.breakpoints.down('md'));
  const downXl = useMediaQuery(theme.breakpoints.down('xl'));
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
        onClick={onClickAction}
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
          mt: 5,
          mx: 4,
          height: downMd ? '4.5rem' : '11rem',
          borderRadius: '1rem',
          boxSizing: 'border-box',
          px: downXl ? 0 : '2.5rem',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          transition: 'all 0.4s ease ',
          overflow: 'hidden',
          backgroundColor: downMd ? bgColor : 'white',
          color: downMd ? 'white' : 'black',
          '&:hover': {
            '.casaCard': content == 'CASA' && decorationExpand,
            '.lazerCard': content == 'LAZER' && decorationExpand,
            '.educacaoCard': content == 'EDUCAÇÃO' && decorationExpand,

            color: 'white',
            transform: 'scale(105%)',
          },
        }}
      >
        {!downMd && containerDecoration}
        <Box
          sx={{
            display: 'flex',
            flexDirection: downXl ? 'column-reverse' : 'row',
            justifyContent: downMd ? 'center' : 'space-between',
            alignItems: downXl ? 'center' : 'space-between',
          }}
        >
          {!downMd && (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Typography
                variant="button"
                sx={{
                  fontSize: '1.8rem',
                  fontWeight: 'bold',
                }}
              >
                {content}
              </Typography>
              <Typography variant="caption" sx={{ fontSize: '0.9rem' }}>
                {subtitle}
              </Typography>
            </Box>
          )}

          <Box>{icon}</Box>
        </Box>
      </Paper>
    </Tooltip>
  );
};

export default HeaderCards;
