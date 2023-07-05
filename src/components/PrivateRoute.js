import React from 'react';
import { Route, Navigate, useLocation, Routes, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ path, element }) => {
  const { isLoggedIn } = useAuth();
  const location = useLocation();
  console.log('isLoggedIn ', isLoggedIn)
  console.log('path ', path)
  console.log('element ', element)
  return isLoggedIn ? (
    // <Navigate to={element} replace state={{ from: location }} />
    <Outlet />
  ) : (
    <Navigate to="/" replace state={{ from: location }} />
  );
};

export default PrivateRoute;
