import { Button, Container } from "@mui/material";
import { useNavigate } from "react-router";

export default function Settings() {
  const navigate = useNavigate();
  return (
    <Container>
      <Button variant="contained">Settings Page</Button>
      <Button variant="contained" onClick={() => navigate("/")}>
        Go Back Home!
      </Button>
    </Container>
  );
}
