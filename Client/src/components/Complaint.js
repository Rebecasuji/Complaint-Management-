// ComplaintList.js - Display list of complaints
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ComplaintList() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/complaints');
        setComplaints(response.data);
      } catch (error) {
        alert('Error fetching complaints');
      }
    };
    fetchComplaints();
  }, []);

  return (
    <div>
      <h2>Complaint List</h2>
      <ul>
        {complaints.map((complaint) => (
          <li key={complaint._id}>
            <h3>{complaint.title}</h3>
            <p>{complaint.description}</p>
            <p>Status: {complaint.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ComplaintList;
