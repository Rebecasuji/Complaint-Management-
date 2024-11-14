// routes/complaint.js
const express = require('express');
const router = express.Router();
const Complaint = require('../models/Complaint');
const auth = require('../middleware/auth');  // Middleware to check for authentication

// Submit Complaint (for students and teachers)
router.post('/submit', auth, async (req, res) => {
  const { title, description } = req.body;

  try {
    const newComplaint = new Complaint({
      title,
      description,
      submittedBy: req.user.id,  // Get the user ID from the JWT token
    });

    await newComplaint.save();
    res.status(201).json({ msg: 'Complaint submitted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// View Complaints (for admins)
router.get('/view', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Access denied' });
    }

    const complaints = await Complaint.find().populate('submittedBy', ['name', 'email']);
    res.json(complaints);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
