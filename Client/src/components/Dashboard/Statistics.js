import React from 'react';

const Statistics = ({ total, unsolved, solved }) => {
  return (
    <div className="statistics">
      <div className="stat-box">
        <h3>Total Complaints</h3>
        <p>{total}</p>
      </div>
      <div className="stat-box">
        <h3>Unsolved Complaints</h3>
        <p>{unsolved}</p>
      </div>
      <div className="stat-box">
        <h3>Solved Complaints</h3>
        <p>{solved}</p>
      </div>
    </div>
  );
};

export default Statistics;
