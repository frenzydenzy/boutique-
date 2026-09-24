const mongoose = require("mongoose");

const slotSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String, // e.g., "10:00"
      required: true,
    },
    status: {
      type: String,
      enum: ['booked', 'confirmed', 'cancelled'],
      default: 'booked',
    },
    type: {
      type: String,
      enum: ['store_visit', 'consultation', 'call_booking'],
      required: true,
    },
    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index to prevent double booking
slotSchema.index({ date: 1, time: 1 }, { unique: true });

module.exports = mongoose.model("Slot", slotSchema);