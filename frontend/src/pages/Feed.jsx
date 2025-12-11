import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getProducts, deleteProduct } from '../lib/api';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Card2 from '../components/Card2';
import toast from 'react-hot-toast';
import { AlertTriangle } from 'lucide-react';
import useAuthUser from '../hooks/useAuthUser';

const Feed = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { authUser } = useAuthUser();


  const { data: products, isLoading, isError } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  });

 
  const myProducts = products?.data?.filter(product => {

    const ownerId = product.user?._id || product.user;
    return authUser?._id && ownerId === authUser._id;
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      toast.success('Product deleted successfully');
      queryClient.invalidateQueries(['products']);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to delete product');
    }
  });

  const confirmDelete = (id, toastId) => {
    toast.dismiss(toastId);
    deleteMutation.mutate(id);
  };

  const handleDelete = (id) => {
    const productToDelete = products?.data?.find(p => p._id === id);
    const productName = productToDelete ? (productToDelete.name || productToDelete.text || 'this product') : 'this product';

    toast((t) => (
      <div className="flex flex-col w-full max-w-xs">
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 p-2 bg-red-50 rounded-full text-red-600 flex items-center justify-center shrink-0">
            <AlertTriangle size={20} />
          </div>
          <div className="flex-1 pt-1">
            <h3 className="text-gray-900 font-semibold text-sm">Delete Product?</h3>
            <p className="text-gray-500 text-xs mt-1 leading-relaxed">
              Are you sure you want to delete <b>{productName}</b>? This action cannot be undone.
            </p>
          </div>
        </div>

        <div className="flex gap-3 mt-4">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="flex-1 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={() => confirmDelete(id, t.id)}
            className="flex-1 px-3 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1"
          >
            Delete
          </button>
        </div>
      </div>
    ), {
      duration: Infinity,
      position: 'top-center',
      style: {
        background: '#fff',
        color: '#333',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        padding: '20px',
        borderRadius: '16px',
        border: '1px solid #f3f4f6',
        fontFamily: 'inherit',
        minWidth: '340px',
      },
    });
  };

  const handleEdit = (id) => {
    navigate(`/${id}`);
  };

  if (isLoading) return (
    <>
      <Navbar />
      <Container sx={{ mt: 4 }}>
        <Typography>Loading products...</Typography>
      </Container>
    </>
  );

  if (isError) return (
    <>
      <Navbar />
      <Container sx={{ mt: 4 }}>
        <Typography color="error">Error loading products.</Typography>
      </Container>
    </>
  );

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'white' }}>
      <Navbar />

      <Container maxWidth={false} sx={{ mt: 4, mb: 5, px: { xs: 2, md: 8 } }}>
        
        
        <Box sx={{ mb: 4, borderBottom: '1px solid #eee', pb: 2 }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'black' }}>
            My <span style={{ color: '#D50000' }}>Products</span>
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage the products you are selling.
          </Typography>
        </Box>


        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 4,
            alignItems: 'stretch',
          }}
        >
          {myProducts?.map((product) => (
            <Box
              key={product._id}
              sx={{
                flex: '1 1 300px',  
                maxWidth: 350,      
                display: 'flex',     
              }}
            >
              <Card2
                product={product}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </Box>
          ))}
        </Box>

        {myProducts?.length === 0 && (
          <Box sx={{ textAlign: 'center', mt: 10 }}>
            <Typography variant="h6" color="text.secondary">
              You haven't listed any products yet.
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Feed;