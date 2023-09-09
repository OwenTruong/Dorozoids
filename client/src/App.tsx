// import browser from "webextension-polyfill";
import { Link, MemoryRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Settings from "./Settings";
import { Button, ThemeProvider, createTheme } from "@mui/material";

const colorTheme = createTheme({
  palette: {
    primary: {
      light: "#30006B",
      main: "#1C0049",
      dark: "#0D0026",
      contrastText: "#ffffff",
    },
    secondary: {
      light: "#97FBDC",
      main: "#67F3BF",
      dark: "#0A8541",
      contrastText: "#000000",
    },
    background: {
      paper: "#0A8541",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={colorTheme}>
      <MemoryRouter>
        <nav>
          <ul>
            <li>
              <Button variant="contained">
                <Link to="/">Home</Link>
              </Button>
            </li>
            <li>
              <Link to="/settings">Settings</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </MemoryRouter>
    </ThemeProvider>
  );
}

export default App;
