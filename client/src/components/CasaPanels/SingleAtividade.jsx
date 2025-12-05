import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import SaveIcon from "@mui/icons-material/Save";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import TopicOutlinedIcon from "@mui/icons-material/TopicOutlined";
import TextSnippetOutlinedIcon from "@mui/icons-material/TextSnippetOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import ContentPasteSearchOutlinedIcon from "@mui/icons-material/ContentPasteSearchOutlined";
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
  Box,
  Divider,
  Stack,
} from "@mui/material";
import { Field, Form, FormikProvider, useFormik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Zoom ref={ref} {...props} />;
});
const SingleAtividade = ({
  rowData,
  openSingleAtividade,
  handleCloseSingleAtividade,
  iconColor,
  isAtividadeEducacao = false,
}) => {
  return (
    <Dialog
      open={openSingleAtividade}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleCloseSingleAtividade}
      fullWidth
      maxWidth={"md"}
    >
      <DialogTitle>{rowData.nomeAtividade}</DialogTitle>
      <DialogContent dividers>
        <Box sx={{ borderTop: "1px solid #B9BDBD" }}>
          <Box className="modal-atividade-container">
            <Typography
              variant="caption"
              component={"span"}
              className="modal-atividade-label"
            >
              Nome da Atividade
            </Typography>
            <Stack direction={"row"} justifyContent={"start"}>
              <TopicOutlinedIcon sx={{ color: iconColor, mr: 1 }} />
              <Typography>{rowData?.nomeAtividade}</Typography>
            </Stack>
          </Box>
        </Box>
        <Box sx={{ borderTop: "1px solid #B9BDBD" }}>
          <Box className="modal-atividade-container">
            <Typography
              variant="caption"
              component={"span"}
              className="modal-atividade-label"
            >
              Descrição
            </Typography>
            <Stack direction={"row"} justifyContent={"start"}>
              <TextSnippetOutlinedIcon sx={{ color: iconColor, mr: 1 }} />
              <Typography>{rowData?.descricaoAtividade}</Typography>
            </Stack>
          </Box>
        </Box>
        <Box sx={{ borderTop: "1px solid #B9BDBD" }}>
          <Box className="modal-atividade-container">
            <Typography
              variant="caption"
              component={"span"}
              className="modal-atividade-label"
            >
              Dinheiro gasto
            </Typography>
            <Stack direction={"row"} justifyContent={"start"}>
              <AttachMoneyOutlinedIcon sx={{ color: iconColor, mr: 1 }} />
              <Typography>{`${rowData?.dinheiroGasto} reais`}</Typography>
            </Stack>
          </Box>
        </Box>
        <Box sx={{ borderTop: "1px solid #B9BDBD" }}>
          <Box className="modal-atividade-container">
            <Typography
              variant="caption"
              component={"span"}
              className="modal-atividade-label"
            >
              Tempo dedicado à tarefa
            </Typography>
            <Stack direction={"row"} justifyContent={"start"}>
              <AccessTimeOutlinedIcon sx={{ color: iconColor, mr: 1 }} />
              <Typography>{`${rowData?.tempoGasto} minutos`}</Typography>
            </Stack>
          </Box>
        </Box>
        <Box sx={{ borderTop: "1px solid #B9BDBD" }}>
          <Box className="modal-atividade-container">
            <Typography
              variant="caption"
              component={"span"}
              className="modal-atividade-label"
            >
              Categoria
            </Typography>
            <Stack direction={"row"} justifyContent={"start"}>
              <ContentPasteSearchOutlinedIcon
                sx={{ color: iconColor, mr: 1 }}
              />
              <Typography>{rowData?.categoria}</Typography>
            </Stack>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default SingleAtividade;
