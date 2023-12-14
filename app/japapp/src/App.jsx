//@ts-check

import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import "./App.css";
import WordCard from './components/WordCard';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
// import ButtonAppBar from './components/AppBar';
import MuiAppBar from '@mui/material/AppBar';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import Badge from '@mui/material/Badge';
import Home from './screens/Home';
import Learn from './screens/Learn';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DrawerChapters from './components/DrawerChapters';
import { ListSubheader } from '@mui/material';
const drawerWidth = 150;


const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
// @ts-ignore
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
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
        width: theme.spacing(0),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(0),
        },
      }),
    },
  }),
);

const JappAppbar = ({open, toggleDrawer}) => {
  let navigate = useNavigate();  return (

  <AppBar position="absolute" open={open}>
    <Toolbar
      sx={{
        pr: '24px', // keep right padding when drawer closed
      }}
    >
      <IconButton
        edge="start"
        color="inherit"
        aria-label="open drawer"
        onClick={toggleDrawer}
        sx={{
          marginRight: '36px',
          ...(open && { display: 'none' }),
        }}
      >
        <MenuIcon />
      </IconButton>
      <Typography
        component="h1"
        variant="h6"
        color="inherit"
        noWrap
        sx={{ flexGrow: 1 }}
      >
        <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
          JapApp
        </Link>
      </Typography>
    </Toolbar>
  </AppBar>
  );
}

const JappDrawer = ({open, toggleDrawer}) => {
  let navigate = useNavigate();

  return (
    <Drawer variant="permanent" open={open}>
    <Toolbar
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        px: [1],
      }}
    >
      <IconButton onClick={toggleDrawer}>
        <ChevronLeftIcon />
      </IconButton>
    </Toolbar>
    <Divider />
    <List component="nav">
    <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
      <ListItemButton>
        {/* <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon> */}
        <ListItemText primary="Home" />
      </ListItemButton>
    </Link>
    <Link to="/learn" style={{ textDecoration: 'none', color: 'black' }}>
      <ListItemButton>
        {/* <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon> */}
        <ListItemText primary="Learn"/>
      </ListItemButton>
    </Link>
    <Divider sx={{ my: 1 }} />
    <ListSubheader component="div" >
      Chapters
    </ListSubheader>
    <DrawerChapters />

      {/* {secondaryListItems} */}
    </List>
    </Drawer>
  )
}


const App = () => {
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  }

  return (
    <Router>
      
      <Box sx={{ display: 'flex' }}>
        <JappAppbar open={open} toggleDrawer={toggleDrawer}/>
        <JappDrawer open={open} toggleDrawer={toggleDrawer}/>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            // height: '200vh',
            overflow: 'auto',
          }}
        >    
        <Toolbar />

        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Routes>
          <Route path="/" element={Home()} />
          <Route path="/learn" element={Learn()} />
          </Routes>
          
          {/* {Home()} */}
        </Grid>
        </Container>
        </Box>
      </Box>
      
    </Router>
  );
};

export default App;
