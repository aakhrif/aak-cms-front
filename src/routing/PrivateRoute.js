import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../provider/AuthProvider';
import { Layout } from '../components/Layout';

const PrivateRoute = ({ component: Component }) => {
  const { token } = useAuth();
  const location = useLocation();

  if (!token) {
    return <Navigate to={{
      pathname: '/',
      state: { from: location },
    }} />
  }
  return <Layout><Component /></Layout>
}

export default PrivateRoute;
