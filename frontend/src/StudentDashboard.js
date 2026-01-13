import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function StudentDashboard() {
  const { username } = useParams();
  const [marks, setMarks] = useState([]);

  const logout = () => {
    window.location.href = "/";
  };

  useEffect(() => {
    fetch(`http://localhost:5000/marks/student/${username}`)
      .then(res => res.json())
      .then(data => setMarks(data));
  }, [username]);

  const total = marks.reduce((sum, m) => sum + m.marks, 0);
  const average = marks.length ? (total / marks.length).toFixed(1) : 0;

  return (
    <div className="container">
      {/* Header */}
      <div className="header">
        <div>
          <h1>Student Dashboard</h1>
          <span>Welcome, {username}</span>
        </div>
        <button className="logout" onClick={logout}>Logout</button>
      </div>

      {/* Profile Summary */}
      <div className="dashboard" style={{ marginBottom: "24px" }}>
        <div className="section">
          <h2>Student Overview</h2>
          <table>
            <tbody>
              <tr>
                <td><strong>Username</strong></td>
                <td>{username}</td>
              </tr>
              <tr>
                <td><strong>Total Marks</strong></td>
                <td>{total}</td>
              </tr>
              <tr>
                <td><strong>Average</strong></td>
                <td>{average}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Marks Table */}
      <div className="dashboard">
        <div className="section">
          <h2>Your Marks</h2>

          {marks.length === 0 && <p>No marks available</p>}

          {marks.length > 0 && (
            <table>
              <thead>
                <tr>
                  <th>Course</th>
                  <th>Marks</th>
                </tr>
              </thead>
              <tbody>
                {marks.map((m, i) => (
                  <tr key={i}>
                    <td>{m.course}</td>
                    <td
                      style={{
                        fontWeight: "600",
                        color:
                          m.marks >= 90
                            ? "#16a34a"
                            : m.marks >= 75
                            ? "#2563eb"
                            : m.marks >= 60
                            ? "#f59e0b"
                            : "#dc2626"
                      }}
                    >
                      {m.marks}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;
