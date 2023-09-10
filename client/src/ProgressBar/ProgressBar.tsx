import CircularProgress, {
  CircularProgressProps,
} from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useContext, useRef, useState } from 'react';
import { TextField } from '@mui/material';
import { dataContext } from '../dataContext';

// function SmallMinute() {
//   return <Typography fontSize={'0.5rem'}>MINUTES</Typography>;
// }

// function SmallSecond() {
//   return <Typography fontSize={'0.5rem'}>MINUTES</Typography>;
// }

function Timer({ timeLeft }: { timeLeft: number[] }) {
  const { updateSeconds, activeSession, setRemainingTime } =
    useContext(dataContext);

  const minRef = useRef<HTMLInputElement | null>(null);
  const secRef = useRef<HTMLInputElement | null>(null);
  const [editMode, setEditMode] = useState(false);

  return (
    <Box
      sx={{
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 3,
      }}
    >
      {editMode === false ? (
        <Typography
          variant="caption"
          component="div"
          color="text.secondary"
          onClick={(e) => {
            if (activeSession) return;
            if (e.detail === 2) setEditMode(true);
          }}
          fontSize={'2.2rem'}
        >
          {`${timeLeft[0].toString().padStart(2, '0')} : ${timeLeft[1]
            .toString()
            .padStart(2, '0')}`}
        </Typography>
      ) : (
        <Box display={'flex'}>
          <TextField
            variant="standard"
            ref={minRef}
            onChange={(e) => {
              if (minRef.current) minRef.current.value = e.target.value;
            }}
            InputProps={{
              style: {
                fontSize: '2.2rem',
                width: `2ch`,
                textAlign: 'end',
              },
              disableUnderline: true,
            }}
            defaultValue={timeLeft[0].toString().padStart(2, '0')}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !activeSession) {
                // Editing timer is disabled when session is active

                if (minRef.current && secRef.current) {
                  const min = minRef.current.value ?? '0';
                  const sec = secRef.current.value ?? '0';
                  updateSeconds(Number(min) * 60 + Number(sec));
                  setRemainingTime(Number(min) * 60 + Number(sec));
                }
                // if minute reference does not exist, something is wrong and we should disable the ability to update the max seconds of a timer
                setEditMode(false);
              }
            }}
          />
          <Typography fontSize={'2.2rem'}>:</Typography>
          <TextField
            variant="standard"
            ref={secRef}
            InputProps={{
              style: {
                fontSize: '2.2rem',
                width: '2ch',
              },
              disableUnderline: true,
            }}
            onChange={(e) => {
              if (secRef.current) secRef.current.value = e.target.value;
            }}
            defaultValue={timeLeft[1].toString().padStart(2, '0')}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !activeSession) {
                // Editing timer is disabled when session is active

                if (minRef.current && secRef.current) {
                  const min = minRef.current.value ?? '0';
                  const sec = secRef.current.value ?? '0';
                  updateSeconds(Number(min) * 60 + Number(sec));
                  setRemainingTime(Number(min) * 60 + Number(sec));
                } else console.error('secRef and minRef are null');

                // if minute reference does not exist, something is wrong and we should disable the ability to update the max seconds of a timer
                setEditMode(false);
              }
            }}
          />
        </Box>
      )}
    </Box>
  );
}

export default function ProgressBar(
  props: CircularProgressProps & {
    value: number;
    timeLeft: [number, number];
  }
) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress
        variant="determinate"
        thickness={1.5}
        {...props}
        size={'220px'}
        sx={{ zIndex: 2, color: '#c4f4df' }}
      />
      <CircularProgress
        variant="determinate"
        thickness={1.5}
        sx={{
          position: 'absolute',
          left: 0,
        }}
        {...props}
        value={100}
        size={'220px'}
      />
      <Timer timeLeft={props.timeLeft} />
    </Box>
  );
}
