import CircularProgress, {
  CircularProgressProps,
} from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useRef, useState } from 'react';
import { TextField } from '@mui/material';

export default function ProgressBar(
  props: CircularProgressProps & {
    value: number;
    timeLeft: [number, number];
    seconds: number[];
    activeSession: boolean;
    setRemainingTime: React.Dispatch<React.SetStateAction<number>>;
    updateTimer: (newTime: number) => void;
  }
) {
  // const minRef = useRef(props.timeLeft[0]);
  // const secRef = useRef(props.timeLeft[1]);
  const minRef = useRef<HTMLInputElement | null>(null);
  const secRef = useRef<HTMLInputElement | null>(null);
  const [editMode, setEditMode] = useState(false);
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" {...props} />
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
        }}
      >
        {editMode === false ? (
          <Typography
            variant="caption"
            component="div"
            color="text.secondary"
            onClick={(e) => {
              if (e.detail === 2) setEditMode(true);
            }}
          >
            {`${props.timeLeft[0]}:${props.timeLeft[1]}`}
          </Typography>
        ) : (
          <Box>
            <TextField
              ref={minRef}
              onChange={(e) => {
                if (minRef.current) minRef.current.value = e.target.value;
              }}
              defaultValue={props.timeLeft[0]}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !props.activeSession) {
                  // Editing timer is disabled when session is active

                  if (secRef.current) {
                    props.updateTimer(Number(secRef.current.value));
                    props.setRemainingTime(Number(secRef.current.value));
                  }
                  // if minute reference does not exist, something is wrong and we should disable the ability to update the max seconds of a timer
                  setEditMode(false);
                }
              }}
            />
            <Typography>:</Typography>
            <TextField
              ref={secRef}
              onChange={(e) => {
                if (secRef.current) secRef.current.value = e.target.value;
              }}
              defaultValue={props.timeLeft[1]}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !props.activeSession) {
                  // Editing timer is disabled when session is active

                  if (secRef.current) {
                    props.updateTimer(Number(secRef.current.value));
                    props.setRemainingTime(Number(secRef.current.value));
                  }

                  // if minute reference does not exist, something is wrong and we should disable the ability to update the max seconds of a timer
                  setEditMode(false);
                }
              }}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
}
