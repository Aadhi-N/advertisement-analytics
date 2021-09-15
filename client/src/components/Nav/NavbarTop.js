import { AppBar, Toolbar, Typography, Drawer, List, ListItem, Divider, ListItemText} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import ListItemIcon from '@material-ui/core/ListItemIcon';

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
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const NavbarTop = () => {
    const classes = useStyles();
    return (
        <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
            <Typography variant="h6" noWrap>
                EQ Works - Assessment
            </Typography>
            </Toolbar>
        </AppBar>
    )
};

export default NavbarTop;