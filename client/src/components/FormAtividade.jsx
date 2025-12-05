import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import SaveIcon from "@mui/icons-material/Save";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Zoom,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
import { useState, useEffect } from "react";
import { Field, Form, Formik, FormikProvider, useFormik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import {
  resetRegisterCasa,
  setNewAtividadeCasa,
} from "../features/casa/casaSlice";
import {
  resetRegisterLazer,
  setNewAtividadeLazer,
} from "../features/lazer/lazerSlice";
import {
  resetRegisterEducacao,
  setNewAtividadeEducacao,
} from "../features/educacao/educacaoSlice";
import dayjs from "dayjs";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Zoom ref={ref} {...props} />;
});
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const FormAtividade = ({
  openModal,
  handleCloseModal,
  data,
  title,
  btnColor,
  btnHoverColor,
  categoriaItens,
  card,
  cleanForm,
}) => {
  const dispatch = useDispatch();
  const [dataWasSubmitted, setDataWasSubmitted] = useState(false);
  const ValidationSchema = Yup.object({
    nomeAtividade: Yup.string()
      .trim()
      .required("Nome da Atividade é obrigatório"),
    categoria: Yup.string().trim().required("Categoria é obrigatório"),
    tempoGasto: Yup.number()
      .required("Tempo gasto para exercer a atividade é obrigatório")
      .positive()
      .integer()
      .min(1),
    descricaoAtividade: Yup.string()
      .nullable()
      .test(
        "string-length",
        "Máximo de 1000 caracteres",
        (value) => value?.length <= 1000
      ),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      _id: data?._id || "",
      nomeAtividade: data?.nomeAtividade || "",
      tempoGasto: data?.tempoGasto || "",
      dinheiroGasto: data?.dinheiroGasto || "",
      descricaoAtividade: data?.descricaoAtividade || "",
      categoria: data?.categoria || "",
      nivelImportancia: data?.nivelImportancia || "",
      mesInsercao: "",
      anoInsercao: 1900,
    },
    //validationSchema: ValidationSchema,
    onSubmit: (values) => {
      values.mesInsercao = months[new Date().getMonth()];
      values.anoInsercao = new Date().getFullYear();
      card == "Casa"
        ? dispatch(setNewAtividadeCasa(values))
        : card == "Lazer"
        ? dispatch(setNewAtividadeLazer(values))
        : dispatch(setNewAtividadeEducacao(values));
      dispatch(handleCloseModal());

      setDataWasSubmitted(true);
      dispatch(resetRegisterEducacao());
      dispatch(resetRegisterCasa());
      dispatch(resetRegisterLazer());
      formik.resetForm();
    },
  });

  return (
    <Dialog
      open={openModal}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => {
        dispatch(handleCloseModal());
        cleanForm(formik);
      }}
      fullWidth
      maxWidth={"md"}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent dividers>
        <FormikProvider value={formik}>
          <Form noValidate onSubmit={formik.handleSubmit}>
            <Field
              {...formik.getFieldProps("nomeAtividade")}
              as={TextField}
              type="text"
              label="Nome da atividade"
              variant="standard"
              fullWidth
            />
            <FormControl fullWidth style={{ marginTop: 30, marginBottom: 10 }}>
              <InputLabel id="categoria" sx={{}}>
                Categoria
              </InputLabel>
              <Field
                {...formik.getFieldProps("categoria")}
                as={Select}
                labelId="categoria"
                id="categoria"
                label="Categoria"
                variant="standard"
              >
                {categoriaItens.map((category, idx) => (
                  <MenuItem key={idx} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Field>
            </FormControl>

            <Field
              {...formik.getFieldProps("descricaoAtividade")}
              as={TextField}
              multiline
              type="text"
              label="Descrição da atividade"
              minRows={7}
              maxRows={12}
              variant="filled"
              fullWidth
              style={{ marginTop: 30, marginBottom: 30 }}
            />

            {card == "Educação" && (
              <FormControl
                fullWidth
                style={{ marginTop: 30, marginBottom: 10 }}
              >
                <InputLabel id="categoria">Nível de prioridade</InputLabel>
                <Field
                  {...formik.getFieldProps("nivelImportancia")}
                  as={Select}
                  labelId="categoria"
                  id="categoria"
                  label="Categoria"
                  variant="standard"
                >
                  <MenuItem value="Baixa">Baixa</MenuItem>
                  <MenuItem value="Média">Média</MenuItem>
                  <MenuItem value="Alta">Alta</MenuItem>
                </Field>
              </FormControl>
            )}

            <Field
              {...formik.getFieldProps("dinheiroGasto")}
              as={TextField}
              type="number"
              startAdorments={
                <InputAdornment position="start">$</InputAdornment>
              }
              InputProps={{
                inputProps: { min: 0 },
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
              label="Dinheiro gasto nesta tarefa"
              variant="standard"
              fullWidth
              helperText="* Em Reais"
              style={{ marginTop: 30, marginBottom: 10 }}
            />
            <Field
              {...formik.getFieldProps("tempoGasto")}
              as={TextField}
              type="number"
              InputProps={{ inputProps: { min: 0 } }}
              label="Tempo a ser dedicado a esta tarefa"
              variant="standard"
              fullWidth
              helperText="* Em minutos"
              style={{ marginTop: 30, marginBottom: 30 }}
            />

            <DialogActions
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mt: 5,
                position: "relative",
                zIndex: 100,
              }}
            >
              <IconButton
                type="submit"
                sx={{
                  backgroundColor: btnColor,
                  borderRadius: 0,
                  color: "white",
                  width: "45%",
                  transition: "all 0.4s ease",
                  "&:hover": { backgroundColor: btnHoverColor },
                  gap: 2,
                }}
              >
                <Typography variant="button">Salvar</Typography>
                <SaveIcon />
              </IconButton>

              <IconButton
                onClick={() => {
                  dispatch(handleCloseModal());
                  cleanForm(formik);
                }}
                sx={{
                  backgroundColor: btnColor,
                  borderRadius: 0,
                  color: "white",
                  width: "45%",
                  transition: "all 0.4s ease",
                  "&:hover": { backgroundColor: btnHoverColor },
                  gap: 2,
                }}
              >
                <Typography variant="button">Cancelar</Typography>
                <KeyboardReturnIcon />
              </IconButton>
            </DialogActions>
          </Form>
        </FormikProvider>
      </DialogContent>
    </Dialog>
  );
};

export default FormAtividade;
