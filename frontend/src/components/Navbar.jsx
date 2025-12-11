import React from 'react';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { AppBar, Toolbar, Typography, Button, Box, CircularProgress } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import useAuthUser from '../hooks/useAuthUser'; 
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { logout } from '../lib/api';

const Navbar = () => {
  const { authUser, isloading } = useAuthUser();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.setQueryData(['authUser'], null);
      navigate('/');
    },
    onError: (err) => {
      console.error("Logout failed", err);
    }
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const navButtonStyle = {
    color: 'white',
    fontWeight: 500,
    textTransform: 'none', 
    fontSize: '1rem',
    mx: 1,
    '&:hover': {
      color: 'black',
    }
  };

  return (
    <AppBar position="sticky" sx={{ mb: 4, backgroundColor: '#D50000', color: 'white', boxShadow: 'none' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Logo Section */}
        <Typography 
          variant="h5" 
          component={Link} 
          to="/" 
          sx={{ 
            textDecoration: 'none', 
            color: 'white', 
            fontWeight: 'bold', 
            display: 'flex', 
            alignItems: 'center',
            '&:hover': { color: 'black' } 
          }}
        >
          <AddShoppingCartIcon sx={{ mr: 1 }} /> Mr.Shopper
        </Typography>

        {/* Links Section */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {isloading ? (
            <CircularProgress color="inherit" size={20} />
          ) : authUser ? (
            // LOGGED IN VIEW
            <>
              <Button component={Link} to="/feed" sx={navButtonStyle}>
                My Products
              </Button>
              
          
              <Button 
                component={Link} 
                to="/new" 
                sx={navButtonStyle}
                startIcon={<AddCircleOutlineIcon />}
              >
                Add Product
              </Button>

              <Button 
                onClick={handleLogout} 
                disabled={logoutMutation.isPending}
                sx={{ 
                  ml: 2, 
                  color: 'white', 
                  border: '1px solid white',
                  fontWeight: 'bold',
                  '&:hover': {
                    backgroundColor: 'black',
                    color: 'white',
                    borderColor: 'black'
                  }
                }}
              >
                {logoutMutation.isPending ? 'Logging out...' : 'Logout'}
              </Button>
            </>
          ) : (
            // LOGGED OUT VIEW
            <>
             
              <Button component={Link} to="/login" sx={navButtonStyle}>
                Login
              </Button>
              <Button 
                component={Link} 
                to="/register" 
                sx={{ 
                  ml: 1, 
                  backgroundColor: 'white', 
                  color: '#D50000',
                  fontWeight: 'bold',
                  '&:hover': { 
                    backgroundColor: 'black',
                    color: 'white' 
                  } 
                }}
              >
                Register
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;