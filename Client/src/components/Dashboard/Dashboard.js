import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ComplaintsChart from './ComplaintsCharts';
import ComplaintsTable from './ComplaintsTable';
import Statistics from './Statistics';
import './DashBoard.css';

const Dashboard = () => {
  const navigate = useNavigate();

  const getUser = async () => {
    try {
      const response = await axios.get("http://localhost:5000/login/success", { withCredentials: true });
      console.log("response", response);
    } catch (error) {
      navigate("*");
    }
  };

  useEffect(() => {
    getUser();
  }, []); // Added dependency array to prevent infinite re-renders

  return (
    <div className="App">
      <div className="dashboard">
        {/* Statistics Section */}
        <Statistics total={16} unsolved={12} solved={4} />

        {/* Complaints Chart */}
        <ComplaintsChart />

        {/* Complaints Table */}
        <ComplaintsTable />
      </div>
    </div>
  );
};

export default Dashboard;
