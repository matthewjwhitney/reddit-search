import Header from "./Header";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import Listings from "./Listings";
import { ContextProvider } from "./Context";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import ListingDetail from "./ListingDetail";

export default function App() {
  const theme = createTheme({
    palette: {
      mode: "dark"
    }
  });

  return (
    <ContextProvider>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <CssBaseline>
            <Header />
            <Routes>
              <Route index element={<Listings />} />
              <Route path=":id" element={<ListingDetail />} />
            </Routes>
          </CssBaseline>
        </BrowserRouter>
      </ThemeProvider>
    </ContextProvider>
  );
}
