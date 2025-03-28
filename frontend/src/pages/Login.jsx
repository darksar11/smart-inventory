import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  TextField, 
  Typography, 
  Container, 
  Paper 
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Adjust the import path as needed

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = () => {
    // Perform login logic here
    // For now, we'll just simulate a successful login
    login(); // Set authentication to true
    navigate('/dashboard'); // Redirect to dashboard after login
  };

  const handleDirectInventoryAccess = () => {
    // Optional: Direct navigation to inventory (for testing)
    login(); // Simulate authentication
    navigate('/inventory');
  };

  return (
    <Container maxWidth="xs">
      <Paper 
        elevation={3} 
        sx={{ 
          marginTop: 8, 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          padding: 3 
        }}
      >
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box component="form" sx={{ width: '100%', mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleLogin}
          >
            Login
          </Button>
          <Button
            fullWidth
            variant="outlined"
            color="secondary"
            onClick={handleDirectInventoryAccess}
          >
            Direct Inventory Access (Test)
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;