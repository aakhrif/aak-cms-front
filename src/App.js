import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ErrorPage from './components/ErrorPage';
import Dashboard from './components/Dashboard';
import { AuthProvider } from './provider/AuthProvider';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import Users from './pages/Users';

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
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
