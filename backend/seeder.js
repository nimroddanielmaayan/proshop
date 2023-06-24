/* This is a completly standalone file. It will be used as a script, to "seed" data into the database */

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import users from './data/users.js';
import products from './data/products.js';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';
import connectDB from './config/db.js';

dotenv.config(); // This allows us to use the .env file

connectDB();

const importData = async () => {
  try {
    // Clear the database by calling a deleteMany() method on each model
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    // Insert the users
    const createdUsers = await User.insertMany(users);

    // Get the admin user
    const adminUser = createdUsers[0]._id;

    // Add the admin user to the products
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    // Insert the products
    await Product.insertMany(sampleProducts);

    // The .green.inverse/.red.inverse part is done using the colors package
    console.log('Data Imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1); // Exit with failure
  }
};

const destroyData = async () => {
  try {
    // Clear the database by calling a deleteMany() method on each model
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    // The .green.inverse/.red.inverse part is done using the colors package
    console.log('Data Destroyed!'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1); // Exit with failure
  }
};

// Check if the argument passed to the script is '-d' (destroy)
// To run importData: node backend/seeder
// To run destroyData: node backend/seeder -d
// The process.argv property returns an array containing the command line arguments passed when the Node.js process was launched. This process.argv array is part of the Node global object, and it's available for any Node.js process (such as a script executed by node, like in this case)
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
