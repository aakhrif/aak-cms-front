import React, { useState } from 'react';
import SideBar from './SideBar';
import { Header } from './Header';

export const Layout = ({ children }) => {
    const [open, setOpen] = useState(false);

    const handleToggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <div>
            <Header handleToggleDrawer={handleToggleDrawer} />
            <div className="content-wrapper" style={{ display: 'flex' }}>
                <SideBar open={open} handleToggleDrawer={handleToggleDrawer} />
                <div className="content">{children}</div>
            </div>
        </div>
    );
};