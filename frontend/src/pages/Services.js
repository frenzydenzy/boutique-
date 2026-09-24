import React from 'react';
import { Container, Typography, Grid, Paper, Box } from '@mui/material';

const data = [
  { title: 'Custom Design', desc: 'Tailored fashion recommendations based on your style profile.' },
  { title: 'Virtual Consultation', desc: 'Video calls to co-create your perfect look.' },
  { title: 'Premium Support', desc: 'Exclusive concierge to track your order and fit.' },
];

const Services = () => (
  <Container sx={{ py: 4 }}>
    <Typography variant="h3" gutterBottom>Services We Provide</Typography>
    <Grid container spacing={3}>
      {data.map((item) => (
        <Grid key={item.title} item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5">{item.title}</Typography>
            <Typography color="text.secondary">{item.desc}</Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>

    <Box sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>Specialisation</Typography>
      <Typography>We specialize in luxury wear, evening gowns, and wedding couture, matching your exact measurements and style preferences.</Typography>
    </Box>

    <Box sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>Why Customers Trust Us</Typography>
      <Typography>Verified designers, secure checkout, 24/7 support, and transparent shipping updates.</Typography>
    </Box>
  </Container>
);

export default Services;