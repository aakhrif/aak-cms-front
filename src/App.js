import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage';
import Dashboard from './pages/Dashboard';
import { AuthProvider } from './provider/AuthProvider';
import PrivateRoute from './routing/PrivateRoute';
import PublicRoute from './routing/PublicRoute';
import Users from './pages/Users';
import Contents from './pages/Contents';

function App() {

  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<PublicRoute />} />
            {/* The next line is very important for the Navigate component to work */}
            <Route path="/error-page" element={<ErrorPage />} />
            <Route path="/dashboard" element={<PrivateRoute component={Dashboard} />} />
            <Route path="/dashboard/users" element={<PrivateRoute component={Users} />} />
            <Route path="/dashboard/contents" element={<PrivateRoute component={Contents} />} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
