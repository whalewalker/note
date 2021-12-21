import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  makeStyles,
  Typography,
  ListItemText,
  AppBar,
  Toolbar,
} from "@material-ui/core";
import { AddCircleOutlined, SubjectOutlined } from "@material-ui/icons";
import { useNavigate, useLocation } from "react-router-dom";
import { format } from "date-fns";

import React from "react";

const drawerWidth = 250;

const useStyles = makeStyles((theme) => {
  return {
    page: {
      background: "#f9f9f9",
      width: "100%",
      minHeight: "100vh",
      padding: theme.spacing(3),
    },
    drawer: {
      width: drawerWidth,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    root: {
      display: "flex",
    },
    active: {
      background: "#f4f4f4",
    },
    title: { padding: theme.spacing(2) },
    appbar:{
            width: `calc(100% - ${drawerWidth}px)`,
            margin: "0 auto"
    },
    toolbar: theme.mixins.toolbar,
    date:{flexGrow: 1},

  };
});

const Layout = ({ children }) => {
  const classes = useStyles();
  const menueItem = [
    {
      text: "My Notes",
      icon: <SubjectOutlined color="secondary" />,
      path: "/",
    },
    {
      text: "Create Note",
      icon: <AddCircleOutlined color="secondary" />,
      path: "/create",
    },
  ];

  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className={classes.root}>
      {/* App bar */}
      <AppBar classes={classes.appbar} elevation={1}>
        <Toolbar>
                <Typography variant="body2" className={classes.date}>Today is the {format(new Date(), "do MMMM Y")}</Typography>
                <Typography variant="body2">Mario</Typography>
        </Toolbar>
      </AppBar>

      {/* Side drawer */}
      <Drawer
        className={classes.drawer}
        variant="permanent"
        anchor="left"
        classes={{ paper: classes.drawerPaper }}
      >
        <Typography variant="h5" className={classes.title}>
          Ninja Notes
        </Typography>

        {/* List Links */}
        <List>
          {menueItem.map((item) => (
            <ListItem
              key={item.text}
              button
              onClick={() => navigate(item.path)}
              className={location.pathname === item.path && classes.active}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <div className={classes.page}>
              <div className={classes.toolbar}></div>
              {children}</div>
    </div>
  );
};

export default Layout;
