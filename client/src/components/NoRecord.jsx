import { Box, Typography } from '@mui/material';
import NoData from '../assets/NoData.svg';

const NoRecord = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      sx={{ p: 4 }}
    >
      <Box
        component="img"
        src={NoData}
        sx={{
          width: { xs: '200px', md: '250px' },
          height: 'auto',
          mb: 2,
          opacity: 0.8,
        }}
        alt="Certifique-se de que há dados para exibir"
      />
      <Typography variant="h5" color="textSecondary" fontWeight="bold">
        Nenhum registro encontrado
      </Typography>
    </Box>
  );
};

export default NoRecord;
