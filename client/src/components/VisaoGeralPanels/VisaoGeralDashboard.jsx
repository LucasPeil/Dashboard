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
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { monthsNames } from '../../../utils/monthsNames';
import MotionDiv from '../../MotionDiv';
import { resetRegisterCasa } from '../../features/casa/casaSlice';
import { resetRegisterEducacao } from '../../features/educacao/educacaoSlice';
import { resetRegisterLazer } from '../../features/lazer/lazerSlice';
import { getTotalDinheiroGasto } from '../../features/visaoGeral/visaoGeralSlice';
import '../../index.css';
import VisaoGeralHeaderButtons from '../VisaoGeralHeaderButtons';
import { Outlet } from 'react-router-dom';
const yearsRange = () => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let i = 0; i <= 4; i++) {
    years.push(currentYear - i);
  }
  return years;
};
const VisaoGeralDashboard = () => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  ChartJS.register(ArcElement, Tooltip, Legend);
  const theme = useTheme();
  const dispatch = useDispatch();
  const [ano, setAno] = useState(new Date().getFullYear());
  const user = useSelector((state) => state.auth.user);
  const { dinheiroGasto } = useSelector((state) => state.dinheiroGasto);
  const { register: registerCasa } = useSelector(
    (state) => state.atividadesCasa
  );
  const upMd = useMediaQuery(theme.breakpoints.up('md'));
  const downMd = useMediaQuery(theme.breakpoints.down('md'));
  const { register: registerLazer } = useSelector(
    (state) => state.atividadesLazer
  );
  const { register: registerEducacao } = useSelector(
    (state) => state.atividadesEducacao
  );
  const getMonthTotalAmount = (month, area) => {
    const dinheiroGastoMes = dinheiroGasto?.[area]?.find(
      (item) => item._id.mes == month
    )?.totalAmount;

    if (dinheiroGastoMes) {
      return dinheiroGastoMes;
    } else {
      return 0;
    }
  };

  useEffect(() => {
    dispatch(getTotalDinheiroGasto({ ano, userId: user._id }));
  }, [
    ano,
    registerCasa.isSuccess,
    registerLazer.isSuccess,
    registerEducacao.isSuccess,
  ]);

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Dinheiro investido' },
    },
    maintainAspectRatio: false,
    height: downMd ? 600 : 460,
    redraw: true,
  };

  const labels = [
    'Jan',
    'Fev',
    'Mar',
    'Abr',
    'Mai',
    'Jun',
    'Jul',
    'Ago',
    'Set',
    'Out',
    'Nov',
    'Dez',
  ];

  const [data, setData] = useState();
  useEffect(() => {
    let dataVariable = {
      labels,
      datasets: [
        {
          label: 'CASA',
          data: monthsNames.map((month) =>
            getMonthTotalAmount(month, 'dinheiroCasaMes')
          ),
          backgroundColor: '#0c264e',
        },
        {
          label: 'LAZER',
          data: monthsNames.map((month) =>
            getMonthTotalAmount(month, 'dinheiroLazerMes')
          ),
          backgroundColor: '#f4b26a',
        },
        {
          label: 'EDUCAÇÃO',
          data: monthsNames.map((month) =>
            getMonthTotalAmount(month, 'dinheiroEducacaoMes')
          ),
          backgroundColor: '#648d64',
        },
      ],
    };

    setData(dataVariable);

    return () => {
      dispatch(resetRegisterEducacao());
      dispatch(resetRegisterCasa());
      dispatch(resetRegisterLazer());
    };
  }, [
    dinheiroGasto,
    registerCasa.isSuccess,
    registerLazer.isSuccess,
    registerEducacao.isSuccess,
  ]);

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
  // 15 30 20 10

  return (
    <MotionDiv>
      <Outlet />
      <Box sx={{ display: 'flex', justifyContent: 'end' }}>
        <Box
          sx={{
            height: '100vh',
            transition: 'all 0.5s ease',
            width: upMd ? 'calc(100% - 6rem)' : '100%',
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
              {data && (
                <Box
                  sx={{
                    px: 2,
                    position: 'relative',
                    height: '100%',
                  }}
                >
                  <Bar options={barOptions} data={data} redraw={true} />
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
              )}
            </Stack>
          </Paper>
        </Box>
      </Box>
    </MotionDiv>
  );
};

export default VisaoGeralDashboard;
