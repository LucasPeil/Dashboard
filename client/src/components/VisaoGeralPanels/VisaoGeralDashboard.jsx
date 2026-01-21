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
  const downMd = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'end' }}>
        <Box
          sx={{
            height: '100vh',
            transition: 'all 0.5s ease',
            margin: !upMd && `auto auto`,
            width: upMd ? 'calc(100% - 6rem)' : '96%',
          }}
        >
          <VisaoGeralHeaderButtons />

          <Paper
            elevation={6}
            component={'main'}
            sx={{
              px: 2,
              boxSizing: 'border-box',
              width: upMd ? 'calc(100% - 4rem)' : '100%',
              margin: '2rem auto',
              height: downMd ? 'calc(100vh - 15rem)' : '42rem',
            }}
          >
            <Stack
              component={'section'}
              direction={'column'}
              justifyContent={'space-between'}
              alignItems={'space-between'}
              sx={{
                height: downMd ? 'calc(100vh - 15rem)' : '41rem',
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
                <Typography
                  component="h1"
                  sx={{
                    fontWeight: 600,
                    color: '#D8D8D8',
                    fontSize: '2.4rem',
                  }}
                >
                  VISÃO GERAL
                </Typography>

                <ContentPasteSearchOutlinedIcon
                  aria-hidden
                  sx={{ fontSize: '2.5rem', color: '#d8d8d8' }}
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
                  <Typography component={'span'} variant="subtitle2">
                    Ano
                  </Typography>
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
                        <MenuItem
                          key={year}
                          sx={{ fontSize: '0.8em' }}
                          value={year}
                        >
                          {year}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Box>

              <Box
                component={'figure'}
                sx={{
                  px: 2,
                  position: 'relative',
                  height: '100%',
                }}
              >
                <Suspense fallback={<div>Loading...</div>}>
                  <Chart ano={ano} />
                </Suspense>
                <Typography component={'figcaption'} sx={visuallyHidden}>
                  Gráfico do dinheiro investido em cada atividade ao decorrer do
                  ano
                </Typography>
              </Box>
            </Stack>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default VisaoGeralDashboard;
