import CelebrationOutlinedIcon from "@mui/icons-material/CelebrationOutlined";
import {
  Box,
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import React, { useEffect, useState } from "react";
import PaletteOutlinedIcon from "@mui/icons-material/PaletteOutlined";
import BookOutlinedIcon from "@mui/icons-material/BookOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined";
import DataTable from "react-data-table-component";
import { customStyles } from "../../styles/stylesConst";
import { useTheme } from "@emotion/react";
import SearchBar from "../SearchBar";
import CategoryCards from "../CategoryCards";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  getAllAtividadesLazer,
  getCulturaQty,
  getJogosQty,
  getEmGrupoQty,
  getOutrosQty,
  closeModalLazer,
  removeSingleAtividadeLazer,
  resetRegisterLazer,
  resetRemoveLazer,
  setOpenModalLazer,
} from "../../features/lazer/lazerSlice";
import MotionDiv from "../../MotionDiv";
import FormAtividade from "../FormAtividade";
import SingleAtividade from "../CasaPanels/SingleAtividade";
import DashboardsHeaders from "../DashboardsHeaders";
import ProgressComponent from "../ProgressComponent";
const LazerDashboard = ({ open }) => {
  const dispatch = useDispatch();
  const [openSingleAtividade, setOpenSingleAtividade] = useState(false);
  const handleOpenSingleAtividade = () => setOpenSingleAtividade(true);
  const handleCloseSingleAtividade = () => setOpenSingleAtividade(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sortDirection, setSortDirection] = useState(1);
  const [prop, setProp] = useState("_id");
  const [filter, setFilter] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const [selectedRow, setSelectedRow] = useState();
  const [categoryCardSelected, setCategoryCardSelected] = useState([
    false,
    false,
    false,
  ]);
  const [categorySelected, setCategorySelected] = useState("");
  const theme = useTheme();
  const downMd = useMediaQuery(theme.breakpoints.down("md"));
  const {
    atividadesLazer,
    openModalLazer,
    isLoading,
    register,
    remove,
    quantidadeJogos,
    quantidadeOutros,
    quantidadeCultura,
    quantidadeEmGrupo,
  } = useSelector((state) => state.atividadesLazer);

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
  }, [register, remove]);
  useEffect(() => {
    dispatch(
      getAllAtividadesLazer({
        page: page,
        limit: limit,
        prop: prop,
        sortDirection: sortDirection,
        filter: filter,
        categorySelected: categorySelected,
      })
    );
  }, [register, remove, filter, categorySelected]);

  const tableColumns = [
    {
      name: "Nome da atividade",
      width: "45%",
      selector: (row) => row.nomeAtividade,
      sortable: true,
    },
    {
      name: "Descrição",
      width: "45%",
      cell: (row) => row.descricaoAtividade,
      sortable: true,
    },

    {
      name: "Ações",
      width: "10%",
      cell: (row) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <IconButton
            onClick={() => {
              setSelectedRow(row);

              dispatch(setOpenModalLazer());
            }}
          >
            <EditTwoToneIcon color="success" />
          </IconButton>
          <IconButton
            onClick={() => {
              dispatch(removeSingleAtividadeLazer(row._id));
            }}
          >
            <DeleteTwoToneIcon color="error" />
          </IconButton>
        </Box>
      ),
    },
  ];

  const cleanForm = (form) => {
    form.setFieldValue("nomeAtividade", "");
    form.setFieldValue("categoria", "");
    form.setFieldValue("descricaoAtividade", "");
    form.setFieldValue("tempoGasto", "");
    form.setFieldValue("dinheiroGasto", "");
    form.setFieldValue("nivelImportância", "");
  };
  // 15 30 20 10
  return (
    <MotionDiv>
      <Box sx={{ display: "flex", justifyContent: "end" }}>
        <FormAtividade
          openModal={openModalLazer}
          handleCloseModal={closeModalLazer}
          title={"Nova Atividade De Lazer"}
          btnColor="#f4b26a"
          btnHoverColor="#E39F54"
          categoriaItens={["Jogos", "Cultura", "Em grupo", "Outros"]}
          card={"Lazer"}
          cleanForm={cleanForm}
          data={selectedRow}
        />
        {/* MODAL SINGLE ATIVIDADE */}
        {openSingleAtividade && (
          <SingleAtividade
            rowData={selectedRow}
            openSingleAtividade={openSingleAtividade}
            handleCloseSingleAtividade={handleCloseSingleAtividade}
            iconColor={"#D67F20"}
          />
        )}
        <Box
          sx={{
            transition: "all 0.5s ease",
            width: open ? "calc(100% - 14rem)" : "calc(100% - 6rem)",
          }}
        >
          <Paper
            /* onMouseOver={() => coverEffect()} */
            elevation={6}
            sx={{
              px: 2,
              boxSizing: "border-box",
              width: "calc(100% - 4rem)",
              margin: "2rem auto",
              minHeight: "90vh",
              position: "relative",
            }}
            style={{}}
          >
            <DashboardsHeaders
              setCategorySelected={setCategorySelected}
              categorySelected={categorySelected}
              active={categoryCardSelected}
              setActive={setCategoryCardSelected}
              title={"DETALHES SOBRE AS ATIVIDADES DE LAZER"}
              openModal={() => dispatch(setOpenModalLazer())}
            />
            <Stack
              direction={"column"}
              justifyContent={"space-between"}
              alignItems={"space-between"}
            ></Stack>
            <Stack
              direction={downMd ? "column" : "row"}
              spacing={10}
              sx={{
                mt: 7,
                mb: 2,
                mx: 2,
                position: "relative",
                zIndex: 10,
              }}
            >
              <CategoryCards
                idx={0}
                active={categoryCardSelected}
                setActive={setCategoryCardSelected}
                distance={5}
                classLabel="category-banner-lazer"
                qty={quantidadeJogos}
                categorySelected={categorySelected}
                setCategorySelected={setCategorySelected}
                title="Jogos"
                description={"Veja os jogos que voce participou..."}
                bgcolor={"#f4b26a"}
                icon={
                  <SportsEsportsOutlinedIcon
                    sx={{
                      position: "absolute",
                      fontSize: "2rem",
                      ml: 2,
                    }}
                  />
                }
              />
              <CategoryCards
                idx={1}
                active={categoryCardSelected}
                setActive={setCategoryCardSelected}
                distance={15}
                classLabel="category-banner-lazer"
                qty={quantidadeCultura}
                categorySelected={categorySelected}
                setCategorySelected={setCategorySelected}
                title="Cultura"
                description={"As mais variadas atividades culturais..."}
                bgcolor={"#f4b26a"}
                icon={
                  <BookOutlinedIcon
                    sx={{
                      position: "absolute",
                      fontSize: "2rem",
                      ml: 2,
                    }}
                  />
                }
              />
              <CategoryCards
                idx={2}
                active={categoryCardSelected}
                setActive={setCategoryCardSelected}
                distance={5}
                classLabel="category-banner-lazer"
                qty={quantidadeEmGrupo}
                categorySelected={categorySelected}
                setCategorySelected={setCategorySelected}
                title="Em grupo"
                description={"Eventos sociais em que você marcou presença..."}
                bgcolor={"#f4b26a"}
                icon={
                  <GroupsOutlinedIcon
                    sx={{
                      position: "absolute",
                      fontSize: "2rem",
                      ml: 2,
                    }}
                  />
                }
              />
              <CategoryCards
                idx={3}
                active={categoryCardSelected}
                setActive={setCategoryCardSelected}
                distance={5}
                classLabel="category-banner-lazer"
                qty={quantidadeOutros}
                categorySelected={categorySelected}
                setCategorySelected={setCategorySelected}
                title="Outros"
                description={"Outras atividades de lazer..."}
                bgcolor={"#f4b26a"}
                icon={
                  <CelebrationOutlinedIcon
                    sx={{
                      position: "absolute",
                      fontSize: "2.2rem",
                      ml: 2,
                    }}
                  />
                }
              />
            </Stack>

            <Grid container>
              <Grid
                sx={{
                  display: "flex",
                  position: "relative",
                  flexDirection: "column",
                  justifyContent: "start",
                  alignItems: "start",
                }}
                item
                xs={12}
              >
                <Box
                  sx={{
                    boxSizing: "border-box",
                    p: 1,
                    height: "53px",
                    // borderRadius: "0.8rem",
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                    width: "100%",
                  }}
                ></Box>
              </Grid>

              <Grid item xs={12} sx={{ position: "relative", px: 2 }}>
                <DataTable
                  className="table"
                  columns={tableColumns}
                  data={atividadesLazer.documents}
                  customStyles={customStyles({
                    backgroundColor: "#FBE9D6",
                  })}
                  highlightOnHover
                  subHeader
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
                    rowsPerPageText: "Itens por página",
                    rangeSeparatorText: "de",
                    selectAllRowsItem: true,
                    selectAllRowsItemText: "Todos",
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
                      })
                    );
                    setLimit(newLimit);
                  }}
                />
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </Box>
    </MotionDiv>
  );
};

export default LazerDashboard;
