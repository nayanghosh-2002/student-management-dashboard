import React, { useEffect, useState } from 'react';
import { fileToDataUrl } from '../utils/fileUtils';
import { validateEmail } from '../utils/validators';

export default function StudentForm({ initial = null, onSave, courses = [] }) {
  // Local state for form inputs
  const [name, setName] = useState(initial?.name || '');
  const [email, setEmail] = useState(initial?.email || '');
  const [courseId, setCourseId] = useState(initial?.courseId || '');
  const [imageData, setImageData] = useState(initial?.imageData || null);
  // Local state for form inputs
  const [errors, setErrors] = useState({});
  // Loading state while saving student
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setName(initial?.name || '');
    setEmail(initial?.email || '');
    setCourseId(initial?.courseId || '');
    setImageData(initial?.imageData || null);
    setErrors({});
  }, [initial]);

  function validate() {
    const e = {};
    if (!name.trim()) e.name = 'Name is required';
    if (!email.trim()) e.email = 'Email is required';
    else if (!validateEmail(email)) e.email = 'Invalid email format';
    if (!courseId) e.course = 'Please select a course';
    setErrors(e);
    return Object.keys(e).length === 0;  // returns true if no errors
  }

  async function handleSubmit(ev) {
    ev.preventDefault();
    if (!validate()) return;
    setSaving(true);

    // Event loop 
    Promise.resolve().then(() => console.log('microtask: validation completed'));
    
    try {
      await onSave({
        id: initial?.id,
        name: name.trim(),
        email: email.trim(),
        courseId,
        imageData,
      });
      setTimeout(() => console.log('macrotask: student saved (setTimeout)'), 0);
    } catch (err) {
      console.error('Save failed:', err);
    } finally {
      setSaving(false);
    }
  }

  async function handleImageChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    
    try {
      const dataUrl = await fileToDataUrl(file);
      setImageData(dataUrl);
    } catch (err) {
      console.error('Image upload failed:', err);
    }
  }

  const selectedCourse = courses.find(c => c.id === courseId);

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <div className="form-group">
        <label className="label required">Full Name</label>
        <input 
          className="input" 
          type="text"
          value={name} 
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter student's full name"
        />
        {errors.name && <div className="error">{errors.name}</div>}
      </div>

      <div className="form-group">
        <label className="label required">Email Address</label>
        <input 
          className="input" 
          type="email"
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
          placeholder="student@example.com"
        />
        {errors.email && <div className="error">{errors.email}</div>}
      </div>

      <div className="form-group">
        <label className="label required">Course Enrollment</label>
        <select 
          className="input" 
          value={courseId} 
          onChange={(e) => setCourseId(e.target.value)}
        >
          <option value="">-- Select a Course --</option>
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.name}
            </option>
          ))}
        </select>
        {errors.course && <div className="error">{errors.course}</div>}
        {selectedCourse && (
          <div className="course-badge">
            Enrolling in: <strong>{selectedCourse.name}</strong>
          </div>
        )}
      </div>

      <div className="form-group">
        <label className="label">Profile Image</label>
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleImageChange}
          className="file-input"
        />
        {imageData && (
          <div className="image-preview-container">
            <img src={imageData} alt="Profile preview" className="img-preview" />
            <button 
              type="button" 
              className="btn small danger"
              onClick={() => setImageData(null)}
            >
              Remove
            </button>
          </div>
        )}
      </div>

      <div className="form-actions">
        <button 
          className="btn btn-primary" 
          type="submit" 
          disabled={saving}
        >
          {saving ? (
            <>
              <span className="loading-spinner"></span>
              Saving...
            </>
          ) : (
            initial ? '✏️ Update Student' : '➕ Add Student'
          )}
        </button>
      </div>
    </form>
  );
}