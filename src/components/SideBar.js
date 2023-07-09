import React from 'react';
import { SwipeableDrawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Home as HomeIcon, People as PeopleIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const SideBar = ({ open, handleToggleDrawer }) => {
    const navigate = useNavigate();

    const navigateTo = () => {
        console.log('naviiiiiiiiigatr')
        navigate('/dashboard/users');
        handleToggleDrawer();
    };

    return (
        <SwipeableDrawer anchor="left" open={open} onClose={handleToggleDrawer} onOpen={handleToggleDrawer}>
            <List>
                <ListItem button onClick={handleToggleDrawer}>
                    <ListItemIcon>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItem>
                <ListItem button onClick={navigateTo}>
                    <ListItemIcon>
                        <PeopleIcon />
                    </ListItemIcon>
                    <ListItemText primary="Users" />
                </ListItem>
            </List>
        </SwipeableDrawer>
    );
};

export default SideBar;