import { useTheme } from '@emotion/react';
import ContentPasteSearchOutlinedIcon from '@mui/icons-material/ContentPasteSearchOutlined';
import {
  Box,
  FormControl,
  MenuItem,
  Paper,
  Select,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { lazy, Suspense } from 'react';
import MotionDiv from '../../MotionDiv';
import '../../index.css';
import VisaoGeralHeaderButtons from '../VisaoGeralHeaderButtons';
import useVisaoGeral from './useVisaoGeral';
import { visuallyHidden } from '@mui/utils';
import VisaoGeralBreadcrumbs from '../VisaoGeralBreadcrumbs';

const Chart = lazy(() => import('./Chart'));
const yearsRange = () => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let i = 0; i <= 4; i++) {
    years.push(currentYear - i);
  }
  return years;
};
const VisaoGeralDashboard = () => {
  const theme = useTheme();
  const {
    uiState: { ano },
    actions: { setAno },
  } = useVisaoGeral();
  const upMd = useMediaQuery(theme.breakpoints.up('md'));
  const upXl = useMediaQuery(theme.breakpoints.up('xl'));
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        height: upMd ? '100%' : 'calc(100vh - 3.5rem)',
        boxSizing: 'border-box',
        px: upMd ? '2rem' : '0.5rem',
        pb: 1,
      }}
    >
      {upMd && <VisaoGeralHeaderButtons />}

      <Paper
        elevation={6}
        component={'main'}
        sx={{
          p: 2,
          boxSizing: 'border-box',
          width: '100%',
          height: '100%',
          overflow: 'auto',
        }}
      >
        <Box
          component={'header'}
          sx={{
            borderBottom: '1px solid #D8D8D8',
            pb: 1,
            pt: 3,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          {!upMd && <VisaoGeralBreadcrumbs />}
          <Typography
            component="h1"
            sx={{
              fontWeight: 600,
              color: '#D8D8D8',
              fontSize: { xs: '1.4rem', sm: '2.1rem', md: '2.4rem' },
            }}
          >
            VISÃO GERAL
          </Typography>

          <ContentPasteSearchOutlinedIcon
            aria-hidden
            sx={{
              fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
              color: '#d8d8d8',
            }}
          />

          <Box
            sx={{
              position: 'absolute',
              bottom: '-2.2em',
              right: 0,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <FormControl
              variant="standard"
              sx={{
                m: 1,
                zIndex: 10,
              }}
            >
              <Select
                labelId="ano"
                id="ano"
                value={ano}
                onChange={(event) => setAno(event.target.value)}
                label="Ano"
                sx={{ fontSize: '0.8em' }}
              >
                {yearsRange()?.map((year) => (
                  <MenuItem key={year} sx={{ fontSize: '0.8em' }} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>
        <Stack
          component={'section'}
          sx={{
            height: '85%',
          }}
        >
          <Box
            component={'figure'}
            sx={{
              position: 'relative',
              height: '100%',

              width: '100%',

              m: 0,
            }}
          >
            <Suspense fallback={<div>Loading...</div>}>
              <Chart ano={ano} />
            </Suspense>
            <Typography component={'figcaption'} sx={visuallyHidden}>
              Gráfico do dinheiro investido em cada atividade ao decorrer do ano
            </Typography>
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
};

export default VisaoGeralDashboard;
