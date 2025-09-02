import { useEffect, useState } from 'react';
const COURSES_API = 'http://localhost:4000/courses'; 

export default function useCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function fetchCourses() {
      setLoading(true);
      try {
        const res = await fetch(COURSES_API);
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        if (mounted) setCourses(data);
      } catch (err) {
        // fallback list
        if (mounted) {
          setCourses([
            
          ]);
          setError(err.message);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }
    fetchCourses();
    return () => {
      mounted = false;
    };
  }, []);

  return { courses, loading, error };
}
