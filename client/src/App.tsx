import { Container, Button } from "@mui/material";
import browser from "webextension-polyfill";

function App() {
  const openTab = () => {
    browser.tabs.create({});
  };

  return (
    <Container>
      <Button variant="contained" onClick={openTab}>
        Open New Tab
      </Button>
    </Container>
  );
}

export default App;
