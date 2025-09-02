import React from 'react';
import { useNavigate } from 'react-router-dom';
import StudentList from '../components/StudentList';
import useCourses from '../hooks/useCourses';

export default function StudentListPage() {
  const { courses } = useCourses();
  const navigate = useNavigate();

  // The onEdit function now navigates to the dedicated edit page
  const handleEdit = (student) => {
    navigate(`/edit/${student.id}`);
  };

  return (
    <div className="main full-width-main">
        <StudentList onEdit={handleEdit} courses={courses} />
    </div>
  );
}


