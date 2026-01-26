import BookOutlinedIcon from '@mui/icons-material/BookOutlined';
import CelebrationOutlinedIcon from '@mui/icons-material/CelebrationOutlined';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined';
import { Box, IconButton, Stack } from '@mui/material';
import { useMemo } from 'react';
import DataTable from 'react-data-table-component';
import { Outlet } from 'react-router-dom';
import MotionDiv from '../../MotionDiv';
import { customStyles } from '../../styles/stylesConst';
import SingleAtividade from '../SingleAtividade';
import CategoryCards from '../CategoryCards';
import CategoryCardsContainer from '../CategoryCardsContainer';
import DashboardContainer from '../Container';
import DashboardsHeaders from '../DashboardsHeaders';
import NoRecord from '../NoRecord';
import ProgressComponent from '../ProgressComponent';
import SearchBar from '../SearchBar';
import useLazer from '../../hooks/useLazer';
import MobileCategoryCards from '../MobileCategoryCards';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
const LazerDashboard = ({ open }) => {
  const { data, uiStates, actions } = useLazer();
  const theme = useTheme();
  const upSm = useMediaQuery(theme.breakpoints.up('sm'));
  const omit = useMediaQuery(theme.breakpoints.down('lg'));
  const upMd = useMediaQuery(theme.breakpoints.up('md'));
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
    [actions, omit],
  );
  const buttonColumns = useMemo(() => {
    return [
      {
        name: upMd ? 'Ações' : '',
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
  }, [actions, omit]);
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'end',
        height: upMd ? '100%' : 'calc(100vh - 3.5rem)',
        p: upMd ? '0.5rem' : '0',
        boxSizing: 'border-box',
      }}
    >
      <Outlet />
      <SingleAtividade
        id={uiStates.selectedRowId}
        openSingleAtividade={uiStates.openSingleAtividade}
        handleCloseSingleAtividade={actions.handleCloseSingleAtividade}
        iconColor={'#D67F20'}
        category={'lazer'}
      />

      <DashboardContainer>
        <Stack
          spacing={2}
          sx={{
            width: '100%',
            height: '100%',
            boxSizing: 'border-box',
            overflow: 'auto',
            p: '0.5rem 0.8rem',
          }}
        >
          <Box sx={{ flexShrink: 0 }}>
            <DashboardsHeaders
              cleanFilters={actions.cleanFilters}
              categorySelected={uiStates.categorySelected}
              title={'DETALHES SOBRE AS ATIVIDADES DE LAZER'}
              path="nova-atividade/lazer"
            />
          </Box>
          <Box sx={{ width: '100%', flexShrink: 1 }}>
            {upSm ? (
              <CategoryCardsContainer minCardWidth={220}>
                <CategoryCards
                  idx={0}
                  isSelected={uiStates.categoryCardSelected[0]}
                  onSelect={actions.handleCardClick}
                  distance={5}
                  classLabel="category-banner-lazer"
                  qty={data.quantidadeJogos}
                  title="Jogos"
                  description={'Veja os jogos que voce participou...'}
                  bgcolor={'#f4b26a'}
                  Icon={SportsEsportsOutlinedIcon}
                />

                <CategoryCards
                  idx={1}
                  isSelected={uiStates.categoryCardSelected[1]}
                  onSelect={actions.handleCardClick}
                  distance={15}
                  classLabel="category-banner-lazer"
                  qty={data.quantidadeCultura}
                  title="Cultura"
                  description={'As mais variadas atividades culturais...'}
                  bgcolor={'#f4b26a'}
                  Icon={BookOutlinedIcon}
                />

                <CategoryCards
                  idx={2}
                  isSelected={uiStates.categoryCardSelected[2]}
                  onSelect={actions.handleCardClick}
                  distance={5}
                  classLabel="category-banner-lazer"
                  qty={data.quantidadeEmGrupo}
                  title="Em grupo"
                  description={'Eventos sociais em que você marcou presença...'}
                  bgcolor={'#f4b26a'}
                  Icon={GroupsOutlinedIcon}
                />

                <CategoryCards
                  idx={3}
                  isSelected={uiStates.categoryCardSelected[3]}
                  onSelect={actions.handleCardClick}
                  distance={5}
                  classLabel="category-banner-lazer"
                  qty={data.quantidadeOutros}
                  title="Outros"
                  description={'Outras atividades de lazer...'}
                  bgcolor={'#f4b26a'}
                  Icon={CelebrationOutlinedIcon}
                />
              </CategoryCardsContainer>
            ) : (
              <Stack component={'ul'} spacing={1}>
                <Box component={'li'}>
                  <MobileCategoryCards
                    title="Jogos"
                    Icon={SportsEsportsOutlinedIcon}
                    qty={data.quantidadeJogos}
                    color={'#f4b26a'}
                  />
                </Box>
                <Box component={'li'}>
                  <MobileCategoryCards
                    title="Cultura"
                    Icon={BookOutlinedIcon}
                    qty={data.quantidadeCultura}
                    color={'#f4b26a'}
                  />
                </Box>
                <Box component={'li'}>
                  <MobileCategoryCards
                    title="Em grupo"
                    Icon={GroupsOutlinedIcon}
                    qty={data.quantidadeEmGrupo}
                    color={'#f4b26a'}
                  />
                </Box>
                <Box component={'li'}>
                  <MobileCategoryCards
                    title="Outros"
                    Icon={CelebrationOutlinedIcon}
                    qty={data.quantidadeOutros}
                    color={'#f4b26a'}
                  />
                </Box>
              </Stack>
            )}
          </Box>
          <Box
            sx={{
              width: '100%',
              height: '100%',
            }}
          >
            <DataTable
              className="table"
              columns={[...tableColumns, ...buttonColumns]}
              data={data.atividadesLazer.documents}
              customStyles={customStyles({
                backgroundColor: '#FBE9D6',
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
              pointerOnHover
              fixedHeader
              responsive
              progressPending={data.isLoading}
              progressComponent={<ProgressComponent limit={10} />}
              paginationTotalRows={data.atividadesLazer.total}
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
          </Box>
        </Stack>
      </DashboardContainer>
    </Box>
  );
};

export default LazerDashboard;
