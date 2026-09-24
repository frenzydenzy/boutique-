import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Card, CardContent, Button } from '@mui/material';
import api from '../services/api';

const Home = () => {
  const [stats, setStats] = useState({ products: 0, reviews: 0, bookings: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const productsResp = await api.get('/products');
        const reviewsResp = await api.get('/reviews');
        setStats({ products: productsResp.data.totalProducts || productsResp.data.length, reviews: reviewsResp.data.length || 0, bookings: 0 });
      } catch (err) {
        console.warn('Stats load failed', err);
      }
    };
    fetchStats();
  }, []);

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h2" component="h1" gutterBottom>
        Welcome to Boutique
      </Typography>
      <Typography variant="h6" color="text.secondary" paragraph>
        Luxury design, dynamic experiences, and personal styling all in one place.
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h5">Catalog</Typography>
              <Typography>Browse premium designer collections.</Typography>
              <Button sx={{ mt: 2 }} variant="contained" href="/catalog">Explore</Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h5">Book Design Consultations</Typography>
              <Typography>Reserve in-person and video call slots.</Typography>
              <Button sx={{ mt: 2 }} variant="contained" href="/booking">Book Now</Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h5">Seasonal Offers</Typography>
              <Typography>Apply coupon codes at checkout.</Typography>
              <Button sx={{ mt: 2 }} variant="contained" href="/cart">Shop Deals</Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Typography variant="h4" gutterBottom>Our Impact</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}><Card><CardContent><Typography variant="h5">{stats.products}</Typography><Typography>Products</Typography></CardContent></Card></Grid>
        <Grid item xs={12} md={4}><Card><CardContent><Typography variant="h5">{stats.reviews}</Typography><Typography>Reviews</Typography></CardContent></Card></Grid>
        <Grid item xs={12} md={4}><Card><CardContent><Typography variant="h5">{stats.bookings}</Typography><Typography>Appointments</Typography></CardContent></Card></Grid>
      </Grid>
    </Container>
  );
};

export default Home;