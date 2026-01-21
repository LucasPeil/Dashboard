import { Box, Paper, useMediaQuery, useTheme } from '@mui/material';

const DashboardContainer = ({ children }) => {
  const theme = useTheme();
  const upMd = useMediaQuery(theme.breakpoints.up('md'));
  const downMd = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <Box component="main" sx={{ display: 'flex', justifyContent: 'end' }}>
      <Box
        sx={{
          transition: 'all 0.5s ease',
          margin: !upMd && `auto auto`,
          width: upMd ? 'calc(100% - 6rem)' : '96%',
        }}
      >
        <Paper
          elevation={6}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxSizing: 'border-box',
            width: downMd ? '100%' : 'calc(100% - 6rem)',
            margin: '2rem auto',
            height: { xs: '60rem', xxl: '55rem' },
            position: 'relative',
            px: 2,
            py: 1,
            overflow: 'hidden',
          }}
        >
          {children}
        </Paper>
      </Box>
    </Box>
  );
};

export default DashboardContainer;
