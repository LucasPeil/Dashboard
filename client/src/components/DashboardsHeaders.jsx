import React, { memo } from 'react';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import AddIcon from '@mui/icons-material/Add';
import { setOpenModalCasa } from '../features/casa/casaSlice';
import { useDispatch } from 'react-redux';
const DashboardsHeaders = memo(function DashboardsHeaders({
  categorySelected,
  title,
  cleanFilters,
}) {
  const BootstrapTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
  ))(({}) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      fontSize: 13,
    },
  }));
  const dispatch = useDispatch();
  const openModal = () => dispatch(setOpenModalCasa());
  return (
    <Stack
      direction={'column'}
      justifyContent={'space-between'}
      alignItems={'space-between'}
      sx={{ position: 'relative' }}
    >
      <Box
        sx={{
          borderBottom: '1px solid #D8D8D8',
          pb: 1,
          pt: 4,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <Typography
          component="h2"
          sx={{ fontWeight: 600, color: '#D8D8D8', fontSize: '2.4rem' }}
        >
          {title}
        </Typography>
        <BootstrapTooltip title="Adicionar nova atividade" arrow>
          <IconButton
            onClick={openModal}
            sx={{
              position: 'absolute',
              right: '3rem',
              padding: '0 !important',
              backgroundColor: 'white',
              bottom: '-1.3rem',
              transition: 'all 0.5s ease',
              '&:hover': {
                backgroundColor: 'white',
                transform: 'scale(125%)',
                color: '#ACACAC',
              },
            }}
          >
            <AddIcon
              sx={{
                fontSize: '2.6rem',
                color: '#d8d8d8',
              }}
            />
          </IconButton>
        </BootstrapTooltip>
      </Box>
      {categorySelected && (
        <Tooltip title="Limpar filtro">
          <IconButton
            onClick={cleanFilters}
            sx={{
              position: 'absolute',
              bottom: '-6rem',
              right: 0,
              '&:hover': {
                backgroundColor: 'transparent',
              },
            }}
          >
            <FilterAltOffIcon />
          </IconButton>
        </Tooltip>
      )}
    </Stack>
  );
});

export default DashboardsHeaders;
