import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ResetPassword.css'
const ResetPassword = () => {
  const { token } = useParams(); // Get token from the URL
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:5000/reset-password/${token}`, { newPassword });
      setMessage(res.data.message);
    } catch (err) {
      setMessage('Error resetting password');
    }
  };

  return (
     <div className="form-reset-container">
      <div className="logo-container">
        Reset Password
      </div>

      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Enter new password"
          required
        />
        </div>

        <button className="form-submit-btn" type="submit">Reset</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ResetPassword;
