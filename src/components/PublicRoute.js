import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../provider/AuthProvider';
import Home from '../components/HomePage';

function PublicRoute({ children }) {
    let { token } = useAuth();
    let location = useLocation();

    return token ? (
        <Navigate
            to={{
                pathname: '/dashboard',
                state: { from: location },
            }}
        />
    ) : (
        <Home />
    );
}

export default PublicRoute;
