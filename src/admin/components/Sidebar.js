import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="admin-sidebar">
      <h2 className="logo">Admin Panel</h2>
      <ul>
        <li><Link to="/admin">Dashboard</Link></li>
        <li><Link to="/admin/products">Products</Link></li>
        <li><Link to="/admin/categories">Categories</Link></li>
        <li><Link to="/admin/users">Users</Link></li>
        <li><Link to="/admin/orders">Orders</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
