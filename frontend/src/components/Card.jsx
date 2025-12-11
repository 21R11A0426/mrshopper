import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  CardActions,
  Stack,
  Divider,
} from '@mui/material';

const ProductCard = ({ product, onEdit, onDelete }) => {
  const fallbackImg =
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80";
  
  return (
    <Card
      elevation={0}
      sx={{
        width: '100%',              
        height: '100%',             
        minHeight: 360,             
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '16px',
        boxShadow: '0 6px 18px rgba(0,0,0,0.08)',
        overflow: 'hidden',
        transition: 'transform 0.2s ease',
        '&:hover': { transform: 'translateY(-4px)' },
      }}
    >
 
      <Box sx={{ height: 220, width: '100%', overflow: 'hidden' }}>
        <CardMedia
          component="img"
          image={product.image || fallbackImg}
          alt={product.name}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',       
            objectPosition: 'center',
          }}
        />
      </Box>

      <CardContent sx={{ px: 2, pt: 2, pb: 1 }}>
        <Stack spacing={0.8}>

          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 700,
              fontSize: '1.05rem',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 1,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {product.name}
          </Typography>

   
          <Typography
            variant="body1"
            sx={{ fontWeight: 'bold', fontSize: '1rem', color: '#1a1a1a' }}
          >
            ${product.price}{' '}
            <span style={{ color: '#757575', fontWeight: 400, fontSize: '0.9rem' }}>
              / item
            </span>
            <span style={{ margin: '0 8px', color: '#b0b0b0' }}>|</span>
            <span style={{ color: '#757575', fontWeight: 400, fontSize: '0.9rem' }}>
              Quantity: {product.quantity ?? 0}
            </span>
          </Typography>


          {product.description ? (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                fontSize: '0.85rem',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {product.description}
            </Typography>
          ) : null}
        </Stack>
      </CardContent>

      <Box sx={{ px: 2 }}>
        <Divider />
      </Box>

      <CardActions sx={{ px: 2, pb: 2, pt: 1, mt: 'auto' }}>
        <Button
          size="small"
          onClick={() => onEdit(product._id)}
          sx={{ color: 'black', fontWeight: 700, minWidth: 'auto', mr: 2 }}
        >
          EDIT
        </Button>
        <Button
          size="small"
          onClick={() => onDelete(product._id)}
          sx={{ color: '#D50000', fontWeight: 700, minWidth: 'auto' }}
        >
          DELETE
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
