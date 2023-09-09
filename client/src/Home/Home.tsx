import {
  Box,
  Button,
  ButtonGroup,
  Typography,
  Container,
  IconButton,
  useTheme,
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';

// import browser from 'webextension-polyfill';
import ProgressBar from '../ProgressBar/ProgressBar';
import { useContext, useEffect } from 'react';
import { dataContext } from '../dataContext';

function HomeNav() {
  return (
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
  );
}

function Clock() {
  const { timeLeft, seconds, activeSession, setRemainingTime, updateSeconds } =
    useContext(dataContext);
  return (
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
  );
}

function SessionButtonGroup() {
  const { focusMode, activeSession, setFocusMode, setRemainingTime, seconds } =
    useContext(dataContext);

  const breakPressed = () => {
    if (focusMode && !activeSession) {
      setFocusMode(false);
      setRemainingTime(seconds[1]);
    }
  };

  const focusPressed = () => {
    if (!focusMode && !activeSession) {
      setFocusMode(true);
      setRemainingTime(seconds[0]);
    }
  };
  return (
    <ButtonGroup>
      <Button variant="contained" onClick={breakPressed}>
        Break
      </Button>
      <Button variant="contained" onClick={focusPressed}>
        Focus
      </Button>
    </ButtonGroup>
  );
}

function StartButton() {
  const { setActiveSession } = useContext(dataContext);

  return (
    <Button
      variant="contained"
      onClick={() => {
        setActiveSession(true);
      }}
    >
      Start
    </Button>
  );
}

function StopButtonGroup() {
  const { setActiveSession, setRemainingTime, focusMode, seconds } =
    useContext(dataContext);

  const pausePressed = () => {
    setActiveSession(false);
  };

  const resetPressed = () => {
    setActiveSession(false);
    setRemainingTime(focusMode ? seconds[0] : seconds[1]);
  };
  return (
    <ButtonGroup>
      <Button variant="contained" onClick={pausePressed}>
        Pause
      </Button>
      <Button variant="contained" onClick={resetPressed}>
        Reset
      </Button>
    </ButtonGroup>
  );
}

export default function Home() {
  const theme = useTheme();
  const {
    activeSession,
    setRemainingTime,
    remainingTime,
    focusMode,
    setFocusMode,
    seconds,
  } = useContext(dataContext);

  useEffect(() => {
    if (activeSession !== true) return;
    const timer = setInterval(() => {
      // So in this code, we check for if we are on focus or break. If break, we stop everything including the browser tabs and automatically start the timer for focus.
      setRemainingTime(remainingTime - 1);
      if (!focusMode && remainingTime < 0) {
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
    <Container
      sx={{
        width: '300px',
        height: '400px',
        backgroundColor: theme.palette.primary.light,
      }}
    >
      <HomeNav />
      <Clock />
      <Box>
        <SessionButtonGroup />
        {!activeSession ? <StartButton /> : <StopButtonGroup />}
      </Box>
    </Container>
  );
}
