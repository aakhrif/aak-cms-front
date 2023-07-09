import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../provider/AuthProvider';
import Home from '../pages/HomePage';

function PublicRoute() {
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
