import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Grid, Paper, Alert } from '@mui/material';
import api from '../services/api';

const Booking = () => {
  const [date, setDate] = useState('');
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedTime, setSelectedTime] = useState('');
  const [type, setType] = useState('store_visit');
  const [notes, setNotes] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (date) {
      fetchAvailableSlots();
    }
  }, [date]);

  const fetchAvailableSlots = async () => {
    try {
      const response = await api.get('/slots/available', { params: { date } });
      setAvailableSlots(response.data.availableSlots);
    } catch (error) {
      console.error('Error fetching slots:', error);
    }
  };

  const handleBook = async () => {
    try {
      const response = await api.post('/slots', {
        date,
        time: selectedTime,
        type,
        notes,
      });
      setMessage('Slot booked successfully!');
      setSelectedTime('');
      setNotes('');
      fetchAvailableSlots(); // Refresh available slots
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error booking slot');
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h3" gutterBottom>
        Book an Appointment
      </Typography>

      {message && <Alert severity={message.includes('success') ? 'success' : 'error'} sx={{ mb: 2 }}>{message}</Alert>}

      <Paper sx={{ p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              type="date"
              label="Select Date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              select
              fullWidth
              label="Appointment Type"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="store_visit">Store Visit</option>
              <option value="consultation">Consultation</option>
              <option value="call_booking">Video Call Booking</option>
            </TextField>
          </Grid>
        </Grid>

        {date && (
          <div>
            <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
              Available Time Slots:
            </Typography>
            <Grid container spacing={1}>
              {availableSlots.map((slot) => (
                <Grid item key={slot}>
                  <Button
                    variant={selectedTime === slot ? 'contained' : 'outlined'}
                    onClick={() => setSelectedTime(slot)}
                  >
                    {slot}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </div>
        )}

        {selectedTime && (
          <div>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Notes (Optional)"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              sx={{ mt: 3 }}
            />
            <Button
              variant="contained"
              onClick={handleBook}
              sx={{ mt: 2 }}
            >
              Book Slot
            </Button>
          </div>
        )}
      </Paper>
    </Container>
  );
};

export default Booking;