const Slot = require("../models/Slot");

// 🔹 Get Available Slots for a date
exports.getAvailableSlots = async (req, res) => {
  try {
    const { date } = req.query;

    // Define available time slots (e.g., 9:00 to 17:00, every hour)
    const allSlots = [
      "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"
    ];

    // Find booked slots for the date
    const bookedSlots = await Slot.find({
      date: new Date(date),
      status: { $ne: 'cancelled' }
    }).select('time');

    const bookedTimes = bookedSlots.map(slot => slot.time);

    // Filter available slots
    const availableSlots = allSlots.filter(slot => !bookedTimes.includes(slot));

    res.json({ availableSlots });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// 🔹 Book a Slot
exports.bookSlot = async (req, res) => {
  try {
    const { date, time, type, notes } = req.body;
    const userId = req.user.id;

    // Check if slot is available
    const existingSlot = await Slot.findOne({
      date: new Date(date),
      time,
      status: { $ne: 'cancelled' }
    });

    if (existingSlot) {
      return res.status(400).json({ message: "Slot is already booked" });
    }

    const slot = await Slot.create({
      userId,
      date: new Date(date),
      time,
      type,
      notes,
    });

    res.status(201).json({
      message: "Slot booked successfully",
      slot,
    });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: "Slot is already booked" });
    } else {
      res.status(500).json({ message: "Server error" });
    }
  }
};

// 🔹 Get User's Bookings
exports.getUserBookings = async (req, res) => {
  try {
    const userId = req.user.id;

    const bookings = await Slot.find({ userId }).sort({ date: 1, time: 1 });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// 🔹 Update Booking Status (Admin)
exports.updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const slot = await Slot.findById(req.params.id);

    if (!slot) {
      return res.status(404).json({ message: "Booking not found" });
    }

    slot.status = status;
    await slot.save();

    res.json({
      message: "Booking status updated",
      slot,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// 🔹 Cancel Booking (User)
exports.cancelBooking = async (req, res) => {
  try {
    const userId = req.user.id;

    const slot = await Slot.findById(req.params.id);

    if (!slot) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (slot.userId.toString() !== userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    slot.status = 'cancelled';
    await slot.save();

    res.json({ message: "Booking cancelled" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// 🔹 Get All Bookings (Admin)
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Slot.find().populate('userId', 'name email').sort({ date: 1, time: 1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};