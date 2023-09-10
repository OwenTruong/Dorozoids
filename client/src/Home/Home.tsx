import {
  Box,
  Button,
  Typography,
  Container,
  IconButton,
  styled,
  TextField,
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';

// import browser from 'webextension-polyfill';
import ProgressBar from '../ProgressBar/ProgressBar';
import { useContext, useEffect } from 'react';
import { dataContext } from '../dataContext';

const StyledSettings = styled(SettingsIcon)(
  () => `
transition: all 200ms;
font-size: 1.5rem;
&:hover {
  transform-origin: center;
  transform: rotate(30deg);
}
`
);

const BUTTON_STYLE = {
  width: '100px',
  height: '30px',
  margin: '10px',
};

const START_BUTTON_STYLE = {
  width: `${100 * 2 + 20}px`,
  height: '30px',
  margin: '10px',
};

function HomeNav() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingLeft: '15px',
      }}
    >
      <Typography variant="h5" fontWeight={'400'}>
        Pomodoro
      </Typography>
      <IconButton>
        <StyledSettings />
      </IconButton>
    </Box>
  );
}

function Clock() {
  const { timeLeft, seconds, remainingTime, focusMode } =
    useContext(dataContext);
  const sec = focusMode ? seconds[0] : seconds[1];
  const progressInPercentage = ((sec - remainingTime) / sec) * 100;

  return (
    <Box>
      <ProgressBar value={progressInPercentage} timeLeft={timeLeft} />
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
    <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
      <Button variant="contained" onClick={breakPressed} sx={BUTTON_STYLE}>
        Break
      </Button>
      <Button variant="contained" onClick={focusPressed} sx={BUTTON_STYLE}>
        Focus
      </Button>
    </Box>
  );
}

function StartButton() {
  const { setActiveSession } = useContext(dataContext);

  return (
    <Button
      variant="contained"
      sx={START_BUTTON_STYLE}
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
    <Box>
      <Button variant="contained" onClick={pausePressed} sx={BUTTON_STYLE}>
        Pause
      </Button>
      <Button variant="contained" onClick={resetPressed} sx={BUTTON_STYLE}>
        Reset
      </Button>
    </Box>
  );
}

function Blocklist() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Typography fontSize={'1.2rem'} textAlign={'left'}>
        Blocklist Website
      </Typography>
      <Box display={'flex'} gap={'20px'} marginBottom={'5px'}>
        <TextField
          placeholder="Eg: Youtube.com"
          sx={{ width: '80%' }}
          InputProps={{ style: { height: '30px' } }}
        />
        <Button variant="contained" sx={{ width: '45px', height: '30px' }}>
          Add
        </Button>
      </Box>
    </Box>
  );
}

export default function Home() {
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
      <HomeNav />
      <Clock />
      <Box display={'flex'} flexDirection={'column'}>
        <SessionButtonGroup />
        {!activeSession ? <StartButton /> : <StopButtonGroup />}
      </Box>
      <Blocklist />
    </Container>
  );
}
