import React, { useState } from 'react';
import { Container, Grid, Typography, Paper, TextField, Button, Alert } from '@mui/material';
import api from '../services/api';

const Auth = () => {
  const [mode, setMode] = useState('login');
  const [credentials, setCredentials] = useState({ name: '', email: '', password: '', gender: 'other' });
  const [message, setMessage] = useState(null);

  const handleChange = (e) => setCredentials({ ...credentials, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let resp;
      if (mode === 'login') {
        resp = await api.post('/users/login', {email: credentials.email, password: credentials.password});
      } else {
        resp = await api.post('/users/register', credentials);
      }
      localStorage.setItem('token', resp.data.token);
      localStorage.setItem('user', JSON.stringify(resp.data.user));
      setMessage({ type: 'success', text: 'Authentication successful! Reload page to continue.' });
    } catch (err) {
      setMessage({type:'error',text: err.response?.data?.message || 'Auth failed'});
    }
  };

  return (
    <Container sx={{ py: 5 }}>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom>{mode === 'login' ? 'Login' : 'Register'}</Typography>
            {message && <Alert severity={message.type} sx={{ mb: 2 }}>{message.text}</Alert>}
            <form onSubmit={handleSubmit}>
              {mode === 'register' && (
                <TextField name="name" label="Name" value={credentials.name} onChange={handleChange} fullWidth sx={{ mb: 2 }} required />
              )}
              <TextField name="email" label="Email" value={credentials.email} onChange={handleChange} fullWidth sx={{ mb: 2 }} required />
              <TextField name="password" label="Password" type="password" value={credentials.password} onChange={handleChange} fullWidth sx={{ mb: 2 }} required />
              {mode === 'register' && (
                <TextField name="gender" label="Gender" value={credentials.gender} onChange={handleChange} fullWidth sx={{ mb: 2 }} />
              )}
              <Button variant="contained" type="submit" fullWidth sx={{ mb: 1 }}>
                {mode === 'login' ? 'Login' : 'Register'}
              </Button>
            </form>
            <Button fullWidth onClick={() => setMode(mode === 'login' ? 'register' : 'login')}>
              {mode === 'login' ? 'Create a new account' : 'Already have an account? Login'}
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Auth;