import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { StudentProvider } from './context/StudentContext';
import Layout from './pages/Layout';
import DashboardPage from './pages/DashboardPage';
import StudentListPage from './pages/StudentListPage';
import AddStudentPage from './pages/AddStudentPage';
import EditStudentPage from './pages/EditStudentPage';

import './index.css';

export default function App() {
  return (
    <StudentProvider>
      <BrowserRouter>
        <Routes>
          {/* pages will render inside the Layout component  */}
          <Route path="/" element={<Layout />}>
            <Route index element={<DashboardPage />} />
            <Route path="students" element={<StudentListPage />} />
            <Route path="add" element={<AddStudentPage />} />
            <Route path="edit/:studentId" element={<EditStudentPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </StudentProvider>
  );
}