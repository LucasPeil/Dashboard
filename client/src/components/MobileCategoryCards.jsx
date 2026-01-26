import { Paper, Typography, Box } from '@mui/material';
import LocalLaundryServiceOutlinedIcon from '@mui/icons-material/LocalLaundryServiceOutlined';
import RamenDiningOutlinedIcon from '@mui/icons-material/RamenDiningOutlined';
import ShoppingBasketOutlinedIcon from '@mui/icons-material/ShoppingBasketOutlined';
const MobileCategoryCards = ({
  idx,
  qty,
  title,
  description,
  color,
  Icon,
  classLabel,
  isSelected,
  onSelect,
}) => {
  return (
    <Paper
      elevation={5}
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: color,
      }}
    >
      <Icon
        aria-hidden
        sx={{
          fontSize: '2.3em',
          color: 'white',
          flexGrow: 1,
        }}
      />
      <Box
        sx={{
          width: '80%',
          backgroundColor: 'white',
          px: 2,
          boxSizing: 'border-box',
        }}
      >
        <Typography
          variant="body1"
          sx={{
            fontSize: '1.2em',
            textAlign: 'center',
            borderBottom: '1px solid #bdbdbdff',
            zIndex: 1,
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            textAlign: 'center',
            zIndex: 1,
          }}
        >
          {`${qty} Atividades`}
        </Typography>
      </Box>
    </Paper>
  );
};

export default MobileCategoryCards;
