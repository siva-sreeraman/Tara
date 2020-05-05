import React from "react";
import clsx from "clsx";
import * as firebase from "firebase/app";
import { Link, Route, Redirect } from "react-router-dom";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import PeopleIcon from "@material-ui/icons/People";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import EventIcon from "@material-ui/icons/Event";
import AssignmentIcon from "@material-ui/icons/Assignment";
import FaceIcon from "@material-ui/icons/Face";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import AccountTreeIcon from "@material-ui/icons/AccountTree";

import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import GroupIcon from "@material-ui/icons/Group";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import ListItemText from "@material-ui/core/ListItemText";

import Login from "../components/Login";
import MyProjects from "../components/MyProjects";
import AdminDashboard from "../components/AdminDashboard";
import ProjectOverview from "../components/ProjectOverview";
import SuDashboard from "../su/components/su-dashboard";
import CompanyDB from "../components/companyDB";
import AdminRequests from "../components/adminrequests";
// import Calendar from "../components/Calendar";
import FileUpload from "../components/FileUpload";
import CreateProject from "../components/CreateProject";
import CreateProjectTemplate from "../components/CreateProjectTemplate";
import Documents from "../components/Documents";
import Example from "../components/samplepopup";
import Navbarpage from "../components/Navbarpage";
import Eventdetails from "../components/Eventdetails";
import Taskdetails from "../components/Taskdetails";
import Mycalender from "../components/Mycalender";
import Registration from "../components/Registration";
import Projectpage from "../components/Projectpage";
import Projectmainpage from "../components/Projectmainpage";
import Adminprofilepage from "../components/Adminprofilepage";
import ProjectEvent from "../components/ProjectEvent";
import ProjectTasks from "../components/ProjectTasks";
import Fullcalender from "../components/Fullcalender";
import CrewListing from "../components/projectOverview/ProjectContacts";
import CompanyUsers from "../components/CompanyUsers";
import CompanyCostumes from "../components/CompanyCostumes";
import Costume from "../components/projectOverview/CostumePage";
import UserGroups from "../components/projectOverview/UserGroups";
import CompanyLocation from "../components/CompanyLocations";
import RoomIcon from "@material-ui/icons/Room";
import BeenhereIcon from "@material-ui/icons/Beenhere";

import Allevents from "../components/Allevents";
import Alltasks from "../components/Alltasks";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  grow: {
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function MiniDrawer(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = async () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        window.sessionStorage.removeItem("auth");
        window.sessionStorage.clear();
      });
  };

  const handleLogin = async () => {};

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            TARA
          </Typography>
          <div className={classes.grow} />
          {!!props?.auth ? (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <Button color="inherit" onClick={handleLogin}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <Link className="remove-link-style" to="/Projectpage">
            <ListItem button key="Groups">
              <ListItemIcon>
                <AccountTreeIcon />
              </ListItemIcon>
              <ListItemText primary="Projects" />
            </ListItem>
          </Link>

          <Link className="remove-link-style" to="/Allevents">
            <ListItem button key="Groups">
              <ListItemIcon>
                <EventIcon />
              </ListItemIcon>
              <ListItemText primary="Events" />
            </ListItem>
          </Link>

          <Link className="remove-link-style" to="/fullcalendar">
            <ListItem button key="Groups">
              <ListItemIcon>
                <CalendarTodayIcon />
              </ListItemIcon>
              <ListItemText primary="My Calendar" />
            </ListItem>
          </Link>

          <Link className="remove-link-style" to="/Alltasks">
            <ListItem button key="Groups">
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText primary="Tasks" />
            </ListItem>
          </Link>

          <Divider />

          <Link className="remove-link-style" to="/companyCostumes">
            <ListItem button key="Groups">
              <ListItemIcon>
                <LocalMallIcon />{" "}
              </ListItemIcon>
              <ListItemText primary="Costumes" />
            </ListItem>
          </Link>

          <Link className="remove-link-style" to="/companylocations">
            <ListItem button key="Groups">
              <ListItemIcon>
                <RoomIcon />
              </ListItemIcon>
              <ListItemText primary="Locations" />
            </ListItem>
          </Link>
          <Divider />

          <Link className="remove-link-style" to="/Companyuserspage">
            <ListItem button key="Groups">
              <ListItemIcon>
                <PeopleIcon />{" "}
              </ListItemIcon>
              <ListItemText primary="Users" />
            </ListItem>
          </Link>

          <Link className="remove-link-style" to="/pendingrequests">
            <ListItem button key="Groups">
              <ListItemIcon>
                <BeenhereIcon />{" "}
              </ListItemIcon>
              <ListItemText primary="Requests" />
            </ListItem>
          </Link>
          <Divider />
          <Link className="remove-link-style" to="/Adminprofilepage">
            <ListItem button key="Groups">
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItem>
          </Link>
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {/* <Typography paragraph>
          <h1>All Mail</h1>
        </Typography> */}
        <div className="route-container">
          {/* <Route path="/" component={Navbarpage} /> */}

          <Route path="/my-projects" component={MyProjects} />
          <Route path="/su-dashboard" component={SuDashboard} />
          <Route path="/admin-dashboard" component={AdminDashboard} />
          <Route path="/project-overview/:id" component={ProjectOverview} />
          <Route path="/company-db" component={CompanyDB} />
          <Route path="/file-upload" component={FileUpload} />
          <Route path="/create-project" component={CreateProject} />
          <Route
            path="/create-project-template"
            component={CreateProjectTemplate}
          />

          <Route path="/pendingrequests" component={AdminRequests} />

          <Route path="/documents" component={Documents} />
          <Route path="/samplepopup" component={Example} />
          <Route path="/eventdetails/:id" component={Eventdetails} />
          <Route path="/taskdetails/:id" component={Taskdetails} />
          <Route path="/mycalender" component={Mycalender} />
          <Route path="/navbarpage" component={Navbarpage} />
          <Route path="/Projectpage" component={Projectpage} />
          <Route path="/usergroups" component={UserGroups} />
          <Route path="/Projectmainpage/:id" component={Projectmainpage} />
          <Route path="/Adminprofilepage" component={Adminprofilepage} />
          <Route path="/ProjectEvent/" component={ProjectEvent} />
          <Route path="/ProjectTasks/" component={ProjectTasks} />
          <Route path="/contactspage" component={CrewListing} />
          <Route path="/Companyuserspage" component={CompanyUsers} />
          <Route path="/companyCostumes" component={CompanyCostumes} />
          <Route path="/Costumepage" component={Costume} />
          <Route path="/companylocations" component={CompanyLocation} />
          <Route path="/Allevents" component={Allevents} />
          <Route path="/Alltasks" component={Alltasks} />
          <Route path="/fullcalendar" component={Fullcalender} />
        </div>
      </main>
    </div>
  );
}
