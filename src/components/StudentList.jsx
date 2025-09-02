import React, { useMemo } from 'react';
import { useStudents } from '../context/StudentContext';
import StudentCard from './StudentCard';

export default function StudentList({ onEdit, courses = [] }) {
  const { students, removeStudent } = useStudents();

  const items = useMemo(() => {
    return students.map((student) => (
      <StudentCard 
        key={student.id} 
        student={student} 
        courses={courses}
        onEdit={onEdit} 
        onDelete={() => removeStudent(student.id)} 
      />
    ));
  }, [students, courses, onEdit, removeStudent]);

  if (students.length === 0) {
    return (
      <div className="empty">
        <p>No students enrolled yet.</p>
        <p>Add student to get started!</p>
      </div>
    );
  }

  return (
    <div className="student-list-container">
      <div className="list-header">
        <h2>Enrolled Students</h2>
        <div className="student-count">
          {students.length} student{students.length !== 1 ? 's' : ''} enrolled
        </div>
      </div>
      <ul className="student-list">{items}</ul>
    </div>
  );
}