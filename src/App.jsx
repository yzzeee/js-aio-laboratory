import { useState } from 'react';
import { IntlProvider } from 'react-intl';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { t_en, t_ko, w_en, w_ko } from '@locale';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import { atom, useAtom } from 'jotai';

const DEFAULT_LOCALE = 'ko';
const messages = {
  en: Object.assign({}, t_en, w_en),
  ko: Object.assign({}, t_ko, w_ko),
};

const drawerWidth = 240;

const Drawer = styled(MuiDrawer, { shouldForwardProp: prop => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const defaultTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export const localeAtom = atom(DEFAULT_LOCALE);

export default function App() {
  const location = useLocation();
  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const [locale] = useAtom(localeAtom);

  const isSelected = pathPattern => {
    // 동적 세그먼트를 대체하여 정규 표현식 패턴을 생성
    const regexPattern = pathPattern.replace(/:\w+/g, '([^/]+)');
    const regex = new RegExp(`^${regexPattern}/?$`);
    return regex.test(location.pathname);
  };

  return (
    <IntlProvider key={locale} locale={locale} messages={messages[locale]}>
      <ThemeProvider theme={defaultTheme}>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline/>
          <Drawer open={open} variant="permanent">
            <Toolbar sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}>
              <IconButton onClick={toggleDrawer}>
                <ChevronLeftIcon/>
              </IconButton>
            </Toolbar>
            <Divider/>
            <List component="nav">
              <ListItemButton component={Link} selected={isSelected('/home/:active_tab')} to="/home/abort_controller">
                <ListItemIcon>
                  <DashboardIcon/>
                </ListItemIcon>
                <ListItemText primary="Home"/>
              </ListItemButton>
              <Divider sx={{ my: 1 }}/>
              <ListItemButton component={Link} selected={isSelected('/react')} to="/react">
                <ListItemIcon>
                  <AssignmentIcon/>
                </ListItemIcon>
                <ListItemText primary="React"/>
              </ListItemButton>
              <ListItemButton component={Link} selected={isSelected('/redux')} to="/redux">
                <ListItemIcon>
                  <AssignmentIcon/>
                </ListItemIcon>
                <ListItemText primary="Redux"/>
              </ListItemButton>
              <ListItemButton component={Link} selected={isSelected('/react-redux')} to="/react-redux">
                <ListItemIcon>
                  <AssignmentIcon/>
                </ListItemIcon>
                <ListItemText primary="React Redux"/>
              </ListItemButton>
              <ListItemButton component={Link} selected={isSelected('/redux-thunk')} to="/redux-thunk">
                <ListItemIcon>
                  <AssignmentIcon/>
                </ListItemIcon>
                <ListItemText primary="React Thunk"/>
              </ListItemButton>
              <ListItemButton component={Link} selected={isSelected('/redux-saga')} to="/redux-saga">
                <ListItemIcon>
                  <AssignmentIcon/>
                </ListItemIcon>
                <ListItemText primary="Redux Saga"/>
              </ListItemButton>
              <ListItemButton component={Link} selected={isSelected('/zustand')} to="/zustand">
                <ListItemIcon>
                  <AssignmentIcon/>
                </ListItemIcon>
                <ListItemText primary="Zustand"/>
              </ListItemButton>
            </List>
          </Drawer>
          <Box component="main"
               sx={{
                 backgroundColor: theme => (theme.palette.mode === 'light'
                   ? theme.palette.grey[100]
                   : theme.palette.grey[900]),
                 flexGrow: 1,
                 height: '100vh',
                 overflow: 'auto',
               }}>
            <Toolbar/>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              <Outlet/>
            </Container>
          </Box>
        </Box>
      </ThemeProvider>
    </IntlProvider>
  );
}
