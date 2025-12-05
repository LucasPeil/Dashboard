import CastForEducationOutlinedIcon from "@mui/icons-material/CastForEducationOutlined";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import {
  Box,
  Grid,
  IconButton,
  Paper,
  Stack,
  useMediaQuery,
} from "@mui/material";
import { toast } from "react-toastify";
import { useTheme } from "@emotion/react";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import MotionDiv from "../../MotionDiv";
import {
  closeModalEducacao,
  getAllAtividadesEducacao,
  getCursosQty,
  getLivrosQty,
  removeSingleAtividadeEducacao,
  resetRegisterEducacao,
  resetRemoveEducacao,
  setOpenModalEducacao,
} from "../../features/educacao/educacaoSlice";
import { customStyles } from "../../styles/stylesConst";
import SingleAtividade from "../CasaPanels/SingleAtividade";
import CategoryCards from "../CategoryCards";
import DashboardsHeaders from "../DashboardsHeaders";
import FormAtividade from "../FormAtividade";
import ProgressComponent from "../ProgressComponent";
import SearchBar from "../SearchBar";
const EducacaoDashboard = ({ open }) => {
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
  ]);
  const [categorySelected, setCategorySelected] = useState("");
  const theme = useTheme();
  const downMd = useMediaQuery(theme.breakpoints.down("md"));
  const {
    atividadesEducacao,
    openModalEducacao,
    isLoading,
    register,
    remove,
    quantidadeCursos,
    quantidadeLivros,
  } = useSelector((state) => state.atividadesEducacao);
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
    return () => {
      dispatch(resetRegisterEducacao());
      dispatch(resetRemoveEducacao());
    };
  }, [register, remove]);
  useEffect(() => {
    dispatch(
      getAllAtividadesEducacao({
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
      name: "Título",
      selector: (row) => row.nomeAtividade,
      sortable: true,
    },
    {
      name: "Descrição",
      selector: (row) => row.descricaoAtividade,
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

              dispatch(setOpenModalEducacao());
            }}
          >
            <EditTwoToneIcon color="success" />
          </IconButton>
          <IconButton
            onClick={() => {
              dispatch(removeSingleAtividadeEducacao(row._id));
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

  return (
    <MotionDiv>
      <Box sx={{ display: "flex", justifyContent: "end" }}>
        <FormAtividade
          openModal={openModalEducacao}
          handleCloseModal={closeModalEducacao}
          title={"Nova Atividade Educação"}
          btnColor="#648d64"
          btnHoverColor="#4E7A4E"
          categoriaItens={["Cursos", "Livros"]}
          card={"Educação"}
          cleanForm={cleanForm}
          data={selectedRow}
        />
        {/* MODAL SINGLE ATIVIDADE */}
        {openSingleAtividade && (
          <SingleAtividade
            rowData={selectedRow}
            openSingleAtividade={openSingleAtividade}
            handleCloseSingleAtividade={handleCloseSingleAtividade}
            iconColor={"#1D791D"}
            isAtividadeEducacao={true}
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
              title={"DETALHES SOBRE SUA EDUCAÇÃO"}
              openModal={() => dispatch(setOpenModalEducacao())}
            />

            <Stack
              direction={downMd ? "column" : "row"}
              spacing={10}
              sx={{
                mt: 7,
                mb: 2,
                mx: 2,
                position: "relative",
                zIndex: 10,
                width: "50%",
              }}
            >
              <CategoryCards
                idx={0}
                active={categoryCardSelected}
                setActive={setCategoryCardSelected}
                distance={5}
                classLabel="category-banner-educacao"
                qty={quantidadeCursos}
                categorySelected={categorySelected}
                setCategorySelected={setCategorySelected}
                title="Cursos"
                description={"Veja quais cursos você assistiu..."}
                bgcolor={"#648d64"}
                icon={
                  <CastForEducationOutlinedIcon
                    sx={{
                      position: "absolute",
                      fontSize: "1.8rem",
                      ml: 2,
                    }}
                  />
                }
              />
              <CategoryCards
                idx={1}
                active={categoryCardSelected}
                setActive={setCategoryCardSelected}
                distance={5}
                classLabel="category-banner-educacao"
                qty={quantidadeLivros}
                categorySelected={categorySelected}
                setCategorySelected={setCategorySelected}
                title="Livros"
                description={"Dê uma olhada nos livros lidos nesse mês..."}
                bgcolor={"#648d64"}
                icon={
                  <MenuBookOutlinedIcon
                    sx={{
                      position: "absolute",
                      fontSize: "1.8rem",
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
                  data={atividadesEducacao.documents}
                  customStyles={customStyles({
                    backgroundColor: "#CEF4CE",
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
                  paginationTotalRows={atividadesEducacao.total}
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
                      getAllAtividadesEducacao({
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
                      getAllAtividadesEducacao({
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

export default EducacaoDashboard;
