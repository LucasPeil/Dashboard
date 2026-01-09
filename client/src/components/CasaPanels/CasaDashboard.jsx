import { useTheme } from '@emotion/react';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import LocalLaundryServiceOutlinedIcon from '@mui/icons-material/LocalLaundryServiceOutlined';
import RamenDiningOutlinedIcon from '@mui/icons-material/RamenDiningOutlined';
import ShoppingBasketOutlinedIcon from '@mui/icons-material/ShoppingBasketOutlined';
import {
  Box,
  Grid,
  IconButton,
  Paper,
  Stack,
  useMediaQuery,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import DataTable from 'react-data-table-component';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify'; // Import movido para cima
import MotionDiv from '../../MotionDiv';
import { Outlet } from 'react-router-dom';
import {
  getAllAtividadesCasa,
  getComprasQty,
  getLimpezaQty,
  getRefeicoesQty,
  removeSingleAtividade,
  resetRegisterCasa,
  resetRemoveCasa,
  setOpenModalCasa,
} from '../../features/casa/casaSlice';
import { customStyles } from '../../styles/stylesConst';
import CategoryCards from '../CategoryCards';
import DashboardsHeaders from '../DashboardsHeaders';

import ProgressComponent from '../ProgressComponent';
import SearchBar from '../SearchBar';
import SingleAtividade from './SingleAtividade';
import NoRecord from '../NoRecord';
import DashboardContainer from '../Container';

const CasaDashboard = () => {
  const [openSingleAtividade, setOpenSingleAtividade] = useState(false);
  const user = useSelector((state) => state.auth.user);
  // Callbacks simples
  const handleCloseSingleAtividade = useCallback(
    () => setOpenSingleAtividade(false),
    []
  );

  const [selectedRow, setSelectedRow] = useState();
  const [categorySelected, setCategorySelected] = useState('');

  // Paginação e Filtros
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sortDirection, setSortDirection] = useState(1);
  const [prop, setProp] = useState('_id');
  const [filter, setFilter] = useState('');

  const theme = useTheme();
  const downMd = useMediaQuery(theme.breakpoints.down('md'));

  // Estado dos Cards
  const [categoryCardSelected, setCategoryCardSelected] = useState([
    false,
    false,
    false,
  ]);

  const dispatch = useDispatch();
  const {
    atividadesCasa,
    isLoading,
    register,
    remove,
    quantidadeLimpeza,
    quantidadeCompras,
    quantidadeRefeicoes,
  } = useSelector((state) => state.atividadesCasa);
  const handleCardClick = useCallback((idx, title) => {
    setCategorySelected(title);
    setCategoryCardSelected((prev) => {
      const arrayCopy = [...prev].fill(false);
      // Se já estava ativo, desativa (toggle), senão ativa este índice
      arrayCopy[idx] = !prev[idx];
      return arrayCopy;
    });
  }, []);

  const cleanFilters = useCallback(() => {
    setCategorySelected('');
    setCategoryCardSelected([false, false, false]);
  }, []);

  useEffect(() => {
    if (register.isSuccess) {
      toast.success(register.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } else if (remove.isSuccess) {
      toast.success(remove.message, { position: toast.POSITION.BOTTOM_RIGHT });
    }
    dispatch(getComprasQty());
    dispatch(getLimpezaQty());
    dispatch(getRefeicoesQty());
    return () => {
      dispatch(resetRemoveCasa());
      dispatch(resetRegisterCasa());
    };
  }, [register, remove, dispatch]);

  const navigate = useNavigate();
  const tableColumns = useMemo(
    () => [
      {
        name: 'Nome da atividade',
        width: '45%',
        selector: (row) => row.nomeAtividade,
        sortable: true,
      },
      {
        name: 'Descrição',
        width: '45%',
        cell: (row) => row.descricaoAtividade,
        sortable: true,
      },
      {
        name: 'Ações',
        width: '10%',
        cell: (row) => (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              onClick={() => {
                navigate(`/casa/nova-atividade/casa/${row._id}`);
              }}
            >
              <EditTwoToneIcon color="success" />
            </IconButton>
            <IconButton
              onClick={() => {
                dispatch(
                  removeSingleAtividade({ id: row._id, userId: row?.userId })
                );
              }}
            >
              <DeleteTwoToneIcon color="error" />
            </IconButton>
          </Box>
        ),
      },
    ],
    [dispatch]
  ); // Dependência apenas no dispatch (que é estável)

  useEffect(() => {
    dispatch(
      getAllAtividadesCasa({
        page: 1,
        limit: limit,
        prop: prop,
        sortDirection: sortDirection,
        filter: filter,
        categorySelected: categorySelected,
        userId: user._id,
      })
    );
  }, [
    remove,
    register,
    filter,
    categorySelected,
    limit,
    prop,
    sortDirection,
    dispatch,
  ]);
  // Adicionei prop e sortDirection nas dependências se eles afetam o fetch

  return (
    <MotionDiv>
      <Outlet />
      <SingleAtividade
        rowData={selectedRow}
        openSingleAtividade={openSingleAtividade}
        handleCloseSingleAtividade={handleCloseSingleAtividade}
        iconColor={'#0a1e73'}
      />
      <DashboardContainer>
        <DashboardsHeaders
          cleanFilters={cleanFilters}
          categorySelected={categorySelected}
          title={'DETALHES SOBRE AS ATIVIDADES DOMÉSTICAS'}
        />

        <Stack
          direction={downMd ? 'column' : 'row'}
          spacing={downMd ? 2 : 5}
          sx={{
            justifyContent: 'start',
            alignItems: `${downMd ? 'center' : 'start'}`,
            mt: 7,
            mb: 2,
            position: 'relative',
            zIndex: 10,
            width: '100%',
            px: 2,
            boxSizing: 'border-box',
          }}
        >
          <CategoryCards
            idx={0}
            title="Compras"
            description={'Veja as atividades relacionadas às compras do mês...'}
            classLabel="category-banner-casa"
            bgcolor={'#0c264e'}
            Icon={ShoppingBasketOutlinedIcon}
            qty={quantidadeCompras}
            // Novas Props Otimizadas
            isSelected={categoryCardSelected[0]}
            onSelect={handleCardClick}
          />

          <CategoryCards
            idx={1}
            title="Limpeza"
            description={
              'Veja as atividades relacionadas a limpeza do seu lar...'
            }
            classLabel="category-banner-casa"
            bgcolor={'#0c264e'}
            Icon={LocalLaundryServiceOutlinedIcon}
            qty={quantidadeLimpeza}
            isSelected={categoryCardSelected[1]}
            onSelect={handleCardClick}
          />

          <CategoryCards
            idx={2}
            title="Refeições"
            description={'Veja as atividades relacionadas a sua alimentação...'}
            classLabel="category-banner-casa"
            bgcolor={'#0c264e'}
            Icon={RamenDiningOutlinedIcon}
            qty={quantidadeRefeicoes}
            isSelected={categoryCardSelected[2]}
            onSelect={handleCardClick}
          />
        </Stack>

        <Grid container>
          <Grid item xs={12} sx={{ position: 'relative', px: 2 }}>
            <DataTable
              className="table"
              columns={tableColumns}
              data={atividadesCasa.documents}
              customStyles={customStyles({ backgroundColor: '#D6E8FB' })}
              subHeader
              noDataComponent={<NoRecord />}
              subHeaderComponent={
                <SearchBar setFilter={setFilter} filter={filter} />
              }
              striped
              pagination
              paginationServer
              fixedHeader
              responsive
              highlightOnHover
              progressPending={isLoading}
              progressComponent={<ProgressComponent limit={limit} />}
              paginationTotalRows={atividadesCasa.total}
              onRowClicked={(row) => {
                setSelectedRow(row);
                setOpenSingleAtividade(true);
              }}
              // ... restante das props de paginação mantidas ...
              onChangePage={(newPage) => {
                setPage(newPage);
                //dispatch manual ou page no array de dependencias do useEffect
                dispatch(
                  getAllAtividadesCasa({
                    page: newPage,
                    limit,
                    prop,
                    sortDirection,
                    filter,
                    categorySelected,
                    userId: user._id,
                  })
                );
              }}
              onChangeRowsPerPage={(newLimit) => {
                setLimit(newLimit);
                dispatch(
                  getAllAtividadesCasa({
                    page,
                    limit: newLimit,
                    prop,
                    sortDirection,
                    filter,
                    categorySelected,
                    userId: user._id,
                  })
                );
              }}
            />
          </Grid>
        </Grid>
      </DashboardContainer>
    </MotionDiv>
  );
};

export default CasaDashboard;
