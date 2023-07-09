import React, { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from '@mui/material';

export const Header = ({ handleToggleDrawer }) => {
    const handleClick = () => {
        handleToggleDrawer();
    };

    return (<IconButton
        color="inherit"
        aria-label="menu"
        onClick={handleClick}
        edge="start"
        sx={{ mr: 2 }}
    >
        <MenuIcon />
        <h1 style={{ color: 'black' }}>Welcome to the Dashboard!</h1>
    </IconButton>);
}