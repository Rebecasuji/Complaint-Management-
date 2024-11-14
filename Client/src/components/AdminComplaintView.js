import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewComplaints = () => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const fetchComplaints = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/complaint/view', {
        headers: { 'x-auth-token': token },
      });

      setComplaints(res.data);
    };

    fetchComplaints();
  }, []);

  return (
    <div>
      <h2>Complaints</h2>
      {complaints.map((complaint) => (
        <div key={complaint._id}>
          <h3>{complaint.title}</h3>
          <p>{complaint.description}</p>
          <p>Submitted by: {complaint.submittedBy.name}</p>
        </div>
      ))}
    </div>
  );
};

export default ViewComplaints;
