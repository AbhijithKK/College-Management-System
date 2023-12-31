import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
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
import { Link, useLocation } from "react-router-dom";
import {
  Diversity3Sharp,
  LogoutSharp,
  UploadFileSharp,
  AccountCircleSharp,
  CheckCircleSharp,
  HowToRegSharp,
  PendingActionsSharp,
  MarkEmailUnreadSharp,
  PeopleAltSharp,
  Chat,
} from "@mui/icons-material";
import { Tooltip } from "@mui/material";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const links = [
  { text: "Profile", 
  link: "/faculty/profile", 
  icon: <AccountCircleSharp /> },
  {
    text: "Add Result",
    link: "/faculty/addresult",
    icon: <CheckCircleSharp />,
  },
  { text: "Clubs", 
  link: "/faculty/clubs", 
  icon: <Diversity3Sharp /> },
  {
    text: "Your Clubs",
    link: "/faculty/clubmanage",
    icon: <Diversity3Sharp />,
  },
  {
    text: "Add Attendance",
    link: "/faculty/makeattendance",
    icon: <HowToRegSharp />,
  },
  {
    text: "View Students",
    link: "/faculty/allstudents",
    icon: <PeopleAltSharp />,
  },
  {
    text: "Check Leave Letters",
    link: "/faculty/Checkleaveletters",
    icon: <PendingActionsSharp />,
  },


  { text: "Chat", link: "/faculty/chat", icon: <Chat /> },
  {
    text: "Check Notice",
    link: "/faculty/notice",
    icon: <MarkEmailUnreadSharp />,
  },
  {
    text: "Add Comlaint",
    link: "/faculty/addComplaint",
    icon: <UploadFileSharp />,
  },

  { text: "Logout", link: "/faculty/logout", icon: <LogoutSharp /> },
];

export default function SideBarFaculty() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const [currentlySelected,setCurrentlySelected]=React.useState(null)
  const {state}=useLocation()
  React.useEffect(()=>{
    let val=0;
    if(state?.index){
      val=state?.index
    }
    setCurrentlySelected(val)
  },[state])
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} style={{backgroundColor:"#1e0f0f"}}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            COLLEGE MANAGEMENT SYSTEM
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <h2>
            <u>Faculty Panel</u>
          </h2>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {links.map((item, index) => (
            <ListItem key={index} 
            disablePadding sx={{
               display: "block",
               backgroundColor:currentlySelected===index 
               ?'#1e0f0f':'transparent',
               color:currentlySelected===index ?'white':'black',
               
               }}>
              <ListItemButton
              
                component={Link}
                state={{index}}
                to={item.link}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <Tooltip title={item.text}>
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                    style={{color:currentlySelected===index ? 'white':'gray'}}
                  >
                    {item.icon}
                  </ListItemIcon>
                </Tooltip>
                <ListItemText
                  primary={item.text}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Typography paragraph></Typography>
      </Box>
    </Box>
  );
}
