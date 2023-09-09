import { Container, Button } from "@mui/material";
// import browser from "webextension-polyfill";
import Home from "./Home";
import Settings from "./Settings";

function App() {
  const openTab = () => {};

  return (
    <Container>
      <Button variant="contained" onClick={openTab}>
        Open New Tab
      </Button>
    </Container>
  );
}

export default App;
