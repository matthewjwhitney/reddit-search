import Header from "./Header";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import Listings from "./Listings";
import { ContextProvider } from "./Context";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import ListingDetail from "./ListingDetail";

export default function App() {
  const theme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <BrowserRouter>
      <ContextProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline>
            <Header />
            <Routes>
              <Route index element={<Listings />} />
              <Route path=":id" element={<ListingDetail />} />
            </Routes>
          </CssBaseline>
        </ThemeProvider>
      </ContextProvider>
    </BrowserRouter>
  );
}
