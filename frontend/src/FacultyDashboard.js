import { useState } from "react";

function FacultyDashboard() {
  const [student, setStudent] = useState("");
  const [course, setCourse] = useState("Course1");
  const [marks, setMarks] = useState("");
  const [stats, setStats] = useState(null);

  const logout = () => {
    window.location.href = "/";
  };

  const uploadMarks = async () => {
    await fetch("http://localhost:5000/marks/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ student, course, marks })
    });
    alert("Marks saved successfully");
  };

  const loadStats = async () => {
    const res = await fetch(`http://localhost:5000/marks/stats/${course}`);
    const data = await res.json();
    setStats(data);
  };

  return (
    <div className="container">
      <div className="header">
        <div>
          <h1>Faculty Dashboard</h1>
          <span>Internal Assessment Portal</span>
        </div>
        <button className="logout" onClick={logout}>
          Logout
        </button>
      </div>

      <div className="dashboard">
        <div className="section">
          <h2>Upload / Update Marks</h2>

          <input
            placeholder="Student Username"
            value={student}
            onChange={(e) => setStudent(e.target.value)}
          />

          <select value={course} onChange={(e) => setCourse(e.target.value)}>
            <option>Course1</option>
            <option>Course2</option>
            <option>Course3</option>
          </select>

          <input
            type="number"
            placeholder="Marks"
            value={marks}
            onChange={(e) => setMarks(e.target.value)}
          />

          <button onClick={uploadMarks}>Save Marks</button>
        </div>

        <div className="section">
          <h2>Course Statistics</h2>
          <button onClick={loadStats}>Load Statistics</button>

          {stats && (
            <table>
              <tbody>
                <tr><td>Average</td><td>{stats.average}</td></tr>
                <tr><td>S Grade</td><td>{stats.grades.S}</td></tr>
                <tr><td>A Grade</td><td>{stats.grades.A}</td></tr>
                <tr><td>B Grade</td><td>{stats.grades.B}</td></tr>
                <tr><td>C Grade</td><td>{stats.grades.C}</td></tr>
                <tr><td>D Grade</td><td>{stats.grades.D}</td></tr>
                <tr><td>F Grade</td><td>{stats.grades.F}</td></tr>
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default FacultyDashboard;
