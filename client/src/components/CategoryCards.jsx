import { Paper, Stack, Typography, Box } from "@mui/material";
import React from "react";
import { useTheme } from "@emotion/react";
import PaletteIcon from "@mui/icons-material/Palette";

const CategoryCards = ({
  qty,
  title,
  description,
  bgcolor,
  icon,
  classLabel,
  setCategorySelected,
  categorySelected,
  active,
  setActive,
  idx,
}) => {
  const theme = useTheme();
  const activeStyle = active[idx]
    ? {
        cursor: "pointer",
        transform: "scale(110%)",
        ".category-banner-casa, .category-banner-lazer, .category-banner-educacao":
          {
            transform: "translate(0,0) rotate(360deg)",
            width: "100%",
            borderRadius: 0,
          },
        ".title": {
          color: "white",
        },
        ".description": {
          color: "white",
        },
        ".category-description": {
          color: "white",
        },
      }
    : {};
  const paperStyle = {
    display: "flex",
    width: "22rem",
    minHeight: "9.5rem",
    borderRadius: "0.6rem",
    position: "relative",
    overflow: "hidden",
    positions: "relative",
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      cursor: "pointer",
      transform: "scale(110%)",
      ".category-banner-casa, .category-banner-lazer, .category-banner-educacao":
        {
          transform: "translate(0,0) rotate(360deg)",
          width: "100%",
          borderRadius: 0,
        },
      ".title": {
        color: "white",
      },
      ".description": {
        color: "white",
      },
      ".category-description": {
        color: "white",
      },
    },
  };

  return (
    <Paper
      style={{ "--banner-color": bgcolor }}
      elevation={5}
      onClick={() => {
        setCategorySelected(title);

        let arrayCopy = active;
        arrayCopy.fill(false);
        arrayCopy.splice(idx, 1, !active[idx]);
        setActive(arrayCopy);
      }}
      sx={{ ...paperStyle, ...activeStyle }}
    >
      <Box className={classLabel}></Box>
      <Box>
        <Typography
          variant="h4"
          sx={{
            position: "absolute",
            zIndex: 1,
            top: "0.7rem",
            color: "white",
          }}
        >
          {icon}
        </Typography>
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          pl: 1,
          mt: 1,
        }}
      >
        <Typography
          className="title"
          variant="body2"
          sx={{
            fontSize: "1.5rem",
            width: "100%",
            textAlign: "center",
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
            fontSize: "rem",
            width: "100%",
            textAlign: "center",
            zIndex: 1,
          }}
        >
          {description}
        </Typography>
        <Typography
          className="category-description"
          variant="caption"
          color={"text.secondary"}
          sx={{
            position: "absolute",
            top: "0.5rem",
            right: "0.3rem",
          }}
        >
          {`${qty} Itens cadastrados`}
        </Typography>
      </Box>
    </Paper>
  );
};

//ARTISTICOS - TRABALHOS MANUAIS
// CULTURAIS
// ATIVIDADE FISICA
// ATIVIDADES EM GRUPO
//  OUTROS
export default CategoryCards;
