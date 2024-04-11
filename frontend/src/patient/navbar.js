import React from "react";
import { useNavigate } from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";
import {
  Box,
  Tooltip,
  ListItem,
  ListItemIcon,
  ListItemText,
  CssBaseline,
  Divider,
  IconButton,
  Typography,
  List,
  Toolbar,
} from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CreateIcon from "@mui/icons-material/Create";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import LogoutIcon from "@mui/icons-material/Logout";

const Navbar = () => {
  const history = useNavigate();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  // SIGN OUT FUNCTION - Modify this function to communicate with your backend
  const handleSignout = async () => {
    try {
      // Send a request to your Express backend to sign out the user
      const response = await fetch("/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // You may need to include any necessary authentication tokens here
        // For example:
        // Authorization: `Bearer ${token}`,
      });

      if (response.ok) {
        // If sign-out is successful, redirect the user to the home page
        history.push("/#");
      } else {
        // Handle sign-out failure
        console.error("Sign-out failed");
      }
    } catch (error) {
      console.error("Error during sign-out:", error);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{ backgroundColor: "#ff669e" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Medicare (Patients)
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem button component="a" href="/patient/dashboard">
            <Tooltip title="Dashboard" placement="right">
              <ListItemIcon><DashboardIcon /></ListItemIcon>
            </Tooltip>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button component="a" href="/patient/book_appointment">
            <Tooltip title="Book Appointment" placement="right">
              <ListItemIcon><CreateIcon /></ListItemIcon>
            </Tooltip>
            <ListItemText primary="Book Appointment" />
          </ListItem>
          <ListItem button component="a" href="/patient/latest_updates">
            <Tooltip title="Latest Updates" placement="right">
              <ListItemIcon><NewspaperIcon /></ListItemIcon>
            </Tooltip>
            <ListItemText primary="Latest Updates" />
          </ListItem>
          <ListItem button onClick={handleSignout}>
            <Tooltip title="Sign Out" placement="right">
              <ListItemIcon><LogoutIcon /></ListItemIcon>
            </Tooltip>
            <ListItemText primary="Sign Out" />
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
};

export default Navbar;

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
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
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
