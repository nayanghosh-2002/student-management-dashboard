import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Layout() {
  return (
    <>
      <Navbar />
      {/* render the matched route component Dashboard, StudentList... */}
      <div className="page-container">
        <Outlet />
      </div>
    </>
  );
}