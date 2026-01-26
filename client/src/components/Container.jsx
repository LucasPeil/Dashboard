import { Box, Paper, useMediaQuery, useTheme } from '@mui/material';

const DashboardContainer = ({ children }) => {
  const theme = useTheme();
  const upMd = useMediaQuery(theme.breakpoints.up('md'));
  const downMd = useMediaQuery(theme.breakpoints.down('md'));
  return (
    /*     <Box
      sx={{
        transition: 'all 0.5s ease',
        margin: !upMd && `auto auto`,
        width: '100%',
        height: '100%',
        border: '5px solid red',
      }}
    > */
    <Paper
      component="main"
      elevation={6}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxSizing: 'border-box',
        width: '100%',
        margin: 'auto auto',
        height: '100%',
        position: 'relative',
        padding: '0px',
        overflow: 'hidden',
      }}
    >
      {children}
    </Paper>
    /*  </Box> */
  );
};

export default DashboardContainer;
