import express from 'express';
import dotenv from 'dotenv';
// Call dotenv immediately after the import (only needs to be done once, when the server starts), in order to load the environment variables to the process.env global object
dotenv.config();
import connectDB from './config/db.js';
import products from './data/products.js';
import productRoutes from './routes/productRoutes.js';

const port = process.env.PORT || 5000;

connectDB(); // Connect to MongoDB

const app = express();

app.get('/', (req, res) => {
  res.send('API is running...');
});

// Use the productRoutes file for all requests to the /api/products endpoint
app.use('/api/products', productRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
