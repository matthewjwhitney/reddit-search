import { Search } from "@mui/icons-material";
import { InputAdornment, TextField } from "@mui/material";
import { useContext } from "react";
import Context from "./Context";

export default function SearchForm() {
  const { searchString, handleChangeSearchString } = useContext(Context);

  return (
    <TextField
      size="small"
      value={searchString}
      onChange={(event) => handleChangeSearchString(event.target.value)}
      sx={{ mr: { xs: 1, sm: 2 } }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search />
          </InputAdornment>
        ),
      }}
    />
  );
}
