import CastForEducationOutlinedIcon from '@mui/icons-material/CastForEducationOutlined';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import {
  Box,
  Grid,
  IconButton,
  Paper,
  Stack,
  Divider,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { toast } from 'react-toastify';
import { useTheme } from '@emotion/react';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import DataTable from 'react-data-table-component';
import { useDispatch, useSelector } from 'react-redux';
import MotionDiv from '../../MotionDiv';
import {
  getAllAtividadesEducacao,
  getCursosQty,
  getLivrosQty,
  getSeminariosQty,
  removeSingleAtividadeEducacao,
  resetRegisterEducacao,
  resetRemoveEducacao,
} from '../../features/educacao/educacaoSlice';
import { Outlet } from 'react-router-dom';
import { customStyles } from '../../styles/stylesConst';
import SingleAtividade from '../CasaPanels/SingleAtividade';
import CategoryCards from '../CategoryCards';
import DashboardsHeaders from '../DashboardsHeaders';

import ProgressComponent from '../ProgressComponent';
import SearchBar from '../SearchBar';
import NoRecord from '../NoRecord';
import { useNavigate } from 'react-router-dom';
import DashboardContainer from '../Container';
import CategoryCardsContainer from '../CategoryCardsContainer';
const EducacaoDashboard = () => {
  const dispatch = useDispatch();
  const [openSingleAtividade, setOpenSingleAtividade] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const handleCloseSingleAtividade = useCallback(
    () => setOpenSingleAtividade(false),
    [],
  );

  const [selectedRow, setSelectedRow] = useState();
  const [categorySelected, setCategorySelected] = useState('');
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sortDirection, setSortDirection] = useState(1);
  const [prop, setProp] = useState('_id');
  const [filter, setFilter] = useState('');

  const theme = useTheme();

  const omit = useMediaQuery(theme.breakpoints.down('lg'));
  const [categoryCardSelected, setCategoryCardSelected] = useState([
    false,
    false,
  ]);

  const {
    atividadesEducacao,
    isLoading,
    register,
    remove,
    quantidadeCursos,
    quantidadeLivros,
    quantidadeSeminarios,
  } = useSelector((state) => state.atividadesEducacao);

  const handleCardClick = useCallback((idx, title) => {
    setCategorySelected(title);
    setCategoryCardSelected((prev) => {
      const arrayCopy = [...prev].fill(false);
      arrayCopy[idx] = !prev[idx];
      return arrayCopy;
    });
  }, []);

  const cleanFilters = useCallback(() => {
    setCategorySelected('');
    setCategoryCardSelected([false, false]);
  }, []);

  useEffect(() => {
    if (register.isSuccess) {
      toast.success(register.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } else if (remove.isSuccess) {
      toast.success(remove.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }

    dispatch(getCursosQty());
    dispatch(getLivrosQty());
    dispatch(getSeminariosQty());
    return () => {
      dispatch(resetRegisterEducacao());
      dispatch(resetRemoveEducacao());
    };
  }, [register, remove, dispatch]);

  useEffect(() => {
    dispatch(
      getAllAtividadesEducacao({
        page: page,
        limit: limit,
        prop: prop,
        sortDirection: sortDirection,
        filter: filter,
        categorySelected: categorySelected,
        userId: user._id,
      }),
    );
  }, [
    register,
    remove,
    filter,
    categorySelected,
    page,
    limit,
    prop,
    sortDirection,
    dispatch,
  ]);
  const tableColumns = useMemo(
    () => [
      {
        name: 'Nome da Atividade',
        width: '45%',
        selector: (row) => row.nomeAtividade,
        sortable: true,
        omit: omit,
      },
      {
        name: 'Descrição',
        width: '45%',
        cell: (row) => row.descricaoAtividade,
        sortable: true,
        omit: omit,
      },
      {
        id: 'all',
        omit: !omit,
        grow: 2,
        cell: (row) => {
          return (
            <Box sx={{ pt: 2, width: '100%' }}>
              <Divider sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
                Nome
              </Divider>
              <Typography sx={{ py: 1, textAlign: 'center' }}>
                {row.nomeAtividade.length > 30
                  ? `${row.nomeAtividade.slice(0, 30)}...`
                  : `${row.nomeAtividade} `}
              </Typography>
              <Divider sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
                Descrição
              </Divider>
              <Typography sx={{ py: 1, textAlign: 'center' }}>
                {row.descricaoAtividade.length > 30
                  ? `${row.descricaoAtividade.slice(0, 30)}...`
                  : `${row.descricaoAtividade} `}
              </Typography>
            </Box>
          );
        },
      },
    ],
    [dispatch, omit],
  );

  const buttonColumns = useMemo(() => {
    return [
      {
        name: 'Ações',
        width: '10%',
        button: true,
        cell: (row) => (
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', lg: 'row' },
              alignItems: 'center',
            }}
          >
            <IconButton
              onClick={() => {
                navigate(`/educacao/nova-atividade/educacao/${row._id}`);
              }}
            >
              <EditTwoToneIcon color="success" />
            </IconButton>
            <IconButton
              onClick={() => {
                dispatch(
                  removeSingleAtividadeEducacao({
                    id: row._id,
                    userId: row?.userId,
                  }),
                );
              }}
            >
              <DeleteTwoToneIcon color="error" />
            </IconButton>
          </Box>
        ),
      },
    ];
  }, [dispatch, omit]);
  return (
    <MotionDiv>
      <Outlet />
      <SingleAtividade
        rowData={selectedRow}
        openSingleAtividade={openSingleAtividade}
        handleCloseSingleAtividade={handleCloseSingleAtividade}
        iconColor={'#1D791D'}
        isAtividadeEducacao={true}
      />
      <DashboardContainer>
        <DashboardsHeaders
          cleanFilters={cleanFilters}
          categorySelected={categorySelected}
          title={'DETALHES SOBRE SUA EDUCAÇÃO'}
          path="nova-atividade/educacao"
        />

        <CategoryCardsContainer minCardWidth={220}>
          <CategoryCards
            idx={0}
            isSelected={categoryCardSelected[0]}
            onSelect={handleCardClick}
            distance={5}
            classLabel="category-banner-educacao"
            qty={quantidadeCursos}
            categorySelected={categorySelected}
            setCategorySelected={setCategorySelected}
            title="Cursos"
            description={'Veja quais cursos você assistiu...'}
            bgcolor={'#648d64'}
            Icon={CastForEducationOutlinedIcon}
          />
          <CategoryCards
            idx={1}
            isSelected={categoryCardSelected[1]}
            onSelect={handleCardClick}
            distance={5}
            classLabel="category-banner-educacao"
            qty={quantidadeLivros}
            categorySelected={categorySelected}
            setCategorySelected={setCategorySelected}
            title="Livros"
            description={'Dê uma olhada nos livros lidos nesse mês...'}
            bgcolor={'#648d64'}
            Icon={MenuBookOutlinedIcon}
          />
          <CategoryCards
            idx={2}
            isSelected={categoryCardSelected[2]}
            onSelect={handleCardClick}
            distance={5}
            classLabel="category-banner-educacao"
            qty={quantidadeSeminarios}
            categorySelected={categorySelected}
            setCategorySelected={setCategorySelected}
            title="Seminários"
            description={'Dê uma olhada nos seminários assistidos...'}
            bgcolor={'#648d64'}
            Icon={MenuBookOutlinedIcon}
          />
        </CategoryCardsContainer>

        <Grid component={'section'} container>
          <Grid item xs={12} sx={{ position: 'relative', px: 2 }}>
            <DataTable
              className="table"
              columns={[...tableColumns, ...buttonColumns]}
              data={atividadesEducacao.documents}
              customStyles={customStyles({
                backgroundColor: '#CEF4CE',
              })}
              highlightOnHover
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
              progressPending={isLoading}
              progressComponent={<ProgressComponent limit={limit} />}
              paginationTotalRows={atividadesEducacao.total}
              onRowClicked={(row) => {
                setSelectedRow(row);
                setOpenSingleAtividade(true);
              }}
              paginationComponentOptions={{
                rowsPerPageText: 'Itens por página',
                rangeSeparatorText: 'de',
                selectAllRowsItem: true,
                selectAllRowsItemText: 'Todos',
              }}
              onChangePage={(newPage) => {
                dispatch(
                  getAllAtividadesEducacao({
                    page: newPage,
                    limit: limit,
                    prop: prop,
                    sortDirection: sortDirection,
                    filter: filter,
                    categorySelected: categorySelected,
                    userId: user._id,
                  }),
                );
                setPage(newPage);
              }}
              onChangeRowsPerPage={(newLimit) => {
                dispatch(
                  getAllAtividadesEducacao({
                    page: page,
                    limit: newLimit,
                    prop: prop,
                    sortDirection: sortDirection,
                    filter: filter,
                    categorySelected: categorySelected,
                    userId: user._id,
                  }),
                );
                setLimit(newLimit);
              }}
            />
          </Grid>
        </Grid>
      </DashboardContainer>
    </MotionDiv>
  );
};

export default EducacaoDashboard;
