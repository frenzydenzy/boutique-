import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Grid, Typography, Button, Chip } from '@mui/material';
import api from '../services/api';
import { useCart } from '../contexts/CartContext';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const resp = await api.get(`/products/${id}`);
        setProduct(resp.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <Typography>Loading product...</Typography>;
  if (!product) return <Typography>Product not found.</Typography>;

  return (
    <Container sx={{ py: 4 }}>
      <Button onClick={() => navigate(-1)}>← Back</Button>
      <Grid container spacing={4} sx={{ mt: 2 }}>
        <Grid item xs={12} md={6}> <img src={product.images[0] || '/placeholder.jpg'} alt={product.title} style={{ width: '100%', borderRadius: 8 }} /> </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h3">{product.title}</Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom>{product.category} • {product.internalCategory}</Typography>
          <Typography variant="h4" sx={{ mt: 1 }}>${product.price}</Typography>
          <Typography sx={{ mt: 2 }}>{product.description}</Typography>
          <Chip label={`Designer: ${product.designer}`} sx={{ mt: 2 }} />
          <Button variant="contained" sx={{ mt: 3 }} onClick={() => addToCart(product._id)}>Add to Cart</Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetails;