import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import ContentPasteSearchOutlinedIcon from '@mui/icons-material/ContentPasteSearchOutlined';
import TextSnippetOutlinedIcon from '@mui/icons-material/TextSnippetOutlined';
import TopicOutlinedIcon from '@mui/icons-material/TopicOutlined';
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
  Zoom,
} from '@mui/material';
import React, { memo } from 'react';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Zoom ref={ref} {...props} />;
});
const SingleAtividade = memo(function SingleAtividade({
  rowData,
  openSingleAtividade,
  handleCloseSingleAtividade,
  iconColor,
  isAtividadeEducacao = false,
}) {
  return (
    <Dialog
      open={openSingleAtividade}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleCloseSingleAtividade}
      fullWidth
      maxWidth={'md'}
    >
      <DialogTitle>{rowData?.nomeAtividade}</DialogTitle>
      <DialogContent dividers>
        <Box component={'article'}>
          <Box sx={{ borderTop: '1px solid #B9BDBD' }}>
            <Box className="modal-atividade-container">
              <Typography
                variant="caption"
                component={'span'}
                className="modal-atividade-label"
              >
                Nome da Atividade
              </Typography>
              <Stack direction={'row'} justifyContent={'start'}>
                <TopicOutlinedIcon sx={{ color: iconColor, mr: 1 }} />
                <Typography>{rowData?.nomeAtividade}</Typography>
              </Stack>
            </Box>
          </Box>
          <Box sx={{ borderTop: '1px solid #B9BDBD' }}>
            <Box className="modal-atividade-container">
              <Typography
                variant="caption"
                component={'span'}
                className="modal-atividade-label"
              >
                Descrição
              </Typography>
              <Stack direction={'row'} justifyContent={'start'}>
                <TextSnippetOutlinedIcon sx={{ color: iconColor, mr: 1 }} />
                <Typography>{rowData?.descricaoAtividade}</Typography>
              </Stack>
            </Box>
          </Box>
          <Box sx={{ borderTop: '1px solid #B9BDBD' }}>
            <Box className="modal-atividade-container">
              <Typography
                variant="caption"
                component={'span'}
                className="modal-atividade-label"
              >
                Dinheiro gasto
              </Typography>
              <Stack direction={'row'} justifyContent={'start'}>
                <AttachMoneyOutlinedIcon sx={{ color: iconColor, mr: 1 }} />
                <Typography>{`${rowData?.dinheiroGasto} reais`}</Typography>
              </Stack>
            </Box>
          </Box>
          <Box sx={{ borderTop: '1px solid #B9BDBD' }}>
            <Box className="modal-atividade-container">
              <Typography
                variant="caption"
                component={'span'}
                className="modal-atividade-label"
              >
                Tempo dedicado à tarefa
              </Typography>
              <Stack direction={'row'} justifyContent={'start'}>
                <AccessTimeOutlinedIcon sx={{ color: iconColor, mr: 1 }} />
                <Typography>{`${rowData?.tempoGasto} minutos`}</Typography>
              </Stack>
            </Box>
          </Box>
          <Box sx={{ borderTop: '1px solid #B9BDBD' }}>
            <Box className="modal-atividade-container">
              <Typography
                variant="caption"
                component={'span'}
                className="modal-atividade-label"
              >
                Categoria
              </Typography>
              <Stack direction={'row'} justifyContent={'start'}>
                <ContentPasteSearchOutlinedIcon
                  sx={{ color: iconColor, mr: 1 }}
                />
                <Typography>{rowData?.categoria}</Typography>
              </Stack>
            </Box>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
});

export default SingleAtividade;
