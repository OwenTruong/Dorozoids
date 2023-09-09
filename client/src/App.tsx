import {
  Box,
  Button,
  ButtonGroup,
  Typography,
  Container,
  ThemeProvider,
  createTheme,
  IconButton,
  useTheme,
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';

// import browser from 'webextension-polyfill';
import ProgressBar from './ProgressBar';
import { useEffect, useState } from 'react';

const colorTheme = createTheme({
  palette: {
    primary: {
      light: '#30006B',
      main: '#1C0049',
      dark: '#0D0026',
      contrastText: '#ffffff',
    },
  },
});

// States: total time, focus state, session on/off

function App() {
  const theme = useTheme();
  const [seconds, setSeconds] = useState([25 * 60, 5 * 60]);
  const [activeSession, setActiveSession] = useState(false);
  const [focusMode, setFocusMode] = useState(true);
  const [remainingTime, setRemainingTime] = useState(
    focusMode ? seconds[0] : seconds[1]
  ); // from my theory, when u create a state from another state, it only resets the downstream state if the upstream state changes in any way.

  const updateSeconds = (newTime: number) =>
    setSeconds(
      seconds.map((time, i) => (focusMode !== Boolean(i) ? newTime : time))
    );

  const timeLeft: [number, number] = [
    Math.floor(remainingTime / 60),
    remainingTime % 60,
  ];

  useEffect(() => {
    if (activeSession !== true) return;
    const timer = setInterval(() => {
      // So in this code, we check for if we are on focus or break. If break, we stop everything including the browser tabs and automatically start the timer for focus.
      setRemainingTime(remainingTime - 1);
      if (!focusMode && remainingTime < 0) {
        // switch to focus
        // reset remaining time to focus' total time
        // session should still be active of course
        setFocusMode(true);
        setRemainingTime(seconds[0]);
        // TODO: Implement website blocking feature
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  });
  return (
    <ThemeProvider theme={colorTheme}>
      <Container
        sx={{
          width: '300px',
          height: '400px',
          backgroundColor: theme.palette.primary.light,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography>Pomodoro</Typography>
          <IconButton>
            <SettingsIcon />
          </IconButton>
        </Box>
        <Box>
          <ProgressBar
            value={40}
            timeLeft={timeLeft}
            seconds={seconds}
            activeSession={activeSession}
            setRemainingTime={setRemainingTime}
            updateTimer={updateSeconds}
          />
        </Box>
        <Box>
          <ButtonGroup>
            <Button
              variant="contained"
              onClick={() => {
                if (focusMode && !activeSession) {
                  setFocusMode(false);
                  setRemainingTime(seconds[1]);
                }
              }}
            >
              Break
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                if (!focusMode && !activeSession) {
                  setFocusMode(true);
                  setRemainingTime(seconds[0]);
                }
              }}
            >
              Focus
            </Button>
          </ButtonGroup>
          {!activeSession ? (
            <Button
              variant="contained"
              onClick={() => {
                setActiveSession(true);
              }}
            >
              Start
            </Button>
          ) : (
            <ButtonGroup>
              <Button
                variant="contained"
                onClick={() => {
                  setActiveSession(false);
                }}
              >
                Pause
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  setActiveSession(false);
                  setRemainingTime(focusMode ? seconds[0] : seconds[1]);
                }}
              >
                Reset
              </Button>
            </ButtonGroup>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
