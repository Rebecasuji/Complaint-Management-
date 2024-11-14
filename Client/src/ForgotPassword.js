import React, { useState } from 'react';
import axios from 'axios';
import './ForgotPassword.css';
import {Link} from 'react-router-dom'; 

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/forgot-password', { email });
      setMessage(res.data.message);
    } catch (err) {
      alert('Error sending password reset link');
    }
  };

  return (
    <div className="formpass-container">
      <div className="logo-container">
        Forgot Password
      </div>

      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="text" id="email" name="email" placeholder="Enter your email" required=""  value={email}
          onChange={(e) => setEmail(e.target.value)} />
        </div>

        <button className="form-submit-btn" type="submit">Send Email</button>
      </form>
 
      <p className="signup-link">
        Don't have an account?
         <Link to="/register" className="signup-link link"> Sign up now</Link>
      </p>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ForgotPassword;

/* From Uiverse.io by gharsh11032000 */ 

