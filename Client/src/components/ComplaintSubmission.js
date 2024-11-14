
import React, { useState } from 'react';
import axios from 'axios';
import './ComplaintSubmission.css'

function SubmitComplaint() {
  const [formData, setFormData] = useState({
    userType: '',
    name: '',
    email: '',
    department: '',
    category: '',
    subject: '',
    description: '',
  });

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/complaints', formData);
      alert('Complaint submitted successfully');
      setFormData({ title: '', description: '', category: '', user: '' });
      console(response);
    } catch (error) {
      alert('Error submitting complaint');
    }
    setTimeout(() => {
      setShowSuccessMessage(false);
      // Reset form
      setFormData({
        userType: '',
        name: '',
        email: '',
        department: '',
        category: '',
        subject: '',
        description: '',
      });
    }, 3000);
 
  };

  return (
    <div>
    <div class="complaint-form">
        <div class="form-header">
            <h1>Complaint Form</h1>
        </div>

        <form id="complaintForm" onSubmit={handleSubmit}>
            <div class="form-group">
                <label for="userType">I am a:</label>
                <select id="userType" required>
                    <option value="">Please select...</option>
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                </select>
            </div>

            <div class="form-group">
                <label for="name">Full Name:</label>
                <input type="text" id="name" required onChange={handleChange}/>
            </div>

            <div class="form-group">
                <label for="email">Email Address:</label>
                <input type="email" id="email" required onChange={handleChange}/>
            </div>

            <div class="form-group">
                <label for="department">Department:</label>
                <input type="text" id="department" required onChange={handleChange}/>
            </div>

            <div class="form-group">
                <label for="category">Complaint Category:</label>
                <select id="category" required>
                    <option value="">Please select...</option>
                    <option value="academic">Academic Issues</option>
                    <option value="facility">Facility Issues</option>
                    <option value="administrative">Administrative Issues</option>
                    <option value="discrimination">Discrimination/Harassment</option>
                    <option value="other">Other</option>
                </select>
            </div>

            <div class="form-group">
                <label for="subject">Subject:</label>
                <input type="text" id="subject" required onChange={handleChange}/>
            </div>

            <div class="form-group">
                <label for="description">Detailed Description:</label>
                <textarea id="description" required onChange={handleChange}></textarea>
            </div>

            <button type="submit">Submit Complaint</button>
        </form>
    </div>

    <div class="success-message" id="successMessage">
        Your complaint has been submitted successfully!
    </div>

    </div>
  );
}

export default SubmitComplaint;
