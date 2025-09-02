import React from 'react';
import { useStudents } from '../context/StudentContext';
import useCourses from '../hooks/useCourses';

export default function DashboardPage() {
  const { students } = useStudents();
  const { courses, loading, error } = useCourses();

  const totalStudents = students.length;
  const courseStats = courses.map(course => ({
    ...course,
    studentCount: students.filter(s => s.courseId === course.id).length
  }));

  return (
    <div className="container dashboard-only">
        <aside className="sidebar full-width">
            <div className="dashboard-header">
                <h1> Dashboard Overview</h1>
                <div className="stats-grid">
                    <div className="stat-card">
                        <div className="stat-number">{totalStudents}</div>
                        <div className="stat-label">Total Students</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-number">{courses.length}</div>
                        <div className="stat-label">Available Courses</div>
                    </div>
                </div>
            </div>

            {loading && <div className="loading">Loading course data...</div>}
            {error && <div className="warn">⚠️ Could not load course stats: {error}</div>}

            {courses.length > 0 && (
                <div className="course-overview">
                    <h3>📚 Students Per Course</h3>
                    <div className="course-stats">
                        {courseStats.map(course => (
                            <div key={course.id} className="course-stat">
                                <span className="course-name">{course.name}</span>
                                <span className="course-count">{course.studentCount}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </aside>
    </div>
  );
}