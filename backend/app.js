/** @format */

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors());

// Importing routes
const usersRouter = require('./routes/users');
const announcementsRouter = require('./routes/announcements');
const productsRouter = require('./routes/products');

// Route used to test to see if the backend actually exists
app.get('/', (req, res) => {
  res.send('Welcome!');
});

// Using routes
app.use('/users', usersRouter);
app.use('/announcements', announcementsRouter);
app.use('/products', productsRouter);

module.exports = app; // Export the app for testing
