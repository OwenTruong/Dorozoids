import { Button, Container } from '@mui/material';
import { useNavigate } from 'react-router';

export default function Settings() {
  const navigate = useNavigate();
  return (
    <Container
      sx={{
        width: '375px',
        height: '560px',
        backgroundColor: '#D4F2E0',
        backgroundImage: `linear-gradient(135deg, #D4F2E0 0%, #7BC599 100%)`,
        padding: '5px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Button variant="contained" onClick={() => navigate('/')}>
        Go Back Home!
      </Button>
    </Container>
  );
}
