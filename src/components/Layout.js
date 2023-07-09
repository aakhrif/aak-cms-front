import React, { useState } from 'react'
import SideBar from './SideBar';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from '@mui/material';
import { Header } from './Header';

export const Layout = ({ children }) => {
    const [open, setOpen] = useState(false);

    const handleToggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <div>
            <Header handleToggleDrawer={handleToggleDrawer} />
            <div style={{ display: 'flex' }}>

                <SideBar open={open} handleToggleDrawer={handleToggleDrawer} />
                <div style={{ flex: 1 }}>{children}</div>
            </div>
        </div>
    )
}