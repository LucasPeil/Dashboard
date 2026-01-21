import { useTheme } from '@emotion/react';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import LocalLaundryServiceOutlinedIcon from '@mui/icons-material/LocalLaundryServiceOutlined';
import RamenDiningOutlinedIcon from '@mui/icons-material/RamenDiningOutlined';
import ShoppingBasketOutlinedIcon from '@mui/icons-material/ShoppingBasketOutlined';
import {
  Box,
  Divider,
  Grid,
  IconButton,
  Typography,
  useMediaQuery,
} from '@mui/material';
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

import useCasa from '../../hooks/useCasa';
const SingleAtividade = lazy(() => import('../SingleAtividade'));
const CasaDashboard = () => {
  const { data, uiStates, actions } = useCasa();
  const theme = useTheme();
  const omit = useMediaQuery(theme.breakpoints.down('lg'));
  const tableColumns = useMemo(
    () => [
      {
        name: 'Nome da atividade',
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
    [actions],
  );
  const buttonColumns = useMemo(() => {
    return [
      {
        name: 'Ações',
        width: '10%',
        button: 1,
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
  }, [actions]);

  return (
    <Box>
      <Outlet />
      <Suspense fallback={null}>
        <SingleAtividade
          id={uiStates.selectedRowId}
          openSingleAtividade={uiStates.openSingleAtividade}
          handleCloseSingleAtividade={actions.handleCloseSingleAtividade}
          iconColor={'#0a1e73'}
          category={'casa'}
        />
      </Suspense>
      <DashboardContainer>
        <DashboardsHeaders
          cleanFilters={actions.cleanFilters}
          categorySelected={uiStates.categorySelected}
          title={'DETALHES SOBRE AS ATIVIDADES DOMÉSTICAS'}
          path="nova-atividade/casa"
        />

        <CategoryCardsContainer minCardWidth={300}>
          <Box component={'li'}>
            <CategoryCards
              idx={0}
              title="Compras"
              description={
                'Veja as atividades relacionadas às compras do mês...'
              }
              classLabel="category-banner-casa"
              bgcolor={'#0c264e'}
              Icon={ShoppingBasketOutlinedIcon}
              qty={data.quantidadeCompras}
              // Novas Props Otimizadas
              isSelected={uiStates.categoryCardSelected[0]}
              onSelect={actions.handleCardClick}
            />
          </Box>

          <Box component={'li'}>
            <CategoryCards
              idx={1}
              title="Limpeza"
              description={
                'Veja as atividades relacionadas a limpeza do seu lar...'
              }
              classLabel="category-banner-casa"
              bgcolor={'#0c264e'}
              Icon={LocalLaundryServiceOutlinedIcon}
              qty={data.quantidadeLimpeza}
              isSelected={uiStates.categoryCardSelected[1]}
              onSelect={actions.handleCardClick}
            />
          </Box>

          <Box component={'li'}>
            <CategoryCards
              idx={2}
              title="Refeições"
              description={
                'Veja as atividades relacionadas a sua alimentação...'
              }
              classLabel="category-banner-casa"
              bgcolor={'#0c264e'}
              Icon={RamenDiningOutlinedIcon}
              qty={data.quantidadeRefeicoes}
              isSelected={uiStates.categoryCardSelected[2]}
              onSelect={actions.handleCardClick}
            />
          </Box>
        </CategoryCardsContainer>

        <Grid component={'section'} container>
          <Grid item xs={12} sx={{ position: 'relative', px: 2 }}>
            <DataTable
              className="table"
              columns={[...tableColumns, ...buttonColumns]}
              data={data.atividadesCasa.documents}
              customStyles={customStyles({ backgroundColor: '#D6E8FB' })}
              subHeader
              noDataComponent={<NoRecord />}
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
              highlightOnHover
              pointerOnHover
              progressPending={data.isLoading}
              progressComponent={<ProgressComponent limit={5} />}
              paginationTotalRows={data.atividadesCasa.total}
              onRowClicked={(row) => actions.handleRowClick(row._id)}
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

export default CasaDashboard;
