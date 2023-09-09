import { Container, ThemeProvider, createTheme } from '@mui/material';

const colorTheme = createTheme({
  palette: {
    primary: {
      light: '#30006B',
      main: '#1C0049',
      dark: '#0D0026',
      contrastText: '#ffffff',
    },
    secondary: {
      light: '#97FBDC',
      main: '#67F3BF',
      dark: '#0A8541',
      contrastText: '#000000',
    },
    background: {
      paper: '#0A8541',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={colorTheme}>
      <Container></Container>
    </ThemeProvider>
  );
}

export default App;
