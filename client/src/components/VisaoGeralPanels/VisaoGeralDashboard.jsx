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
import { Suspense, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import MotionDiv from '../../MotionDiv';
import '../../index.css';
import VisaoGeralHeaderButtons from '../VisaoGeralHeaderButtons';
import Chart from './Chart';
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
  const [ano, setAno] = useState(new Date().getFullYear());
  const registerCasa = useSelector((state) => state.atividadesCasa.register);
  const upMd = useMediaQuery(theme.breakpoints.up('md'));
  const downMd = useMediaQuery(theme.breakpoints.down('md'));
  const registerLazer = useSelector((state) => state.atividadesLazer.register);
  const registerEducacao = useSelector(
    (state) => state.atividadesEducacao.register
  );

  useEffect(() => {
    if (registerCasa.isSuccess) {
      toast.success(registerCasa.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } else if (registerEducacao.isSuccess) {
      toast.success(registerEducacao.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } else if (registerLazer.isSuccess) {
      toast.success(registerLazer.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  }, [
    registerCasa.isSuccess,
    registerEducacao.isSuccess,
    registerLazer.isSuccess,
  ]);

  return (
    <MotionDiv>
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
            sx={{
              px: 2,
              boxSizing: 'border-box',
              width: upMd ? 'calc(100% - 4rem)' : '100%',
              margin: '2rem auto',
              height: downMd ? 'calc(100vh - 15rem)' : '42rem',
            }}
          >
            <Stack
              direction={'column'}
              justifyContent={'space-between'}
              alignItems={'space-between'}
              sx={{
                height: downMd ? 'calc(100vh - 15rem)' : '41rem',
              }}
            >
              <Box
                sx={{
                  borderBottom: '1px solid #D8D8D8',
                  pb: 1,
                  pt: 3,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Typography
                  component="h2"
                  sx={{ fontWeight: 600, color: '#D8D8D8', fontSize: '2.4rem' }}
                >
                  VISÃO GERAL
                </Typography>
                <ContentPasteSearchOutlinedIcon
                  sx={{ fontSize: '2.5rem', color: '#d8d8d8' }}
                />
              </Box>

              <Box
                sx={{
                  px: 2,
                  position: 'relative',
                  height: '100%',
                }}
              >
                <Suspense fallback={<div>Loading...</div>}>
                  <Chart />
                </Suspense>
                <Stack
                  direction="row"
                  justifyContent={'end'}
                  alignItems={'center'}
                  sx={{
                    position: 'absolute',
                    width: '10rem',
                    top: 0,
                    right: 0,
                  }}
                >
                  <Typography variant="subtitle2">Ano</Typography>
                  <FormControl
                    variant="standard"
                    sx={{
                      m: 1,
                      maxWidth: 60,

                      top: 0,
                      right: 0,
                    }}
                  >
                    {/*  <InputLabel id="ano">Ano</InputLabel> */}
                    <Select
                      labelId="ano"
                      id="ano"
                      value={ano}
                      onChange={(event) => setAno(event.target.value)}
                      label="Ano"
                      sx={{ fontSize: '13px' }}
                    >
                      {yearsRange()?.map((year) => (
                        <MenuItem
                          key={year}
                          sx={{ fontSize: '13px' }}
                          value={year}
                        >
                          {year}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Stack>
              </Box>
            </Stack>
          </Paper>
        </Box>
      </Box>
    </MotionDiv>
  );
};

export default VisaoGeralDashboard;
