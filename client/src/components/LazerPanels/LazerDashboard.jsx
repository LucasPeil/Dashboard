import { useTheme } from '@emotion/react';
import BookOutlinedIcon from '@mui/icons-material/BookOutlined';
import CelebrationOutlinedIcon from '@mui/icons-material/CelebrationOutlined';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined';
import { Box, Grid, IconButton, useMediaQuery } from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';
import DataTable from 'react-data-table-component';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  getAllAtividadesLazer,
  getCulturaQty,
  getEmGrupoQty,
  getJogosQty,
  getOutrosQty,
  removeSingleAtividadeLazer,
  resetRegisterLazer,
  resetRemoveLazer,
} from '../../features/lazer/lazerSlice';
import MotionDiv from '../../MotionDiv';
import { customStyles } from '../../styles/stylesConst';
import SingleAtividade from '../CasaPanels/SingleAtividade';
import CategoryCards from '../CategoryCards';
import DashboardContainer from '../Container';
import DashboardsHeaders from '../DashboardsHeaders';
import NoRecord from '../NoRecord';
import ProgressComponent from '../ProgressComponent';
import SearchBar from '../SearchBar';
import CategoryCardsContainer from '../CategoryCardsContainer';

const LazerDashboard = ({ open }) => {
  const dispatch = useDispatch();
  const [openSingleAtividade, setOpenSingleAtividade] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const handleCloseSingleAtividade = useCallback(
    () => setOpenSingleAtividade(false),
    []
  );

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sortDirection, setSortDirection] = useState(1);
  const [prop, setProp] = useState('_id');
  const [filter, setFilter] = useState('');

  const [selectedRow, setSelectedRow] = useState();
  const [categoryCardSelected, setCategoryCardSelected] = useState([
    false,
    false,
    false,
    false,
  ]);
  const [categorySelected, setCategorySelected] = useState('');
  const navigate = useNavigate();
  const theme = useTheme();
  const downMd = useMediaQuery(theme.breakpoints.down('md'));
  const downLg = useMediaQuery(theme.breakpoints.down('lg'));

  const {
    atividadesLazer,
    isLoading,
    register,
    remove,
    quantidadeJogos,
    quantidadeOutros,
    quantidadeCultura,
    quantidadeEmGrupo,
  } = useSelector((state) => state.atividadesLazer);

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
    setCategoryCardSelected([false, false, false, false]);
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

    dispatch(getCulturaQty());
    dispatch(getEmGrupoQty());
    dispatch(getJogosQty());
    dispatch(getOutrosQty());
    return () => {
      dispatch(resetRemoveLazer());
      dispatch(resetRegisterLazer());
    };
  }, [register, remove, dispatch]);

  useEffect(() => {
    dispatch(
      getAllAtividadesLazer({
        page: page,
        limit: limit,
        prop: prop,
        sortDirection: sortDirection,
        filter: filter,
        categorySelected: categorySelected,
        userId: user._id,
      })
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
                navigate(`/lazer/nova-atividade/lazer/${row._id}`);
              }}
            >
              <EditTwoToneIcon color="success" />
            </IconButton>
            <IconButton
              onClick={() => {
                dispatch(
                  removeSingleAtividadeLazer({
                    id: row._id,
                    userId: row?.userId,
                  })
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
  );

  return (
    <MotionDiv>
      <Outlet />
      <SingleAtividade
        rowData={selectedRow}
        openSingleAtividade={openSingleAtividade}
        handleCloseSingleAtividade={handleCloseSingleAtividade}
        iconColor={'#D67F20'}
      />

      <DashboardContainer>
        <DashboardsHeaders
          cleanFilters={cleanFilters}
          categorySelected={categorySelected}
          title={'DETALHES SOBRE AS ATIVIDADES DE LAZER'}
          path="nova-atividade/lazer"
        />

        <CategoryCardsContainer minCardWidth={220}>
          <CategoryCards
            idx={0}
            isSelected={categoryCardSelected[0]}
            onSelect={handleCardClick}
            distance={5}
            classLabel="category-banner-lazer"
            qty={quantidadeJogos}
            title="Jogos"
            description={'Veja os jogos que voce participou...'}
            bgcolor={'#f4b26a'}
            Icon={SportsEsportsOutlinedIcon}
          />

          <CategoryCards
            idx={1}
            isSelected={categoryCardSelected[1]}
            onSelect={handleCardClick}
            distance={15}
            classLabel="category-banner-lazer"
            qty={quantidadeCultura}
            title="Cultura"
            description={'As mais variadas atividades culturais...'}
            bgcolor={'#f4b26a'}
            Icon={BookOutlinedIcon}
          />

          <CategoryCards
            idx={2}
            isSelected={categoryCardSelected[2]}
            onSelect={handleCardClick}
            distance={5}
            classLabel="category-banner-lazer"
            qty={quantidadeEmGrupo}
            title="Em grupo"
            description={'Eventos sociais em que você marcou presença...'}
            bgcolor={'#f4b26a'}
            Icon={GroupsOutlinedIcon}
          />

          <CategoryCards
            idx={3}
            isSelected={categoryCardSelected[3]}
            onSelect={handleCardClick}
            distance={5}
            classLabel="category-banner-lazer"
            qty={quantidadeOutros}
            title="Outros"
            description={'Outras atividades de lazer...'}
            bgcolor={'#f4b26a'}
            Icon={CelebrationOutlinedIcon}
          />
        </CategoryCardsContainer>

        <Grid container>
          <Grid
            sx={{
              display: 'flex',
              position: 'relative',
              flexDirection: 'column',
              justifyContent: 'start',
              alignItems: 'start',
            }}
            item
            xs={12}
          >
            <Box
              sx={{
                boxSizing: 'border-box',
                p: 1,
                height: '53px',
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                width: '100%',
              }}
            ></Box>
          </Grid>

          <Grid item xs={12} sx={{ position: 'relative', px: 2 }}>
            <DataTable
              className="table"
              columns={tableColumns}
              data={atividadesLazer.documents}
              customStyles={customStyles({
                backgroundColor: '#FBE9D6',
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
              pointerOnHover
              fixedHeader
              responsive
              progressPending={isLoading}
              progressComponent={<ProgressComponent limit={limit} />}
              paginationTotalRows={atividadesLazer.total}
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
                  getAllAtividadesLazer({
                    page: newPage,
                    limit: limit,
                    prop: prop,
                    sortDirection: sortDirection,
                    filter: filter,
                    categorySelected: categorySelected,
                    userId: user._id,
                  })
                );
                setPage(newPage);
              }}
              onChangeRowsPerPage={(newLimit) => {
                dispatch(
                  getAllAtividadesLazer({
                    page: page,
                    limit: newLimit,
                    prop: prop,
                    sortDirection: sortDirection,
                    filter: filter,
                    categorySelected: categorySelected,
                    userId: user._id,
                  })
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

export default LazerDashboard;
