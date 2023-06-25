import express from 'express';
import dotenv from 'dotenv';
// Call dotenv immediately after the import (only needs to be done once, when the server starts), in order to load the environment variables to the process.env global object
dotenv.config();
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import productRoutes from './routes/productRoutes.js';

const port = process.env.PORT || 5000;

connectDB(); // Connect to MongoDB

const app = express();

// API root route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Use the productRoutes file for all requests to the /api/products endpoint
app.use('/api/products', productRoutes);

app.use(notFound); // Our custom 404 error handling middleware
app.use(errorHandler); // Our custom general error handling middleware

// API listening on "port"
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
