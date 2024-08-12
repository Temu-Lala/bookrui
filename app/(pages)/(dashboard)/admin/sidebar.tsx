"use client";
import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import PreviewIcon from "@mui/icons-material/Preview";
import DraftsIcon from "@mui/icons-material/Drafts";
import { Button } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import InboxIcon from "@mui/icons-material/MoveToInbox"; // Add this import
import MailIcon from "@mui/icons-material/Mail";
import Booklogo from '../../../../public/assets/book.png'
const drawerWidth = 240;

const iconMap = {
  Dashboard: <DashboardIcon sx={{ color: "white" }} />,
  "All Books": <CloudUploadIcon sx={{ color: "white" }} />,
  "All Users": <PreviewIcon sx={{ color: "white" }} />,
  Drafts: <DraftsIcon sx={{ color: "white" }} />,
};

const items = ["Dashboard", "All Books", "All Users", "Drafts"];

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));


const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function PersistentDrawerLeft() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [selectedComponent, setSelectedComponent] = React.useState<string>("Dashboard");
  const router = useRouter();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const navigateTo = (path: string) => {
    setSelectedComponent(path);
  };

  const renderSelectedComponent = () => {
    switch (selectedComponent) {
      case "dashboard":
        return <DynamicDashboard />;
      case "allbooks":
        return <DynamicAllbooks />;
      case "allusers":
        return <DynamicAllusers />;
      case "drafts":
        return <DynamicDrafts />;
      default:
        return <DynamicDashboard />;
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100vw",
        height: "100vh",
       
      }}
    >
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Admin Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#29264E",
            color: "white",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton sx={{ color: "white" }} onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
          <Image
        src={Booklogo}
        alt="Logo Image"
        
       
        className=' w-14 h-14 rounded-2xl'
      />
          <Typography>Admin  
            
          </Typography>
        </DrawerHeader>
        <Divider />
        <List>
          {items.map((text) => (
            <ListItem key={text} disablePadding>
              <ListItemButton
                onClick={() => navigateTo(`${text.replace(" ", "").toLowerCase()}`)}
                sx={{ ":hover": { color: "yellow" } }}
              >
                <ListItemIcon>{iconMap[text]}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {["Notifications", "Settings", "Spam"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton
                onClick={() => navigateTo(`${text.replace(" ", "").toLowerCase()}`)}
                sx={{ ":hover": { color: "yellow" } }}
              >
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Button onClick={() => navigateTo("logout")}>Logout</Button>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {renderSelectedComponent()}
      </Main>
    </Box>
  );
}

// Lazy load components to optimize performance
const DynamicDashboard = dynamic(() => import("./dashboard"), {
  ssr: false,
});
const DynamicAllbooks = dynamic(() => import("./allbooks"), {
  ssr: false,
});
const DynamicAllusers = dynamic(() => import("./tables"), {
  ssr: false,
});
const DynamicDrafts = dynamic(() => import("./pichart"), {
  ssr: false,
});
