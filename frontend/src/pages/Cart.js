import React, { useState } from 'react';
import { Container, Typography, List, ListItem, ListItemText, Button, TextField, Grid, Paper, Divider } from '@mui/material';
import { useCart } from '../contexts/CartContext';
import api from '../services/api';

const Cart = () => {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const [discountCode, setDiscountCode] = useState('');
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  });

  const handleQuantityChange = (productId, quantity) => {
    if (quantity > 0) {
      updateQuantity(productId, quantity);
    }
  };

  const handleCheckout = async () => {
    try {
      const response = await api.post('/orders', {
        address,
        discountCode: discountCode || undefined,
      });
      alert('Order placed successfully!');
      // Refresh cart or redirect
    } catch (error) {
      alert('Error placing order: ' + error.response?.data?.message);
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h3" gutterBottom>
        Shopping Cart
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <List>
            {cart.items.map((item) => (
              <ListItem key={item.productId._id} divider>
                <ListItemText
                  primary={item.productId.title}
                  secondary={`$${item.price} x ${item.quantity} = $${item.price * item.quantity}`}
                />
                <TextField
                  type="number"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item.productId._id, parseInt(e.target.value))}
                  inputProps={{ min: 1 }}
                  sx={{ width: 80, mr: 2 }}
                />
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => removeFromCart(item.productId._id)}
                >
                  Remove
                </Button>
              </ListItem>
            ))}
          </List>
          {cart.items.length === 0 && <Typography>No items in cart</Typography>}
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6">Order Summary</Typography>
            <Typography>Total: ${cart.total}</Typography>
            <Divider sx={{ my: 2 }} />

            <TextField
              fullWidth
              label="Discount Code"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
              sx={{ mb: 2 }}
            />

            <Typography variant="h6" sx={{ mb: 2 }}>Shipping Address</Typography>
            <TextField
              fullWidth
              label="Street"
              value={address.street}
              onChange={(e) => setAddress({ ...address, street: e.target.value })}
              sx={{ mb: 1 }}
            />
            <TextField
              fullWidth
              label="City"
              value={address.city}
              onChange={(e) => setAddress({ ...address, city: e.target.value })}
              sx={{ mb: 1 }}
            />
            <TextField
              fullWidth
              label="State"
              value={address.state}
              onChange={(e) => setAddress({ ...address, state: e.target.value })}
              sx={{ mb: 1 }}
            />
            <TextField
              fullWidth
              label="Zip Code"
              value={address.zipCode}
              onChange={(e) => setAddress({ ...address, zipCode: e.target.value })}
              sx={{ mb: 1 }}
            />
            <TextField
              fullWidth
              label="Country"
              value={address.country}
              onChange={(e) => setAddress({ ...address, country: e.target.value })}
              sx={{ mb: 2 }}
            />

            <Button
              variant="contained"
              fullWidth
              onClick={handleCheckout}
              disabled={cart.items.length === 0}
            >
              Place Order
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Cart;