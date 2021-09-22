import { Link } from "react-router-dom";

/* Styles imports */
import "./Navbar.styles.css";

/* Material-UI components imports */
import { Toolbar, Drawer, List, ListItem, Divider, ListItemText} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ListItemIcon from '@material-ui/core/ListItemIcon';

/* Material-UI icons imports */
import { MoveToInbox, Dashboard, InsertChart, Map } from "@material-ui/icons";

/* Override Material-UI component styles */
const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    width: 240,
  }
}));


const NavbarSide = () => {
  const classes = useStyles()
    return (
        <>
            <Drawer
                className="drawer"
                variant="permanent"         
                classes={{
                  paper: classes.drawerPaper
                }}
            >
                <Toolbar />
                <div className="drawer-container">
                    <List>
                        {[{text: 'dashboard', icon: <Dashboard/>}, {text: 'charts', icon: <InsertChart/>}, {text: 'map', icon: <Map/>}].map((item, index) => (
                        <span className="list-item-text"><Link to={`/${item.text}`}>
                          <ListItem button key={item.text}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text.charAt(0).toUpperCase() + item.text.slice(1)} />
                          </ListItem>
                        </Link></span>
                        ))}
                    </List>

                    <Divider />
                    <List>
                        {[{text: 'all data', icon: <MoveToInbox/>}].map((item, index) => (
                        <span className="list-item-text"><Link to={`/all-data`}>
                          <ListItem button key={item.text}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text.charAt(0).toUpperCase() + item.text.slice(1)}/>
                          </ListItem>
                        </Link></span>
                        ))}
                    </List>
                </div>
            </Drawer>
        </>
    )
};

export default NavbarSide;