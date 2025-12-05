import React from "react";
import { Box, Skeleton } from "@mui/material";
const ProgressComponent = ({ limit }) => {
  return (
    <Box
      component={"div"}
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      {[...Array(limit)].map((_, idx) => (
        <Box
          key={idx}
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Skeleton width="100%" height="50px" />
        </Box>
      ))}
    </Box>
  );
};

export default ProgressComponent;
