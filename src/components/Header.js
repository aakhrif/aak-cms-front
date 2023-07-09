import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from '@mui/material';

export const Header = ({ handleToggleDrawer }) => {
    const handleClick = () => {
        handleToggleDrawer();
    };

    return (
        <div style={{ height: '80px', width: '100%', backgroundColor: 'lightblue', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <IconButton
                color="inherit"
                aria-label="menu"
                onClick={handleClick}
                edge="start"
                sx={{ position: 'absolute', left: '0', top: '0', m: 2 }}
            >
                <MenuIcon />
            </IconButton>
            <h1 style={{ color: 'black' }}>Welcome to the Dashboard!</h1>
        </div>
    );
};
