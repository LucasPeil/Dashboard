import { useTheme } from '@emotion/react';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import CelebrationOutlinedIcon from '@mui/icons-material/CelebrationOutlined';
import ContentPasteSearchOutlinedIcon from '@mui/icons-material/ContentPasteSearchOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import {
  Box,
  Grid,
  Paper,
  Stack,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
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
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import MotionDiv from '../../MotionDiv';
import {
  closeModalCasa,
  resetRegisterCasa,
  setOpenModalCasa,
} from '../../features/casa/casaSlice';
import {
  closeModalEducacao,
  resetRegisterEducacao,
  setOpenModalEducacao,
} from '../../features/educacao/educacaoSlice';
import {
  closeModalLazer,
  resetRegisterLazer,
  setOpenModalLazer,
} from '../../features/lazer/lazerSlice';
import { getTotalDinheiroGasto } from '../../features/visaoGeral/visaoGeralSlice';
import '../../index.css';
import FormAtividade from '../FormAtividade';
import HeaderCards from '../HeaderCards';
import { monthsNames } from '../../../utils/monthsNames';

const yearsRange = () => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let i = 0; i <= 4; i++) {
    years.push(currentYear - i);
  }
  return years;
};
const VisaoGeralDashboard = ({ open, setOpen }) => {
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
  const downLg = useMediaQuery(theme.breakpoints.down('lg'));
  const { openModalLazer } = useSelector((state) => state.atividadesLazer);
  const user = useSelector((state) => state.auth.user);
  const { openModalEducacao } = useSelector(
    (state) => state.atividadesEducacao
  );
  const { dinheiroGasto, isSuccess: dinheiroGastoIsSuccess } = useSelector(
    (state) => state.dinheiroGasto
  );
  const {
    register: registerCasa,
    update: updateCasa,
    atividadesCasa,
    openModalCasa,
  } = useSelector((state) => state.atividadesCasa);

  const { register: registerLazer, update: updateLazer } = useSelector(
    (state) => state.atividadesLazer
  );
  const { register: registerEducacao, update: updateEducacao } = useSelector(
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

  const cleanForm = (form) => {
    form.setFieldValue('nomeAtividade', '');
    form.setFieldValue('categoria', '');
    form.setFieldValue('descricaoAtividade', '');
    form.setFieldValue('tempoGasto', '');
    form.setFieldValue('dinheiroGasto', '');
    form.setFieldValue('nivelImportancia', '');
  };

  const [showAddIcon, setShowAddIcon] = useState([true, true, true]);

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
      <Box sx={{ display: 'flex', justifyContent: 'end' }}>
        <FormAtividade
          openModal={openModalCasa}
          handleCloseModal={closeModalCasa}
          title={'Nova Atividade Doméstica'}
          btnColor="#0c264e"
          btnHoverColor="#000000"
          categoriaItens={['Compras', 'Limpeza', 'Refeições']}
          card={'Casa'}
          cleanForm={cleanForm}
        />
        <FormAtividade
          openModal={openModalLazer}
          handleCloseModal={closeModalLazer}
          title={'Nova Atividade de Lazer'}
          btnColor="#f4b26a"
          btnHoverColor="#E39F54"
          categoriaItens={['Jogos', 'Cultura', 'Em grupo', 'Outros']}
          card={'Lazer'}
          cleanForm={cleanForm}
        />
        <FormAtividade
          openModal={openModalEducacao}
          handleCloseModal={closeModalEducacao}
          title={'Nova Atividade de Educação'}
          btnColor="#648d64"
          btnHoverColor="#4E7A4E"
          categoriaItens={['Cursos', 'Livros']}
          card={'Educação'}
          cleanForm={cleanForm}
        />
        <Box
          sx={{
            height: '100vh',
            transition: 'all 0.5s ease',
            width: open ? 'calc(100% - 14rem)' : 'calc(100% - 6rem)',
          }}
        >
          <Grid container spacing={downLg ? 1 : 10}>
            <Grid item xs={4} lg={4}>
              <Box>
                <HeaderCards
                  onClickAction={() => dispatch(setOpenModalCasa())}
                  idx={0}
                  content={'CASA'}
                  icon={<HomeOutlinedIcon sx={{ fontSize: '4rem' }} />}
                  subtitle={'Adicionar nova atividade'}
                  className_={'icon-container'}
                  index="0"
                  setShowAddIcon={setShowAddIcon}
                  showAddIcon={showAddIcon}
                  containerDecoration={
                    <Box
                      className="casaCard"
                      id="0"
                      component={'span'}
                      sx={{
                        position: 'absolute',
                        color: 'white',
                        backgroundColor: ' #0c264e',
                        top: '-3.5rem',
                        left: '-0.8rem',
                        width: '4rem',
                        height: '10rem',
                        transform: 'rotate(40deg)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: '50%',
                        transition:
                          ' width 0.4s ease, height 0.4s ease, top 0.5s ease , left 0.5s ease ',
                      }}
                    >
                      {!downLg && (
                        <Box sx={{ transform: 'rotate(320deg)', ml: 1 }}>
                          {showAddIcon[0] && <AddToPhotosIcon />}
                        </Box>
                      )}
                    </Box>
                  }
                />
              </Box>
            </Grid>
            <Grid item xs={4} lg={4}>
              <Box>
                <HeaderCards
                  onClickAction={() => dispatch(setOpenModalLazer())}
                  idx={1}
                  content={'LAZER'}
                  icon={<CelebrationOutlinedIcon sx={{ fontSize: '4rem' }} />}
                  subtitle={'Adicionar nova atividade'}
                  index="1"
                  setShowAddIcon={setShowAddIcon}
                  showAddIcon={showAddIcon}
                  containerDecoration={
                    <Box
                      className="lazerCard"
                      id="1"
                      component={'span'}
                      sx={{
                        position: 'absolute',
                        color: 'white',
                        backgroundColor: '#f4b26a',
                        borderRadius: '50%',
                        top: '-3.5rem',
                        left: '-0.8rem',
                        width: '4rem',
                        height: '10rem',
                        transform: 'rotate(40deg)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        transition:
                          ' width 0.4s ease, height 0.4s ease, top 0.5s ease , left 0.5s ease ',
                      }}
                    >
                      <Box sx={{ transform: 'rotate(320deg)', ml: 1 }}>
                        {showAddIcon[1] && <AddToPhotosIcon />}
                      </Box>
                    </Box>
                  }
                />
              </Box>
            </Grid>
            <Grid item xs={4} lg={4}>
              <Box>
                <HeaderCards
                  onClickAction={() => dispatch(setOpenModalEducacao())}
                  idx={2}
                  content={'EDUCAÇÃO'}
                  icon={<SchoolOutlinedIcon sx={{ fontSize: '4rem' }} />}
                  subtitle={'Adicionar nova atividade'}
                  index="2"
                  setShowAddIcon={setShowAddIcon}
                  showAddIcon={showAddIcon}
                  containerDecoration={
                    <Box
                      className="educacaoCard"
                      id="2"
                      component={'span'}
                      sx={{
                        position: 'absolute',
                        color: 'white',
                        backgroundColor: '#648d64',
                        borderRadius: '50%',
                        top: '-3.5rem',
                        left: '-0.8rem',
                        width: '4rem',
                        height: '10rem',
                        transform: 'rotate(40deg)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        transition:
                          ' width 0.4s ease, height 0.4s ease, top 0.5s ease , left 0.5s ease ',
                      }}
                    >
                      <Box sx={{ transform: 'rotate(320deg)', ml: 1 }}>
                        {showAddIcon[2] && <AddToPhotosIcon />}
                      </Box>
                    </Box>
                  }
                />
              </Box>
            </Grid>
          </Grid>

          <Paper
            elevation={6}
            sx={{
              px: 2,
              boxSizing: 'border-box',
              width: 'calc(100% - 4rem)',
              margin: '2rem auto',
              minHeight: '70vh',
            }}
            style={{}}
          >
            <Stack
              direction={'column'}
              justifyContent={'space-between'}
              alignItems={'space-between'}
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
                <Box sx={{ px: 2, position: 'relative' }}>
                  <Bar
                    options={barOptions}
                    data={data}
                    height={460}
                    redraw={registerCasa.isLoading}
                  />
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
