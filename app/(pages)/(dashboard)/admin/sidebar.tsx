import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Pichart from './pichart';
import Tables from './tables';
import Chart from './chart';
import Card from './card'
import { Button, colors } from '@mui/material';
import Logo from '../../../../public/assets/book.png';
import Image from "next/image";
import DashboardIcon from '@mui/icons-material/Dashboard';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import PreviewIcon from '@mui/icons-material/Preview';
import DraftsIcon from '@mui/icons-material/Drafts';
const drawerWidth = 240;
const iconMap = {
  'Dashbord': <DashboardIcon sx={{color:'white'}} />,
  'Book Upload': <CloudUploadIcon sx={{color:'white'}}/>,
  'Book Previews': <PreviewIcon sx={{color:'white'}} />,
  'Drafts': <DraftsIcon sx={{color:'white'}}/>,
};

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));
const items = ['Dashbord', 'Book Upload', 'Book Previews', 'Drafts'];

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex', width: '100vw',
      height: '100vh',  backgroundColor: '#CCCCCC' }} >
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Admin Dashbord
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor :'#29264E',
            color :'white'
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton sx={{color:'white'}} onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
          
          <Image
          
        src={Logo} // Route to your image file
        alt="Side Image"
        
             className="object-contain rounded-full w-16 h-16" // Ensures image fits within container
      />
      
          <h1>Book Rent</h1>
        </DrawerHeader>
        <Divider />
        <List sx={{":hover":{color:'yellow'}}}>
          
        <div className=' text-cyan-50'>
      {items.map((text) => (
        <ListItem sx={{":hover":{color:'yellow'}}} key={text} disablePadding>
          <ListItemButton>
            <ListItemIcon>{iconMap[text]}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItemButton>
        </ListItem>
      ))}
    </div>
            
         
          
        </List>
        <Divider />
        <List>
          {['Notifcations', 'Setting', 'Spam'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Button>
          Logout
          </Button>
      </Drawer>
      <Main sx={{ display:'flex',width: '100vw',
        height: '100vh', flexDirection: 'row'}} open={open}>
        <DrawerHeader />
    <div className=' flex  flex-1 gap-12   flex-col  justify-center w-fit h-full'>
    
    <div className=' w-fit'><Card/></div>
    <div className=' w-fit'><Pichart/></div>
    
    
    </div>
     <div className='flex flex-1 flex-col   '>
     <div className='w-fit h-auto  pt-20'> <Tables/></div>
    <div className='w-fit h-4/5 '>  <Chart/></div>
   
     </div>
      
      
      </Main>
    </Box>
  );
}
