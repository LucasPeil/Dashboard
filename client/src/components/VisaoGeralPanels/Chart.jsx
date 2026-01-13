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

import { Bar } from 'react-chartjs-2';
import { monthsNames } from '../../../utils/monthsNames';
import '../../index.css';
import { useTheme } from '@emotion/react';
import { Box, CircularProgress, useMediaQuery } from '@mui/material';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getTotalDinheiroGasto } from '../../features/visaoGeral/visaoGeralSlice';
import { useEffect, useState } from 'react';
const Chart = ({ ano }) => {
  const theme = useTheme();
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  ChartJS.register(ArcElement, Tooltip, Legend);
  const dispatch = useDispatch();
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
  const downMd = useMediaQuery(theme.breakpoints.down('md'));
  const user = useSelector((state) => state.auth.user);
  const { register: registerCasa } = useSelector(
    (state) => state.atividadesCasa
  );

  const { register: registerLazer } = useSelector(
    (state) => state.atividadesLazer
  );
  const { register: registerEducacao } = useSelector(
    (state) => state.atividadesEducacao
  );

  const { dinheiroGasto, isLoading } = useSelector(
    (state) => state.dinheiroGasto
  );
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
  const data = {
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
  useEffect(() => {
    dispatch(getTotalDinheiroGasto({ ano, userId: user._id }));
  }, [
    ano,
    registerCasa.isSuccess,
    registerLazer.isSuccess,
    registerEducacao.isSuccess,
  ]);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return <Bar options={barOptions} data={data} redraw={true} />;
};
export default Chart;
