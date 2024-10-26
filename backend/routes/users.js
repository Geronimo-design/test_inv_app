/** @format */

const {
  checkCredentials,
  signupUser,
} = require('../controllers/userController');

const express = require('express');
const router = express.Router();
// Routing for users

// The route that handles user sign in
router.post('/signIn', async (req, res) => {
  checkCredentials(req, res);
});

// The route that handles user sign up
router.post('/signUp', async (req, res) => {
  signupUser(req, res);
});

module.exports = router;
