import CastForEducationOutlinedIcon from '@mui/icons-material/CastForEducationOutlined';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import {
  Box,
  Divider,
  Grid,
  IconButton,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { lazy, Suspense, useMemo } from 'react';
import DataTable from 'react-data-table-component';
import { Outlet } from 'react-router-dom';
import MotionDiv from '../../MotionDiv';
import { customStyles } from '../../styles/stylesConst';
import CategoryCards from '../CategoryCards';
import CategoryCardsContainer from '../CategoryCardsContainer';
import DashboardContainer from '../Container';
import DashboardsHeaders from '../DashboardsHeaders';
import NoRecord from '../NoRecord';
import ProgressComponent from '../ProgressComponent';
import SearchBar from '../SearchBar';
import SingleAtividadeSkeleton from '../SingleAtividadeSkeleton';
import useEducacao from '../../hooks/useEducacao';

const SingleAtividade = lazy(() => import('../SingleAtividade'));
const EducacaoDashboard = () => {
  const { data, uiStates, actions } = useEducacao();
  const theme = useTheme();

  const omit = useMediaQuery(theme.breakpoints.down('lg'));

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
            <Box
              onClick={() => actions.handleRowClick(row._id)}
              sx={{ pt: 2, width: '100%', cursor: 'pointer' }}
            >
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
    [omit],
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
            <IconButton onClick={() => actions.handleEdit(row._id)}>
              <EditTwoToneIcon color="success" />
            </IconButton>
            <IconButton
              onClick={() => actions.handleDelete(row._id, row?.userId)}
            >
              <DeleteTwoToneIcon color="error" />
            </IconButton>
          </Box>
        ),
      },
    ];
  }, [actions, omit]);
  return (
    <Box>
      <Outlet />
      <Suspense fallback={<SingleAtividadeSkeleton />}>
        <SingleAtividade
          id={uiStates.selectedRowId}
          openSingleAtividade={uiStates.openSingleAtividade}
          handleCloseSingleAtividade={actions.handleCloseSingleAtividade}
          iconColor={'#1D791D'}
          category={'educacao'}
        />
      </Suspense>
      <DashboardContainer>
        <Box sx={{ width: '100%' }}>
          <DashboardsHeaders
            cleanFilters={actions.cleanFilters}
            categorySelected={uiStates.categorySelected}
            title={'DETALHES SOBRE SUA EDUCAÇÃO'}
            path="nova-atividade/educacao"
          />

          <CategoryCardsContainer minCardWidth={220}>
            <CategoryCards
              idx={0}
              isSelected={uiStates.categoryCardSelected[0]}
              onSelect={actions.handleCardClick}
              distance={5}
              classLabel="category-banner-educacao"
              qty={data.quantidadeCursos}
              categorySelected={uiStates.categorySelected}
              setCategorySelected={actions.setCategorySelected}
              title="Cursos"
              description={'Veja quais cursos você assistiu...'}
              bgcolor={'#648d64'}
              Icon={CastForEducationOutlinedIcon}
            />
            <CategoryCards
              idx={1}
              isSelected={uiStates.categoryCardSelected[1]}
              onSelect={actions.handleCardClick}
              distance={5}
              classLabel="category-banner-educacao"
              qty={data.quantidadeLivros}
              categorySelected={uiStates.categorySelected}
              setCategorySelected={actions.setCategorySelected}
              title="Livros"
              description={'Dê uma olhada nos livros lidos nesse mês...'}
              bgcolor={'#648d64'}
              Icon={MenuBookOutlinedIcon}
            />
            <CategoryCards
              idx={2}
              isSelected={uiStates.categoryCardSelected[2]}
              onSelect={actions.handleCardClick}
              distance={5}
              classLabel="category-banner-educacao"
              qty={data.quantidadeSeminarios}
              categorySelected={uiStates.categorySelected}
              setCategorySelected={actions.setCategorySelected}
              title="Seminários"
              description={'Dê uma olhada nos seminários assistidos...'}
              bgcolor={'#648d64'}
              Icon={MenuBookOutlinedIcon}
            />
          </CategoryCardsContainer>
        </Box>
        <Grid component={'section'} container sx={{ height: '100%' }}>
          <Grid item xs={12} sx={{ position: 'relative', px: 2 }}>
            <DataTable
              className="table"
              columns={[...tableColumns, ...buttonColumns]}
              data={data.atividadesEducacao.documents}
              customStyles={customStyles({
                backgroundColor: '#CEF4CE',
              })}
              highlightOnHover
              subHeader
              noDataComponent={!data.isLoading && <NoRecord />}
              subHeaderComponent={
                <SearchBar
                  setFilter={actions.setFilter}
                  filter={uiStates.filter}
                />
              }
              striped
              pagination
              paginationServer
              fixedHeader
              responsive
              pointerOnHover
              progressPending={data.isLoading}
              progressComponent={<ProgressComponent limit={10} />}
              paginationTotalRows={data.atividadesEducacao.total}
              onRowClicked={(row) => actions.handleRowClick(row._id)}
              paginationComponentOptions={{
                rowsPerPageText: 'Itens por página',
                rangeSeparatorText: 'de',
                selectAllRowsItem: true,
                selectAllRowsItemText: 'Todos',
              }}
              onChangePage={(newPage) => actions.handlePageChange(newPage)}
              onChangeRowsPerPage={(newLimit) =>
                actions.handleRowsPerPageChange(newLimit)
              }
            />
          </Grid>
        </Grid>
      </DashboardContainer>
    </Box>
  );
};

export default EducacaoDashboard;
