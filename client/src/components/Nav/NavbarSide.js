import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";

import { AppBar, Toolbar, Typography, Drawer, List, ListItem, Divider, ListItemText} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AssessmentIcon from '@material-ui/icons/Assessment';
import MapIcon from '@material-ui/icons/Map';

import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import "./Navbar.styles.css";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
    paddingTop: "20px"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const NavbarSide = () => {
    const classes = useStyles();

    return (
        <>
            <Drawer
                className={classes.drawer}
                variant="permanent"         
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <Toolbar />

                <div className={classes.drawerContainer}>
                    <List>
                        {['charts', 'map'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>{index % 2 === 0 ? <AssessmentIcon /> : <MapIcon />}</ListItemIcon>
                            <span id="x"><Link to={`/${text}`}><ListItemText primary={text.charAt(0).toUpperCase() + text.slice(1)} /></Link></span>
                        </ListItem>
                        ))}
                    </List>

                    <Divider />
                    <List>
                        {['all data'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                            <span id="x"><Link to={`/all-data`}><ListItemText primary={text.charAt(0).toUpperCase() + text.slice(1)}/></Link></span>
                        </ListItem>
                        ))}
                    </List>
                </div>
            </Drawer>
        </>
    )
};

export default NavbarSide;