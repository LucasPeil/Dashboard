import { Box } from '@mui/material';

const CategoryCardsContainer = ({ minCardWidth, children }) => {
  return (
    <Box
      sx={{
        display: 'grid',
        my: 5,
        width: '96%',
        gridTemplateColumns: `repeat(auto-fit, minmax(${minCardWidth}px, 0.8fr))`,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 4,
      }}
    >
      {children}
    </Box>
  );
};
export default CategoryCardsContainer;
