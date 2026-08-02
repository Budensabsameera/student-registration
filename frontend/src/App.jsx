
import "./App.css";
import { useEffect, useState } from "react";
import API from "./api/axiosConfig";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";

function App() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  const showNotification = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const getStudents = () => {
    setLoading(true);
    API.get("/students")
      .then((response) => {
        setStudents(response.data || []);
      })
      .catch((err) => {
        console.error("Failed to fetch students:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getStudents();
  }, []);

  // Compute unique courses count
  const uniqueCourses = new Set(students.map((s) => s.course?.trim()).filter(Boolean)).size;

  return (
    <div className="app-wrapper">
      {/* Toast Notification Banner */}
      {toast && (
        <div className={`toast-notification ${toast.type}`}>
          <div className="toast-icon">
            {toast.type === "success" ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
            )}
          </div>
          <span>{toast.message}</span>
        </div>
      )}

      {/* Enterprise Top Navigation Bar */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-brand">
            <div className="brand-logo">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                <path d="M6 12v5c3 3 9 3 12 0v-5"/>
              </svg>
            </div>
            <div className="brand-text">
              <span className="brand-name">EduAdmin</span>
              <span className="brand-tag">Enterprise Portal</span>
            </div>
          </div>

          <div className="nav-actions">
            <div className="status-pill">
              <span className="status-dot"></span>
              <span>System Live</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Dashboard Summary Metrics Header */}
      <header className="app-header">
        <div className="header-container">
          <div className="header-title-block">
            <h1>Student Management & Registration</h1>
            <p className="header-subtitle">
              Centralized platform for processing student admissions, tracking course enrollments, and managing academic records.
            </p>
          </div>

          {/* Metric Stats Cards */}
          <div className="stats-row">
            <div className="stat-card">
              <div className="stat-icon indigo">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <div className="stat-details">
                <span className="stat-value">{students ? students.length : 0}</span>
                <span className="stat-label">Total Enrolled</span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon emerald">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                </svg>
              </div>
              <div className="stat-details">
                <span className="stat-value">{uniqueCourses}</span>
                <span className="stat-label">Active Courses</span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon violet">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </div>
              <div className="stat-details">
                <span className="stat-value">Active</span>
                <span className="stat-label">Enrollment Term</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Responsive Dashboard Content */}
      <main className="container">
        <div className="layout-grid">
          <section className="form-section">
            <StudentForm 
              refreshStudents={getStudents} 
              showNotification={showNotification} 
            />
          </section>

          <section className="list-section">
            <StudentList 
              students={students} 
              loading={loading}
              refreshStudents={getStudents}
            />
          </section>
        </div>
      </main>

      <footer className="app-footer">
        <div className="footer-content">
          <p>© {new Date().getFullYear()} EduAdmin University Portal. All rights reserved.</p>
          <span className="footer-meta">v2.4 Enterprise Edition</span>
        </div>
      </footer>
    </div>
  );
}

export default App;


