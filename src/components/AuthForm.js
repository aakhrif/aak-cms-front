import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
import React, { useState, useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';

const AuthForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSignup = async () => {
    try {
      await signup(username, password);
      navigate('/dashboard');
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  const handleLogin = async () => {
    try {
      await login(username, password);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <Box sx={{ maxWidth: 300, margin: '0 auto' }}>
      <TextField
        label="Username"
        value={username}
        onChange={handleUsernameChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={handlePasswordChange}
        fullWidth
        margin="normal"
        onKeyDown={handleKeyDown}
      />
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Button variant="contained" onClick={handleLogin} fullWidth>
            Login
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button variant="contained" onClick={handleSignup} fullWidth>
            Signup
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AuthForm;
