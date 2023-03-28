import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import SearchForm from "./SearchForm";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import CategorySelect from "./CategorySelect";

const LinkBehavior = React.forwardRef((props, ref) => (
  <Link ref={ref} to="/" {...props} role={undefined} />
));

export default function Header() {
  return (
    <AppBar position="static">
      <Toolbar disableGutters>
        <Button
          component={LinkBehavior}
          sx={{ mx: { xs: 1, sm: 2 }, textAlign: "center" }}
        >
          reddit search
        </Button>
        <SearchForm />
        <CategorySelect />
      </Toolbar>
    </AppBar>
  );
}
