/** @format */

const mongoose = require('mongoose');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Acquiring the Mongoose connection string from the environment variables
const URI = process.env.URI;

// Connecting to MongoDB
mongoose.connect(URI);

// This function checks a user's credentials when signing in/up
const checkCredentials = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    // Validating input
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: 'Please enter both username and password' });
    }

    // Finding the user by username and password
    const user = await User.findOne({ username, password });

    // Checking if the user exists
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Checking if the user is an admin
    const isAdmin = user.role === 'admin';

    // Generating the token
    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' } // Token expiry time
    );

    // Responding with success, include token and admin status
    res.json({ message: 'Sign-in successful', token, isAdmin });
  } catch (error) {
    console.error('Sign-in error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// New function to handle user signup
const signupUser = async (req, res) => {
  const { username, password, role } = req.body;

  try {
    // Validating input
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: 'Please enter both username and password' });
    }

    // Checking if the user already exists
    const existingUser = await User.findOne({ username, password });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already taken' });
    }

    // Creating a new user if they don't exist
    const newUser = new User({
      username,
      password,
      role: username.endsWith('@admin.com') ? 'admin' : 'user',
    });

    // Saving the user to the database
    await newUser.save();

    // Generating JWT token
    const token = jwt.sign(
      {
        id: newUser._id,
        username: newUser.username,
        role: newUser.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Responding with success, include token
    res.status(201).json({ message: 'Signup successful', token });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { checkCredentials, signupUser };
