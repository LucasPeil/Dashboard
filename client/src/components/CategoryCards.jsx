import { Paper, Typography, Box, useMediaQuery } from '@mui/material';
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
    onSelect,
  }) => {
    const theme = useTheme();
    const upMd = useMediaQuery(theme.breakpoints.up('md'));
    const styles = useMemo(() => {
      const activeStyle = isSelected
        ? {
            width: '100%',
            cursor: 'pointer',
            transform: 'scale(104%)',
            '.category-banner-casa, .category-banner-lazer, .category-banner-educacao':
              {
                transform: 'translate(0,0) rotate(360deg)',
                width: '100%',
                borderRadius: 0,
              },
            '.title': { color: 'white' },
            '.description': { color: 'white' },
            '.category-qty': { color: 'white' },
          }
        : {};
      const hoverStyle = {
        transform: 'scale(104%)',
        '.category-banner-casa, .category-banner-lazer, .category-banner-educacao':
          {
            transform: 'translate(0,0) rotate(360deg)',
            width: '100%',
            borderRadius: 0,
          },
        '.title': { color: 'white' },
        '.description': { color: 'white' },
        '.category-qty': { color: 'white' },
      };
      const baseStyle = {
        display: 'flex',
        width: '100%',
        minHeight: '8rem',
        borderRadius: '0.6rem',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s ease-in-out',
        cursor: 'pointer',
        '&:hover': upMd ? hoverStyle : {},
      };

      return { ...baseStyle, ...activeStyle };
    }, [isSelected]);
    const handleClick = () => {
      onSelect(idx, title);
    };

    return (
      <Paper
        component={'button'}
        style={{ '--banner-color': bgcolor }}
        elevation={5}
        onClick={handleClick}
        sx={styles}
      >
        <Typography className={classLabel}></Typography>

        <Icon
          aria-hidden
          sx={{
            position: 'absolute',
            fontSize: '3.1em',
            ml: 2,
            color: 'white',
            top: '0.3rem',
          }}
        />

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
              mb: { xs: 2, lg: 3 },
              zIndex: 1,
            }}
          >
            {title}
          </Typography>
          <Typography
            className="description"
            variant="caption"
            sx={{
              width: '100%',
              textAlign: 'center',
              zIndex: 1,
            }}
          >
            {description}
          </Typography>
          <Typography
            className="category-qty"
            variant="caption"
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
  },
);

export default CategoryCards;
