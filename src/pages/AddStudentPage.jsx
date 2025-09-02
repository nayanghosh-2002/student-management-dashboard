import React from 'react';
import { useNavigate } from 'react-router-dom';
import StudentForm from '../components/StudentForm';
import { useStudents } from '../context/StudentContext';
import useCourses from '../hooks/useCourses';

export default function AddStudentPage() {
  const navigate = useNavigate();
  const { addStudent } = useStudents();
  const { courses, loading } = useCourses();

  const handleSave = async (student) => {
    await addStudent(student);
    // After saving redirect the user to the student list
    navigate('/students');
  };

  if (loading) return <div className="loading">Loading form...</div>;

  return (
    <div className="container dashboard-only">
        <aside className="sidebar full-width">
            <div className="form-header">
                <h2>➕ Add New Student</h2>
            </div>
            <StudentForm onSave={handleSave} courses={courses} />
        </aside>
    </div>
  );
}