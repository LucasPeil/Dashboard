import AddIcon from '@mui/icons-material/Add';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { memo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
const DashboardsHeaders = memo(function DashboardsHeaders({
  categorySelected,
  title,
  cleanFilters,
  path,
}) {
  const BootstrapTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
  ))(({}) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      fontSize: 13,
    },
  }));

  return (
    <Stack
      component="header"
      direction={'column'}
      justifyContent={'space-between'}
      alignItems={'space-between'}
      sx={{ position: 'relative', width: '100%' }}
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
          sx={{
            fontWeight: 600,
            color: '#D8D8D8',
            fontSize: { xs: '1.8rem', sm: '2.1rem', md: '2.4rem' },
          }}
        >
          {title}
        </Typography>

        <BootstrapTooltip title="Adicionar nova atividade" arrow>
          <Link
            to={path}
            aria-label="Adicionar nova atividade"
            style={{
              position: 'absolute',
              right: '3rem',
              padding: '0 !important',
              backgroundColor: 'white',
              bottom: '-1.5rem',
            }}
          >
            <AddIcon
              aria-hidden="true"
              sx={{
                fontSize: '2.6rem',
                color: '#d8d8d8',
              }}
            />
          </Link>
        </BootstrapTooltip>
      </Box>
      {categorySelected && (
        <Tooltip title="Limpar filtro">
          <IconButton
            onClick={cleanFilters}
            aria-label="Limpar filtro"
            sx={{
              position: 'absolute',
              bottom: '-3rem',
              left: 0,
              '&:hover': {
                backgroundColor: 'transparent',
              },
            }}
          >
            <FilterAltOffIcon aria-hidden="true" />
          </IconButton>
        </Tooltip>
      )}
    </Stack>
  );
});

export default DashboardsHeaders;
