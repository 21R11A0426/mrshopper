import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, TextField, Button, Paper, InputAdornment, CircularProgress } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getProduct, updateProduct } from '../lib/api'; 
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import toast from 'react-hot-toast';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import useAuthUser from '../hooks/useAuthUser'; 

const ProductEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { authUser } = useAuthUser(); 

  const [formData, setFormData] = useState({
    text: '', 
    price: '',
    image: '',
    quantity: '',
  });

  const { data: product, isLoading, isError } = useQuery({
    queryKey: ['product', id],
    queryFn: () => getProduct(id),
  });

  useEffect(() => {
    if (product?.data) {
      const p = product.data;
      setFormData({
        text: p.text || '', 
        price: p.price || '',
        image: p.image || '',
        quantity: p.quantity || '',
      });
    }
  }, [product]);

  const mutation = useMutation({
    mutationFn: (updatedData) => updateProduct(id, updatedData),
    onSuccess: () => {
      toast.success('Product updated successfully!');
      queryClient.invalidateQueries(['products']);
      queryClient.invalidateQueries(['product', id]);
      navigate('/');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to update product');
    },
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();



    const ownerId = product?.data?.user?._id || product?.data?.user;
    const currentUserId = authUser?._id;

    if (!currentUserId || ownerId !== currentUserId) {
      toast.error("You are not authorized to edit this product", {
        style: {
          background: '#fee2e2', 
          color: '#b91c1c',      
          fontWeight: '500',
          border: '1px solid #fecaca'
        },
        iconTheme: {
          primary: '#b91c1c',
          secondary: '#fee2e2',
        },
      });
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

  if (isLoading) return (
    <>
      <Navbar />
      <Container sx={{ mt: 10, textAlign: 'center' }}><CircularProgress sx={{ color: '#D50000' }} /></Container>
    </>
  );

  if (isError) return (
    <>
      <Navbar />
      <Container sx={{ mt: 10, textAlign: 'center' }}><Typography color="error">Product not found.</Typography></Container>
    </>
  );

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f9f9f9' }}>
      <Navbar />
      
      <Container maxWidth="sm" sx={{ py: 6 }}>
        <Paper elevation={0} sx={{ p: 4, borderRadius: '16px', border: '1px solid #e0e0e0' }}>
          <Typography variant="h5" component="h1" sx={{ fontWeight: 'bold', mb: 1 }}>
            Edit Product
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
            Update the details of your product.
          </Typography>

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Product Name"
              name="text"
              value={formData.text}
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
                type="text" 
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
                {mutation.isPending ? 'Saving...' : 'Save Changes'}
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default ProductEdit;