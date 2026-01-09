import { Box, Paper, useMediaQuery, useTheme } from '@mui/material';

const DashboardContainer = ({ children }) => {
  const theme = useTheme();
  const upMd = useMediaQuery(theme.breakpoints.up('md'));
  const downMd = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <Box sx={{ display: 'flex', justifyContent: 'end' }}>
      <Box
        sx={{
          transition: 'all 0.5s ease',
          width: upMd ? 'calc(100% - 6rem)' : '100%',
        }}
      >
        <Paper
          elevation={6}
          sx={{
            boxSizing: 'border-box',
            width: downMd ? '100%' : 'calc(100% - 6rem)',
            margin: '2rem auto',
            minHeight: '90vh',
            position: 'relative',
            px: 2,
          }}
        >
          {children}
        </Paper>
      </Box>
    </Box>
  );
};

export default DashboardContainer;
