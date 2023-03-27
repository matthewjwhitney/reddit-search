import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import SearchForm from "./SearchForm";

export default function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ mr: 3 }}>
          reddit-search
        </Typography>
        <SearchForm />
      </Toolbar>
    </AppBar>
  );
}
