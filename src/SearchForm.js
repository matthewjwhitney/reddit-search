import { Search } from "@mui/icons-material";
import { InputAdornment, TextField } from "@mui/material";
import { useContext } from "react";
import Context from "./Context";

export default function SearchForm() {
  const {
    searchString,
    handleChangeSearchString,
    submitSearchRequest
  } = useContext(Context);

  return (
    <form onSubmit={submitSearchRequest}>
      <TextField
        size="small"
        value={searchString}
        onChange={handleChangeSearchString}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          )
        }}
      />
      <button style={{ display: "none" }} type="submit">
        Search
      </button>
    </form>
  );
}
