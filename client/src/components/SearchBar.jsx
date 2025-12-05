import {
  Box,
  FormControl,
  IconButton,
  Input,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

const SearchBar = ({ setFilter, filter }) => {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <FormControl sx={{ width: "100%", mb: 2 }}>
      <InputLabel htmlFor="search-bar">Pesquisar...</InputLabel>

      <Input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        id="search-bar"
        onKeyDown={(e) => {
          if (e.key == "Enter") {
            setFilter(searchTerm);
          }
        }}
        endAdornment={
          <Box sx={{ display: "flex" }}>
            <IconButton onClick={() => setFilter(searchTerm)}>
              <SearchIcon />
            </IconButton>
            {searchTerm && (
              <IconButton
                onClick={() => {
                  setSearchTerm("");
                  setFilter("");
                }}
              >
                <CloseIcon />
              </IconButton>
            )}
          </Box>
        }
      />
    </FormControl>
  );
};

export default SearchBar;
