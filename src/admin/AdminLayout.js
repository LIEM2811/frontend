import React from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import { Outlet } from 'react-router-dom';
import './styles/admin.scss';

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-content">
        <Navbar />
        <div className="admin-main">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
