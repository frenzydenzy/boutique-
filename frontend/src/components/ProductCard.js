import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Chip } from '@mui/material';
import { useCart } from '../contexts/CartContext';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const { addToCart, loading } = useCart();

  const handleAddToCart = () => {
    addToCart(product._id);
  };

  return (
    <Card sx={{ maxWidth: 345, m: 2, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <Link to={`/product/${product._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <CardMedia
          component="img"
          height="200"
          image={product.images[0] || '/placeholder.jpg'}
          alt={product.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {product.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
            {product.description}
          </Typography>
          <Chip label={product.category} size="small" sx={{ mt: 1 }} />
        </CardContent>
      </Link>
      <CardContent>
        <Typography variant="h6" color="primary">
          ${product.price}
        </Typography>
        <Button variant="contained" sx={{ mt: 1 }} fullWidth onClick={handleAddToCart} disabled={loading}>
          {loading ? 'Adding...' : 'Add to Cart'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;