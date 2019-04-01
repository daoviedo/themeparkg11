import React from 'react';
import AccIcon from '@material-ui/icons/AccountBox';

import Settings from '@material-ui/icons/Settings';
import Warning from '@material-ui/icons/Warning';
import Exit from '@material-ui/icons/ExitToApp';
import HomeLogo from '@material-ui/icons/Home';
import EntLogo from '@material-ui/icons/ConfirmationNumber';
import RideLogo from '@material-ui/icons/LocalPlay';
import Dept from '@material-ui/icons/Work';
import { Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemText, Divider, IconButton} from "@material-ui/core";



function UserBar(props) {
    return (
        <React.Fragment>
        <IconButton onClick={props.openMenu} style={{textTransform: 'none', outline: 0, border: 'none', color: 'white', marginTop: -3}}>
                  <AccIcon/>
        </IconButton>
        <Drawer anchor="right" open={props.openUserMenu} onClose={props.closeMenu}>
            <div onClick={props.closeMenu}>
                <List>
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <ListItem button>
                            <HomeLogo style={{ color: "#2A2A31" }}/>
                            <ListItemText primary='Home' />
                        </ListItem>
                    </Link>
                </List>
                <Divider />
                <List>
                    <Link to="/entrance-scan" style={{ textDecoration: 'none' }}>
                        <ListItem button>
                            <EntLogo style={{ color: "#2A2A31" }}/>
                            <ListItemText primary='Park Entrance Scan' />
                        </ListItem>
                    </Link>
                    <Link to="/scan-rides" style={{ textDecoration: 'none' }}>
                        <ListItem button>
                            <RideLogo style={{ color: "#2A2A31" }}/>
                            <ListItemText primary='Ride Ticken Scan' />
                        </ListItem>
                    </Link>
                </List>
                <Divider />
                <List>
                    <Link to="/maintenance" style={{ textDecoration: 'none' }}>
                        <ListItem button>
                            <Warning style={{ color: "#2A2A31" }}/>
                            <ListItemText primary='Maintenance' />
                        </ListItem>
                    </Link>
                    <Link to="/department" style={{ textDecoration: 'none' }}>
                        <ListItem button>
                            <Dept style={{ color: "#2A2A31" }}/>
                            <ListItemText primary='Department' />
                        </ListItem>
                    </Link>
                </List>
                <Divider />
                <List>
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <ListItem button>
                            <Settings style={{ color: "#2A2A31" }}/>
                            <ListItemText primary='Account Settings' />
                        </ListItem>
                    </Link>
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <ListItem button onClick={props.logOff}>
                            <Exit style={{ color: "#2A2A31" }}/>
                            <ListItemText primary='Log out' />
                        </ListItem>
                    </Link>
                </List>
            </div>
        </Drawer>
        </React.Fragment>
    );
}

export default UserBar;