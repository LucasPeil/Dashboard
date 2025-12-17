import { Paper, Typography, Box } from '@mui/material';
import React, { useMemo } from 'react';
import { useTheme } from '@emotion/react';

// Envolvemos em React.memo para evitar re-renders se as props não mudarem
const CategoryCards = React.memo(
  ({
    idx,
    qty,
    title,
    description,
    bgcolor,
    Icon,
    classLabel,
    isSelected,
    onSelect, // Recebe a função já pronta
  }) => {
    const theme = useTheme();

    // Memoizamos os estilos para evitar recálculo desnecessário
    const styles = useMemo(() => {
      const activeStyle = isSelected
        ? {
            cursor: 'pointer',
            transform: 'scale(110%)',
            '.category-banner-casa, .category-banner-lazer, .category-banner-educacao':
              {
                transform: 'translate(0,0) rotate(360deg)',
                width: '100%',
                borderRadius: 0,
              },
            '.title': { color: 'white' },
            '.description': { color: 'white' },
            '.category-description': { color: 'white' },
          }
        : {};

      const baseStyle = {
        display: 'flex',
        width: '22rem',
        minHeight: '9.5rem',
        borderRadius: '0.6rem',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          cursor: 'pointer',
          transform: 'scale(110%)',
          '.category-banner-casa, .category-banner-lazer, .category-banner-educacao':
            {
              transform: 'translate(0,0) rotate(360deg)',
              width: '100%',
              borderRadius: 0,
            },
          '.title': { color: 'white' },
          '.description': { color: 'white' },
          '.category-description': { color: 'white' },
        },
      };

      return { ...baseStyle, ...activeStyle };
    }, [isSelected]); // Recalcula apenas se o status de seleção mudar
    const handleClick = () => {
      onSelect(idx, title);
    };
    console.log(`Renderizou Card: ${title}`); // Para teste de performance

    return (
      <Paper
        style={{ '--banner-color': bgcolor }}
        elevation={5}
        onClick={handleClick} // Executa a função passada pelo pai
        sx={styles}
      >
        <Box className={classLabel}></Box>
        <Box>
          <Typography
            variant="h4"
            sx={{
              position: 'absolute',
              zIndex: 1,
              top: '0.7rem',
              color: 'white',
            }}
          >
            <Icon sx={{ position: 'absolute', fontSize: '1.8rem', ml: 2 }} />
          </Typography>
        </Box>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            pl: 1,
            mt: 1,
          }}
        >
          <Typography
            className="title"
            variant="body2"
            sx={{
              fontSize: '1.5rem',
              width: '100%',
              textAlign: 'center',
              mb: 1,
              zIndex: 1,
            }}
          >
            {title}
          </Typography>
          <Typography
            className="description"
            variant="caption"
            sx={{
              fontSize: 'rem',
              width: '100%',
              textAlign: 'center',
              zIndex: 1,
            }}
          >
            {description}
          </Typography>
          <Typography
            className="category-description"
            variant="caption"
            color={'text.secondary'}
            sx={{
              position: 'absolute',
              top: '0.5rem',
              right: '0.3rem',
            }}
          >
            {`${qty} Itens cadastrados`}
          </Typography>
        </Box>
      </Paper>
    );
  }
);

export default CategoryCards;
