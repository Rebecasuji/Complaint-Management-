import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    // Navigate to the Submit Complaint page
    navigate('/complaintsubmit');
  };

  return (
    <div style={{ textAlign: "center" }}>
      <section className="hero">
        <h1>Your Voice Matters</h1>
        <p>Submit and track your complaints efficiently with our state-of-the-art complaint management system</p>
        <button className="cta-button floating" onClick={handleButtonClick}>
          Submit a Complaint
        </button>
      </section>

      <section className="features">
        <div className="features-grid">
          <div className="feature-card">
            <h3>Easy Submission</h3>
            <p>Submit your complaints through our user-friendly interface in minutes</p>
          </div>
          <div className="feature-card">
            <h3>Real-time Tracking</h3>
            <p>Track the status of your complaint in real-time with our advanced tracking system</p>
          </div>
          <div className="feature-card">
            <h3>Secure & Confidential</h3>
            <p>Your complaints are handled with utmost security and confidentiality</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
