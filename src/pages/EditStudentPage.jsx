import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import StudentForm from '../components/StudentForm';
import { useStudents } from '../context/StudentContext';
import useCourses from '../hooks/useCourses';

export default function EditStudentPage() {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const { students, updateStudent } = useStudents();
  const { courses, loading } = useCourses();

  const studentToEdit = students.find((s) => s.id === studentId);

  const handleSave = async (student) => {
    await updateStudent(student.id, student);
    // After updating, redirect back to the student list
    navigate('/students');
  };

  if (loading) return <div className="loading">Loading form...</div>;

  if (!studentToEdit) {
    return (
      <div className="container dashboard-only">
        <div className="empty">
            <h2>Student Not Found</h2>
            <p>The student you are trying to edit does not exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container dashboard-only">
        <aside className="sidebar full-width">
            <div className="form-header">
                <h2>✏️ Edit Student Details</h2>
            </div>
            <StudentForm initial={studentToEdit} onSave={handleSave} courses={courses} />
        </aside>
    </div>
  );
}