import { ThemeProvider, createTheme } from "@mui/material";

// import browser from 'webextension-polyfill';
import { useState } from "react";
import Home from "./Home/Home";
import DataContext from "./dataContext";

const colorTheme = createTheme({
  palette: {
    primary: {
      light: "#D4F2E0",
      main: "#7BC599",
      dark: "#4FA772",
      contrastText: "#000",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#D4F2E0",
          backgroundImage: `linear-gradient(19deg, #D4F2E0 0%, #7BC599 100%)`,
        },
      },
    },
  },
});

// States: total time, focus state, session on/off

export default function App() {
  // const breakModeTheme = useContext(breakModeTheme)
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

  return (
    <ThemeProvider theme={colorTheme}>
      <DataContext
        data={{
          seconds,
          activeSession,
          focusMode,
          remainingTime,

          setSeconds,
          setActiveSession,
          setFocusMode,
          setRemainingTime,

          updateSeconds,
          timeLeft,
        }}
      >
        <Home />
      </DataContext>
    </ThemeProvider>
  );
}
