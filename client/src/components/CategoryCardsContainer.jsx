import { Box } from '@mui/material';

const CategoryCardsContainer = ({ minCardWidth, children }) => {
  return (
    <Box
      component="ul"
      sx={{
        display: 'grid',
        my: { xs: 2, md: 5 },
        width: '96%',
        gridTemplateColumns: `repeat(auto-fit, minmax(${minCardWidth}px, 0.8fr))`,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 4,
        height: '50%',
      }}
    >
      {children}
    </Box>
  );
};
export default CategoryCardsContainer;
