import { useContext } from "react";
import Context from "./Context";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

export default function CategorySelect() {
  const { category, categories, handleChangeCategory } = useContext(Context);
  return (
    <Select
      value={category}
      onChange={(event) => handleChangeCategory(event.target.value)}
    >
      {categories.map((c) => (
        <MenuItem value={c}>{c}</MenuItem>
      ))}
    </Select>
  );
}
