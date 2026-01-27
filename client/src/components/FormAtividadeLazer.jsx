import { useEffect, useState, memo } from 'react';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import SaveIcon from '@mui/icons-material/Save';
import { useParams, useNavigate } from 'react-router-dom';
import {
  getSingleAtividadeLazer,
  resetRegisterLazer,
  setNewAtividadeLazer,
} from '../features/lazer/lazerSlice';
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
  FormHelperText,
} from '@mui/material';
import { Field, Form, FormikProvider, useFormik } from 'formik';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Zoom ref={ref} {...props} />;
});
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const FormAtividadeLazer = memo(function FormAtividadeLazer() {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const { id } = params;
  const [openDialog, setOpenDialog] = useState(true);
  const theme = useTheme();
  const upLg = useMediaQuery(theme.breakpoints.up('lg'));
  // Specific Constants for Lazer
  const btnColor = '#f4b26a';
  const btnHoverColor = '#E39F54';
  const title = 'Nova Atividade de Lazer';
  const categoriaItens = ['Jogos', 'Cultura', 'Em grupo', 'Outros'];

  const atividadeLazer = useSelector(
    (state) => state.atividadesLazer.atividadeLazer,
  );

  // Derive data logic
  const data = id ? atividadeLazer : null;

  useEffect(() => {
    if (id) {
      dispatch(getSingleAtividadeLazer(id));
    }
  }, [id, dispatch]);

  const ValidationSchema = Yup.object({
    nomeAtividade: Yup.string()
      .trim()
      .required('Nome da Atividade é obrigatório'),
    categoria: Yup.string().trim().required('Categoria é obrigatório'),
    dinheiroGasto: Yup.number()
      .required('Dinheiro gasto para exercer a atividade é obrigatório')
      .positive()
      .integer()
      .min(1),
    tempoGasto: Yup.number()
      .required('Tempo gasto para exercer a atividade é obrigatório')
      .positive()
      .integer()
      .min(1),
    descricaoAtividade: Yup.string()
      .nullable()
      .test(
        'string-length',
        'Máximo de 1000 caracteres',
        (value) => value?.length <= 1000,
      ),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      _id: data?._id || '',
      nomeAtividade: data?.nomeAtividade || '',
      tempoGasto: data?.tempoGasto || '',
      dinheiroGasto: data?.dinheiroGasto || '',
      descricaoAtividade: data?.descricaoAtividade || '',
      categoria: data?.categoria || '',
      nivelImportancia: data?.nivelImportancia || '',
      mesInsercao: '',
      anoInsercao: 1900,
      userId: data?.userId || '',
    },
    validationSchema: ValidationSchema,
    onSubmit: (values) => {
      values.mesInsercao = months[new Date().getMonth()];
      values.anoInsercao = new Date().getFullYear();
      dispatch(setNewAtividadeLazer(values));
      navigate('/lazer');
      formik.resetForm();
    },
  });

  const handleClose = () => {
    setOpenDialog(false);
    setTimeout(() => {
      navigate('/lazer');
    }, 200);
    formik.resetForm();
  };

  return (
    <Dialog
      open={openDialog}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      fullWidth
      maxWidth={upLg ? 'md' : 'sm'}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent dividers>
        <FormikProvider value={formik}>
          <Form noValidate onSubmit={formik.handleSubmit}>
            <Field
              {...formik.getFieldProps('nomeAtividade')}
              as={TextField}
              type="text"
              label="Nome da atividade"
              variant="standard"
              fullWidth
              error={Boolean(
                formik.touched.nomeAtividade && formik.errors.nomeAtividade,
              )}
              helperText={
                formik.touched.nomeAtividade && formik.errors.nomeAtividade
              }
            />
            <FormControl fullWidth style={{ marginTop: 30, marginBottom: 10 }}>
              <InputLabel id="categoria" sx={{}}>
                Categoria
              </InputLabel>
              <Field
                {...formik.getFieldProps('categoria')}
                as={Select}
                labelId="categoria"
                id="categoria"
                label="Categoria"
                variant="standard"
                error={Boolean(
                  formik.touched.categoria && formik.errors.categoria,
                )}
              >
                {categoriaItens.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Field>
              <FormHelperText sx={{ color: '#FF0000' }}>
                {formik.touched.categoria && formik.errors.categoria}
              </FormHelperText>
            </FormControl>

            <Field
              {...formik.getFieldProps('descricaoAtividade')}
              as={TextField}
              multiline
              type="text"
              label="Descrição da atividade"
              minRows={7}
              maxRows={12}
              variant="filled"
              fullWidth
              style={{ marginTop: 30, marginBottom: 30 }}
              error={Boolean(
                formik.touched.descricaoAtividade &&
                formik.errors.descricaoAtividade,
              )}
              helperText={
                formik.touched.descricaoAtividade &&
                formik.errors.descricaoAtividade
              }
            />

            <Field
              {...formik.getFieldProps('dinheiroGasto')}
              as={TextField}
              type="number"
              InputProps={{
                inputProps: { min: 0 },
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
              label="Dinheiro gasto nesta tarefa"
              variant="standard"
              fullWidth
              style={{ marginTop: 30, marginBottom: 10 }}
              error={Boolean(
                formik.touched.dinheiroGasto && formik.errors.dinheiroGasto,
              )}
              helperText={
                formik.touched.dinheiroGasto && formik.errors.dinheiroGasto
                  ? formik.errors.dinheiroGasto
                  : '* Em Reais'
              }
            />
            <Field
              {...formik.getFieldProps('tempoGasto')}
              as={TextField}
              type="number"
              InputProps={{ inputProps: { min: 0 } }}
              label="Tempo a ser dedicado a esta tarefa"
              variant="standard"
              fullWidth
              style={{ marginTop: 30, marginBottom: 30 }}
              error={Boolean(
                formik.touched.tempoGasto && formik.errors.tempoGasto,
              )}
              helperText={
                formik.touched.tempoGasto && formik.errors.tempoGasto
                  ? formik.errors.tempoGasto
                  : '* Em minutos'
              }
            />

            <DialogActions
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                mt: 5,
                position: 'relative',
                zIndex: 100,
              }}
            >
              <IconButton
                type="submit"
                sx={{
                  backgroundColor: btnColor,
                  borderRadius: 0,
                  color: 'white',
                  width: '45%',
                  transition: 'all 0.4s ease',
                  '&:hover': { backgroundColor: btnHoverColor },
                  gap: 2,
                }}
              >
                <Typography variant="button">Salvar</Typography>
                <SaveIcon />
              </IconButton>

              <IconButton
                onClick={handleClose}
                sx={{
                  backgroundColor: btnColor,
                  borderRadius: 0,
                  color: 'white',
                  width: '45%',
                  transition: 'all 0.4s ease',
                  '&:hover': { backgroundColor: btnHoverColor },
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
});

export default FormAtividadeLazer;
