import { useState } from "react";
import API from "../api/axiosConfig";

function StudentForm({ refreshStudents, showNotification }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Full name is required";
    if (!email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!course.trim()) newErrors.course = "Course name is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const saveStudent = (e) => {
    if (e) e.preventDefault();
    
    if (!validate()) return;

    setIsSubmitting(true);
    const student = { name, email, course };

    API.post("/students", student)
      .then(() => {
        if (showNotification) {
          showNotification(`Student "${name}" registered successfully!`, "success");
        } else {
          alert("Student Saved Successfully");
        }

        setName("");
        setEmail("");
        setCourse("");
        setErrors({});

        refreshStudents();
      })
      .catch((error) => {
        console.error("Failed to save student:", error);
        if (showNotification) {
          showNotification("Failed to save student. Please try again.", "error");
        } else {
          alert("Error saving student");
        }
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="form-card">
      <div className="card-header">
        <div className="card-icon">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="8.5" cy="7" r="4"></circle>
            <line x1="20" y1="8" x2="20" y2="14"></line>
            <line x1="23" y1="11" x2="17" y2="11"></line>
          </svg>
        </div>
        <div>
          <h2>Register Student</h2>
          <p className="card-subtitle">Fill in the details below to enroll</p>
        </div>
      </div>

      <form onSubmit={saveStudent} className="student-form">
        {/* Name Input */}
        <div className={`input-group ${errors.name ? "has-error" : ""}`}>
          <label htmlFor="name-input">Full Name</label>
          <div className="input-wrapper">
            <span className="field-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </span>
            <input
              id="name-input"
              type="text"
              placeholder="e.g. Sarah Jenkins"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors((prev) => ({ ...prev, name: null }));
              }}
            />
          </div>
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        {/* Email Input */}
        <div className={`input-group ${errors.email ? "has-error" : ""}`}>
          <label htmlFor="email-input">Email Address</label>
          <div className="input-wrapper">
            <span className="field-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </span>
            <input
              id="email-input"
              type="email"
              placeholder="e.g. sarah@university.edu"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors((prev) => ({ ...prev, email: null }));
              }}
            />
          </div>
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        {/* Course Input */}
        <div className={`input-group ${errors.course ? "has-error" : ""}`}>
          <label htmlFor="course-input">Enrolled Course</label>
          <div className="input-wrapper">
            <span className="field-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
              </svg>
            </span>
            <input
              id="course-input"
              type="text"
              placeholder="e.g. Computer Science"
              value={course}
              onChange={(e) => {
                setCourse(e.target.value);
                if (errors.course) setErrors((prev) => ({ ...prev, course: null }));
              }}
            />
          </div>
          {errors.course && <span className="error-message">{errors.course}</span>}
        </div>

        {/* Submit Button */}
        <button type="submit" disabled={isSubmitting} className="btn-primary">
          {isSubmitting ? (
            <span className="btn-loading">
              <span className="spinner"></span> Registering...
            </span>
          ) : (
            <span className="btn-content">
              <span>Save Student</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </span>
          )}
        </button>
      </form>
    </div>
  );
}

export default StudentForm;

