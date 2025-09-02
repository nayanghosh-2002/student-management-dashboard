import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const StudentContext = createContext(null);

export function useStudents() {
  return useContext(StudentContext);
}

export function StudentProvider({ children }) {
  // Load students from cookies on startup
  const [students, setStudents] = useState(() => {
    const saved = Cookies.get("students");
    return saved ? JSON.parse(saved) : [];
  });

  // Whenever students change, update cookies
  useEffect(() => {
    Cookies.set("students", JSON.stringify(students), { expires: 7 }); // store for 7 days
  }, [students]);

  async function addStudent(student) {
    const withId = { ...student, id: Date.now().toString() };
    setStudents((s) => [...s, withId]);
    return withId;
  }

  async function updateStudent(id, updated) {
    setStudents((s) =>
      s.map((st) => (st.id === id ? { ...st, ...updated } : st))
    );
  }

  function removeStudent(id) {
    setStudents((s) => s.filter((st) => st.id !== id));
  }

  return (
    <StudentContext.Provider
      value={{ students, addStudent, updateStudent, removeStudent }}
    >
      {children}
    </StudentContext.Provider>
  );
}
