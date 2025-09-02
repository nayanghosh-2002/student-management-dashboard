import React from 'react';

export default function StudentCard({ student, onEdit, onDelete, courses = [] }) {
  // Match student's courseId with course list
  const course = courses.find(c => c.id === student.courseId);

  return (
    <li className="student-card">
      <div className="card-left">
        <img 
          className="avatar" 
          src={student.imageData || '/placeholder.png'} 
          alt={`${student.name}'s profile`}
          onError={(e) => {
            // This `onError` callback is queued in the event loop when the image fails to load.
            // React runs this after rendering, so updates happen asynchronously.
            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(student.name)}&background=6366f1&color=fff&size=120`;
          }}
        />
        {/* Student Information */}
        <div className="student-info">
          <div className="name">{student.name}</div>
          <div className="meta">{student.email}</div>
          {course && (
            <div className="course-tag">
              📚 {course.name}
            </div>
          )}
        </div>
      </div>
      
      {/* Edit Button */}
      <div className="card-actions">
        <button 
          className="btn small btn-secondary" 
          onClick={() => onEdit(student)} // calls parent handler with student object
          title="Edit student details"
        >
          ✏️ Edit
        </button>

        {/* Delete Button */}
        <button 
          className="btn small danger" 
          onClick={() => {
            if (window.confirm(`Are you sure you want to delete ${student.name}?`)) {
              onDelete(student.id);
            }
          }}
          title="Delete student"
        >
          🗑️ Delete
        </button>
      </div>
    </li>
  );
}