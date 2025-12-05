export const customStyles = (highlightOnHover) => ({
  table: {
    style: {
      overflow: "auto",
      height: "40vh",
    },
  },
  rows: {
    style: {
      fontSize: "16px",
      display: "flex",
      justifyContent: "space-between",
    },
    highlightOnHoverStyle: {
      ...highlightOnHover,
    },
    selectedHighlightStyle: {
      color: "rgba (157, 157, 157, 1)",
      backgroundColor: "rgba (157, 157, 157, 1)",
    },
  },

  subHeader: {
    style: {
      minHeight: "52px",
      padding: "0px",
    },
  },
  headCells: {
    style: {
      paddingLeft: "8px", // override the cell padding for head cells
      paddingRight: "8px",
      fontSize: "18px",
      fontWeight: "bold",
      borderBottom: "1px solid #DEDEDE",
    },
  },

  cells: {
    style: {
      paddingLeft: "8px", // override the cell padding for data cells
      paddingRight: "8px",
    },
  },
  pagination: {
    style: {
      position: "relative",
      bottom: 0,
      left: 0,
    },
  },
});
