import React, { useState } from 'react';
import { Container, Box, Typography, TextField, Button, Paper, InputAdornment } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createProduct } from '../lib/api'; 
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import toast from 'react-hot-toast';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const New = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    text: '',
    price: '',

    image: '',
    quantity: '',
  });

  const mutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      toast.success('Product created successfully!');
      queryClient.invalidateQueries(['products']);
      navigate('/');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to create product');
    },
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   
    if (!formData.text || !formData.price) {
      toast.error("Name and Price are required");
      return;
    }
    mutation.mutate(formData);
  };


  const textFieldStyle = {
    '& label.Mui-focused': { color: '#D50000' },
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': { borderColor: 'black' },
      '&.Mui-focused fieldset': { borderColor: '#D50000' },
    },
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f9f9f9' }}>
      <Navbar />
      
      <Container maxWidth="sm" sx={{ py: 6 }}>
        <Paper elevation={0} sx={{ p: 4, borderRadius: '16px', border: '1px solid #e0e0e0' }}>
          <Typography variant="h5" component="h1" sx={{ fontWeight: 'bold', mb: 1 }}>
            Add New Product
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
            Fill in the details to list a new item for sale.
          </Typography>

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Product Name"
              name="text"
              value={formData.name}
              onChange={handleChange}
              margin="normal"
              required
              sx={textFieldStyle}
            />

            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                fullWidth
                label="Price"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                margin="normal"
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AttachMoneyIcon sx={{ fontSize: 20 }} />
                    </InputAdornment>
                  ),
                }}
                sx={textFieldStyle}
              />
              <TextField
                fullWidth
                label="Quantity"
                name="quantity"
                type="number"
                value={formData.quantity}
                onChange={handleChange}
                margin="normal"
                sx={textFieldStyle}
              />
            </Box>

            <TextField
              fullWidth
              label="Image URL"
              name="image"
              value={formData.image}
              onChange={handleChange}
              margin="normal"
              placeholder="https://example.com/image.jpg"
              sx={textFieldStyle}
            />

           

            <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => navigate('/')}
                sx={{
                  color: 'black',
                  borderColor: '#e0e0e0',
                  '&:hover': { borderColor: 'black', bgcolor: 'transparent' }
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={mutation.isPending}
                sx={{
                  bgcolor: '#D50000',
                  color: 'white',
                  fontWeight: 'bold',
                  '&:hover': { bgcolor: 'black' }
                }}
              >
                {mutation.isPending ? 'Creating...' : 'Create Product'}
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default New;