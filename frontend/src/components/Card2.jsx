import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function Card2({ product, onEdit, onDelete }) {
  const fallbackImg =
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80";
   
const sellerName = product.user?.name || "Unknown Seller";
  return (
    <Card
      sx={{
        width: '100%',
        maxWidth: 330,        
        minHeight: 360,         
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 3,
        overflow: 'hidden',
        boxShadow: '0 6px 16px rgba(0,0,0,0.08)',
      }}
    >
      <CardMedia
        component="img"        
        height="200"           
        image={product.image || fallbackImg}
        alt={product.text}
        sx={{
          objectFit: 'cover',   
          objectPosition: 'center',
        }}
      />

      <CardContent sx={{ pb: 1 }}>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{
            fontWeight: 700,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 1,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {product.text}
        </Typography>

        <Typography variant="body2" sx={{ fontWeight: 700 }}>
          ${product.price}{' '}
          <span style={{ color: '#757575', fontWeight: 400 }}>
            / item
          </span>
          <span style={{ margin: '0 8px', color: '#b0b0b0' }}>|</span>
          <span style={{ color: 'black', fontWeight: 700 }}>
            Quantity: {product.quantity ?? 0}
          </span>
        </Typography>
          <Typography variant="body2" sx={{ fontWeight: 700 }}>
            seller:
          <span style={{ color: 'black', fontWeight: 400 ,margin: '0 8px'}}>
            {sellerName}
          </span>
          </Typography>
      </CardContent>
         
   
      <CardActions sx={{  px: 2, pb: 2 }}>
        <Button size="small" onClick={() => onEdit(product._id)}  sx={{ color: 'black', fontWeight: 700, minWidth: 'auto', mr: 2 }}>
          edit
        </Button>
        <Button size="small" onClick={() => onDelete(product._id)}  sx={{ color: '#D50000', fontWeight: 700, minWidth: 'auto' }}>
          delete
        </Button>
      </CardActions>
    </Card>
  );
}
