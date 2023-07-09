import React from 'react';
import { Navigate, useLocation, Outlet, Redirect } from 'react-router-dom';
import { useAuth } from '../provider/AuthProvider';
import Dashboard from './Dashboard';
import { Layout } from './Layout';

const PrivateRoute = ({ component: Component }) => {
  const { isLoggedIn, token } = useAuth();
  const location = useLocation();
  // console.log('wakwak ', token)
  if (!token) {
    return <Navigate to={{
      pathname: '/',
      state: { from: location },
    }} />
  }
  return <Layout><Component /></Layout>
}

export default PrivateRoute;
