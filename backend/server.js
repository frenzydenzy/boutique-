const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const discountRoutes = require("./routes/discountRoutes");
const slotRoutes = require("./routes/slotRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const setupSwagger = require("./docs/swagger");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/discounts", discountRoutes);
app.use("/api/slots", slotRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);


// Test Route
app.get("/", (req, res) => {
  res.send("Boutique Backend is Running ??");
});

// Start Server
const PORT = process.env.PORT || 5000;

// Swagger docs
setupSwagger(app);

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
