import { useTheme } from "@emotion/react";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import LocalLaundryServiceOutlinedIcon from "@mui/icons-material/LocalLaundryServiceOutlined";
import RamenDiningOutlinedIcon from "@mui/icons-material/RamenDiningOutlined";
import ShoppingBasketOutlinedIcon from "@mui/icons-material/ShoppingBasketOutlined";
import {
  Box,
  Grid,
  IconButton,
  Paper,
  Stack,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import MotionDiv from "../../MotionDiv";
import {
  closeModalCasa,
  getAllAtividadesCasa,
  getComprasQty,
  getLimpezaQty,
  getRefeicoesQty,
  removeSingleAtividade,
  resetRegisterCasa,
  resetRemoveCasa,
  setOpenModalCasa,
} from "../../features/casa/casaSlice";
import { customStyles } from "../../styles/stylesConst";
import CategoryCards from "../CategoryCards";
import DashboardsHeaders from "../DashboardsHeaders";
import FormAtividade from "../FormAtividade";
import ProgressComponent from "../ProgressComponent";
import SearchBar from "../SearchBar";
import SingleAtividade from "./SingleAtividade";
import { toast } from "react-toastify";

const CasaDashboard = ({ open, setOpen }) => {
  const [openSingleAtividade, setOpenSingleAtividade] = useState(false);
  const handleOpenSingleAtividade = () => setOpenSingleAtividade(true);
  const handleCloseSingleAtividade = () => setOpenSingleAtividade(false);
  const [selectedRow, setSelectedRow] = useState();
  const [categorySelected, setCategorySelected] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sortDirection, setSortDirection] = useState(1);
  const [prop, setProp] = useState("_id");
  const [filter, setFilter] = useState("");
  const theme = useTheme();
  const downLg = useMediaQuery(theme.breakpoints.down("lg"));
  const [categoryCardSelected, setCategoryCardSelected] = useState([
    false,
    false,
    false,
  ]);
  const dispatch = useDispatch();
  const {
    atividadesCasa,
    openModalCasa,
    isLoading,
    register,
    remove,
    quantidadeLimpeza,
    quantidadeCompras,
    quantidadeRefeicoes,
  } = useSelector((state) => state.atividadesCasa);

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
    dispatch(getComprasQty());
    dispatch(getLimpezaQty());
    dispatch(getRefeicoesQty());
    return () => {
      dispatch(resetRemoveCasa());
      dispatch(resetRegisterCasa());
    };
  }, [register, remove]);

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

              dispatch(setOpenModalCasa());
            }}
          >
            <EditTwoToneIcon color="success" />
          </IconButton>
          <IconButton
            onClick={() => {
              dispatch(removeSingleAtividade(row._id));
            }}
          >
            <DeleteTwoToneIcon color="error" />
          </IconButton>
        </Box>
      ),
    },
  ];

  useEffect(() => {
    dispatch(
      getAllAtividadesCasa({
        page: 1,
        limit: limit,
        prop: prop,
        sortDirection: sortDirection,
        filter: filter,
        categorySelected: categorySelected,
      })
    );
  }, [remove, register, filter, categorySelected]);
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
        {/* MODAL EDIÇÃO */}
        <FormAtividade
          openModal={openModalCasa}
          handleCloseModal={closeModalCasa}
          title={"Nova Atividade Doméstica"}
          btnColor="#0c264e"
          btnHoverColor="#031426"
          categoriaItens={["Compras", "Limpeza", "Refeições"]}
          card={"Casa"}
          cleanForm={cleanForm}
          data={selectedRow}
        />

        {/* MODAL SINGLE ATIVIDADE */}
        {openSingleAtividade && (
          <SingleAtividade
            rowData={selectedRow}
            openSingleAtividade={openSingleAtividade}
            handleCloseSingleAtividade={handleCloseSingleAtividade}
            iconColor={"#0a1e73"}
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
              title={"DETALHES SOBRE AS ATIVIDADES DOMÉSTICAS"}
              openModal={() => dispatch(setOpenModalCasa())}
            />
            <Stack
              direction={downLg ? "column" : "row"}
              spacing={10}
              sx={{
                mt: 7,
                mb: 2,
                mx: 2,
                position: "relative",
                zIndex: 10,
                width: "70%",
              }}
            >
              <CategoryCards
                idx={0}
                active={categoryCardSelected}
                setActive={setCategoryCardSelected}
                distance={5}
                classLabel="category-banner-casa"
                qty={quantidadeCompras}
                categorySelected={categorySelected}
                setCategorySelected={setCategorySelected}
                title="Compras"
                description={
                  "Veja as atividades relacionadas às compras do mês..."
                }
                bgcolor={"#0c264e"}
                icon={
                  <ShoppingBasketOutlinedIcon
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
                distance={15}
                classLabel="category-banner-casa"
                qty={quantidadeLimpeza}
                categorySelected={categorySelected}
                setCategorySelected={setCategorySelected}
                title="Limpeza"
                description={
                  "Veja as atividades relacionadas a limpeza do seu lar..."
                }
                bgcolor={"#0c264e"}
                icon={
                  <LocalLaundryServiceOutlinedIcon
                    sx={{
                      position: "absolute",
                      fontSize: "1.8rem",
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
                classLabel="category-banner-casa"
                qty={quantidadeRefeicoes}
                categorySelected={categorySelected}
                setCategorySelected={setCategorySelected}
                title="Refeições"
                description={
                  "Veja as atividades relacionadas a sua alimentação..."
                }
                bgcolor={"#0c264e"}
                icon={
                  <RamenDiningOutlinedIcon
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
                  data={atividadesCasa.documents}
                  customStyles={customStyles({
                    backgroundColor: "#D6E8FB",
                  })}
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
                  highlightOnHover
                  progressPending={isLoading}
                  progressComponent={<ProgressComponent limit={limit} />}
                  paginationTotalRows={atividadesCasa.total}
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
                      getAllAtividadesCasa({
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
                      getAllAtividadesCasa({
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

export default CasaDashboard;
