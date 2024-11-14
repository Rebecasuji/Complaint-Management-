const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../models/User'); // Adjust path based on your project structure

// @route   POST /api/auth/register
// @desc    Register user
// @access  Public
router.post(
  '/register',
  [
    // Validate input data
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be 6 or more characters').isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      // Check if the user already exists
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }

      // Create a new user instance
      user = new User({
        name,
        email,
        password
      });

      // Hash the password before saving
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save(); // Save the user to the database

      // Return a JWT token
      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET, // Make sure to store this secret in your environment variables
        { expiresIn: '1h' },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
