import React from 'react';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h2>Welcome, Admin!</h2>
      <div className="stats">
        <div className="card">🛒 120 Orders</div>
        <div className="card">👥 56 Users</div>
        <div className="card">📦 80 Products</div>
        <div className="card">💰 $8,450 Revenue</div>
      </div>
    </div>
  );
};

export default Dashboard;
