import React, { useState } from 'react';
import { Container, Box, Typography, TextField, Button, Alert, Paper } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { register } from '../lib/api';
import { useNavigate, Link } from 'react-router-dom';

const COLORS = {
  primaryRed: '#D50000',
  black: '#000000',
  white: '#FFFFFF',
  hoverBlack: '#1a1a1a'
};

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [errorMsg, setErrorMsg] = useState('');

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: register,
    onSuccess: () => {
      navigate('/login');
    },
    onError: (error) => {
      const message = error.response?.data?.message || "Registration failed";
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
          Sign Up
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
            label="name"
            name="name"
            autoFocus
            value={formData.name}
            onChange={handleChange}
            sx={textFieldStyle}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email Address"
            name="email"
            type="email"
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
            {mutation.isPending ? 'Registering...' : 'Register'}
          </Button>

          <Box sx={{ textAlign: 'center' }}>
            <Link to="/login" style={{ textDecoration: 'none', color: COLORS.primaryRed, fontWeight: '500' }}>
              {"Already have an account? Login"}
            </Link>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Register;