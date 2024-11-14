const Complaint = require('../models/Complaint');

// Submit a complaint
const submitComplaint = async (req, res) => {
  try {
    const { title, description } = req.body;
    const complaint = new Complaint({
      title,
      description,
      submittedBy: req.user._id,  // Assuming user authentication is in place
      status: 'pending',
      submittedAt: new Date(),
    });
    await complaint.save();
    res.status(201).json({ msg: 'Complaint submitted successfully', complaint });
  } catch (err) {
    res.status(500).json({ error: 'Error submitting complaint', details: err.message });
  }
};

// Get all complaints (Admin)
const getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find();
    res.status(200).json(complaints);
  } catch (err) {
    res.status(500).json({ error: 'Error retrieving complaints', details: err.message });
  }
};

module.exports = { submitComplaint, getAllComplaints };
