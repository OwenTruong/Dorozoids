import {
  Box,
  Container,
  ListItem,
  List,
  TextField,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router';

import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { Close } from '@mui/icons-material';

function SiteListItem({ url }: { url: string }) {
  return (
    <ListItem>
      <ListItemText primary={url} />
      <a href="#">
        <Close />
      </a>
    </ListItem>
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

export default function Settings() {
  const navigate = useNavigate();
  return (
    <Container
      sx={{
        width: '375px',
        height: '560px',
        backgroundColor: '#D4F2E0',
        backgroundImage: `linear-gradient(135deg, #D4F2E0 0%, #7BC599 100%)`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Box display={'flex'} width={'100%'} justifyContent={'flex-start'}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={() => navigate('/')}
        >
          &larr; Back
        </IconButton>
      </Box>
      <Box>
        <Blocklist />
      </Box>
      <Box display={'flex'} width={'100%'} flexDirection={'column'}>
        <Typography
          variant="h5"
          className="secondary-heading"
          fontWeight={'500'}
        >
          Blocklisted Websites
        </Typography>
        <List>
          {['youtube.com', 'reddit.com', 'twitter.com'].map((url) => (
            <SiteListItem url={url} />
          ))}
        </List>
      </Box>
      <Box>
        <Typography variant="h5" fontWeight={500}>
          Choose a Mode
        </Typography>
        <Box className="modes" display={'flex'}>
          <Checkbox
            id="auto-break-mode"
            value="Auto-Break"
            inputProps={{ 'aria-label': 'Auto-Break Mode' }}
            size="small"
          />
          <label htmlFor="auto-break-mode">
            <Typography variant="body1" fontSize={'1.1rem'} fontWeight={'500'}>
              Auto Break Mode:
            </Typography>
            <Typography>
              Automatically switches to break mode after the timer in focus mode
              runs out
            </Typography>
          </label>
        </Box>
        <Box className="modes" display={'flex'}>
          <Checkbox
            id="super-focus-mode"
            value="Super-Focus"
            inputProps={{ 'aria-label': 'Super-Focus Mode' }}
            size="small"
          />
          <label htmlFor="super-focus-mode">
            <Typography variant="body1" fontSize={'1.1rem'} fontWeight={'500'}>
              Super Focus Mode:
            </Typography>
            <Typography>
              After the timer runs out, the user is asked if they wish to extend
              their time
            </Typography>
          </label>
        </Box>
        <Typography variant="body2" className="disclaimer">
          *Choosing nothing will set the pomodoro to its default settings
        </Typography>
      </Box>
    </Container>
  );
}
