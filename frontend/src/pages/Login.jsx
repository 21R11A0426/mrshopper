import React, { useState } from 'react';
import { Container, Box, Typography, TextField, Button, Alert, Paper } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login } from '../lib/api';
import { useNavigate, Link } from 'react-router-dom';

const COLORS = {
  primaryRed: '#D50000',
  black: '#000000',
  white: '#FFFFFF',
  hoverBlack: '#1a1a1a'
};

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errorMsg, setErrorMsg] = useState('');

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: () => {
      queryClient.invalidateQueries(['authUser']);
      navigate('/');
    },
    onError: (error) => {
      const message = error.response?.data?.message || "Login failed";
      setErrorMsg(message);
    },
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    mutation.mutate(formData);
  };

  const textFieldStyle = {
    '& label.Mui-focused': {
      color: COLORS.primaryRed,
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: COLORS.primaryRed,
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'rgba(0, 0, 0, 0.23)',
      },
      '&:hover fieldset': {
        borderColor: COLORS.black,
      },
      '&.Mui-focused fieldset': {
        borderColor: COLORS.primaryRed,
      },
    },
  };

  return (
    <Container maxWidth="xs">
      <Paper 
        elevation={6} 
        sx={{ 
          padding: 4, 
          marginTop: 8, 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          backgroundColor: COLORS.white,
          borderTop: `4px solid ${COLORS.primaryRed}`
        }}
      >
        <Typography component="h1" variant="h5" sx={{ mb: 3, color: COLORS.black, fontWeight: 'bold' }}>
          Sign In
        </Typography>

        {errorMsg && (
          <Alert severity="error" sx={{ width: '100%', mb: 2, border: '1px solid red' }}>
            {errorMsg}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email"
            name="email"
            type="email"
            autoFocus
            value={formData.email}
            onChange={handleChange}
            sx={textFieldStyle}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            sx={textFieldStyle}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={mutation.isPending}
            sx={{
              mt: 3,
              mb: 2,
              bgcolor: COLORS.primaryRed,
              color: COLORS.white,
              fontWeight: 'bold',
              '&:hover': {
                bgcolor: COLORS.black,
              },
            }}
          >
            {mutation.isPending ? 'Signing in...' : 'Login'}
          </Button>

          <Box sx={{ textAlign: 'center' }}>
            <Link to="/register" style={{ textDecoration: 'none', color: COLORS.primaryRed, fontWeight: '500' }}>
              {"Don't have an account? Register"}
            </Link>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;