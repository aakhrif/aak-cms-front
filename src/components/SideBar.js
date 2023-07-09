import React from 'react';
import { SwipeableDrawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Abc as AbcIcon, People as PeopleIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const SideBar = ({ open, handleToggleDrawer }) => {
    const navigate = useNavigate();

    const navigateTo = (suburl) => {
        navigate(`/dashboard/${suburl}`);
        handleToggleDrawer();
    };

    return (
        <SwipeableDrawer
            anchor="left"
            open={open}
            onClose={handleToggleDrawer}
            onOpen={handleToggleDrawer}
            sx={{ minWidth: '300px', minHeight: '100px' }}
        >
            <List sx={{ paddingTop: '100px' }}>
                <ListItem button onClick={() => navigateTo('contents')}>
                    <ListItemIcon>
                        <AbcIcon />
                    </ListItemIcon>
                    <ListItemText primary="Abc" />
                </ListItem>
                <ListItem button onClick={() => navigateTo('users')}>
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