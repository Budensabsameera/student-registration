import { useState } from "react";

function StudentList({ students, loading, refreshStudents }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'table'

  // Helper to generate initials from name
  const getInitials = (name) => {
    if (!name) return "ST";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  // Helper to get deterministic background color based on name length/chars
  const getAvatarGradient = (name) => {
    const gradients = [
      "linear-gradient(135deg, #0f172a 0%, #334155 100%)",
      "linear-gradient(135deg, #18181b 0%, #3f3f46 100%)",
      "linear-gradient(135deg, #1e293b 0%, #475569 100%)",
      "linear-gradient(135deg, #27272a 0%, #52525b 100%)",
      "linear-gradient(135deg, #0f172a 0%, #475569 100%)",
    ];
    let hash = 0;
    if (name) {
      for (let i = 0; i < name.length; i++) {
        hash += name.charCodeAt(i);
      }
    }
    return gradients[hash % gradients.length];
  };

  const filteredStudents = (students || []).filter((student) => {
    const term = searchTerm.toLowerCase();
    return (
      (student.name && student.name.toLowerCase().includes(term)) ||
      (student.email && student.email.toLowerCase().includes(term)) ||
      (student.course && student.course.toLowerCase().includes(term))
    );
  });

  return (
    <div className="student-list-container">
      {/* Header with Search and Stats */}
      <div className="list-header">
        <div className="header-title-group">
          <h2>Registered Students</h2>
          <span className="count-badge">
            {students ? students.length : 0} {students && students.length === 1 ? "Record" : "Records"}
          </span>
        </div>

        <div className="header-actions">
          {/* View Toggle Buttons */}
          <div className="view-toggle">
            <button
              className={`toggle-btn ${viewMode === "grid" ? "active" : ""}`}
              onClick={() => setViewMode("grid")}
              title="Card Grid View"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
            </button>
            <button
              className={`toggle-btn ${viewMode === "table" ? "active" : ""}`}
              onClick={() => setViewMode("table")}
              title="Data Table View"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="8" y1="6" x2="21" y2="6"></line>
                <line x1="8" y1="12" x2="21" y2="12"></line>
                <line x1="8" y1="18" x2="21" y2="18"></line>
                <line x1="3" y1="6" x2="3.01" y2="6"></line>
                <line x1="3" y1="12" x2="3.01" y2="12"></line>
                <line x1="3" y1="18" x2="3.01" y2="18"></line>
              </svg>
            </button>
          </div>

          {/* Refresh Action Button */}
          {refreshStudents && (
            <button 
              onClick={refreshStudents} 
              className="btn-refresh" 
              title="Sync student records"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="23 4 23 10 17 10"></polyline>
                <polyline points="1 20 1 14 7 14"></polyline>
                <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Search Input Filter */}
      {students && students.length > 0 && (
        <div className="search-box">
          <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            placeholder="Search by name, email, or course..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button className="clear-search" onClick={() => setSearchTerm("")}>
              ✕
            </button>
          )}
        </div>
      )}

      {/* Content Section */}
      {loading ? (
        <div className="list-loading">
          <div className="spinner large"></div>
          <p>Fetching student records...</p>
        </div>
      ) : filteredStudents.length === 0 ? (
        <div className="empty-state">
          <div className="empty-illustration">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </div>
          <h3>{searchTerm ? "No matching records found" : "No students enrolled yet"}</h3>
          <p>
            {searchTerm
              ? `No records match "${searchTerm}". Try adjusting your search query.`
              : "Complete the registration form to add student records."}
          </p>
        </div>
      ) : viewMode === "table" ? (
        /* Data Table Mode */
        <div className="table-responsive">
          <table className="enterprise-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Email Address</th>
                <th>Enrolled Course</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student, index) => (
                <tr key={student.id || index}>
                  <td>
                    <div className="table-user-cell">
                      <div 
                        className="student-avatar sm" 
                        style={{ background: getAvatarGradient(student.name) }}
                      >
                        {getInitials(student.name)}
                      </div>
                      <span className="user-name">{student.name}</span>
                    </div>
                  </td>
                  <td>
                    <a href={`mailto:${student.email}`} className="table-email-link">
                      {student.email}
                    </a>
                  </td>
                  <td>
                    <span className="course-pill">{student.course}</span>
                  </td>
                  <td>
                    <span className="badge-active">Enrolled</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        /* Card Grid Mode */
        <div className="student-cards-grid">
          {filteredStudents.map((student, index) => (
            <div key={student.id || index} className="student-card">
              <div className="student-card-top">
                <div 
                  className="student-avatar" 
                  style={{ background: getAvatarGradient(student.name) }}
                >
                  {getInitials(student.name)}
                </div>
                <div className="student-info">
                  <h3 className="student-name">{student.name}</h3>
                  <a href={`mailto:${student.email}`} className="student-email" title="Send email">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                    <span>{student.email}</span>
                  </a>
                </div>
              </div>

              <div className="student-card-bottom">
                <div className="course-tag">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                  </svg>
                  <span>{student.course}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default StudentList;


