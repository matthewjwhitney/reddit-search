import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import SearchForm from "./SearchForm";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const LinkBehavior = React.forwardRef((props, ref) => (
  <Link ref={ref} to="/" {...props} role={undefined} />
));

export default function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Button component={LinkBehavior} sx={{ mr: { xs: 2, sm: 3 } }}>
          reddit-search
        </Button>
        <SearchForm />
      </Toolbar>
    </AppBar>
  );
}
