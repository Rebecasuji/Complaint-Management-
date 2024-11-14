const express = require('express');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const User = require('./models/User'); 
const router = express.Router();

// Nodemailer setup (for sending reset link)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // your email
    pass: process.env.EMAIL_PASS, // your email password or app password
  },
});

// POST: /forgot-password
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour expiration
    await user.save();

    // Send reset email
    const resetUrl = `http://localhost:3000/reset-password/${resetToken}`; // Your frontend reset password URL
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Password Reset Request',
      text: `You requested a password reset. Please click on the link below to reset your password: \n\n ${resetUrl}`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        return res.status(500).json({ message: 'Error sending email' });
      }
      res.status(200).json({ message: 'Password reset email sent' });
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
