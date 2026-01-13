import { useState } from "react";

function FacultyDashboard() {
  const [student, setStudent] = useState("");
  const [course, setCourse] = useState("Course1");
  const [marks, setMarks] = useState("");
  const [stats, setStats] = useState(null);
  const [message, setMessage] = useState("");

  const logout = () => {
    window.location.href = "/";
  };

  const uploadMarks = async () => {
    setMessage("");

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/marks/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          student,
          course,
          marks: Number(marks),
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Marks saved successfully");
        alert("Marks saved successfully");

        // reset inputs
        setStudent("");
        setMarks("");
      } else {
        setMessage(data.message || "❌ Failed to save marks");
      }
    } catch (error) {
      console.error("Error uploading marks:", error);
      setMessage("❌ Server not reachable");
    }
  };

  const loadStats = async () => {
    setMessage("");

    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/marks/stats/${course}`
      );

      const data = await res.json();

      if (res.ok) {
        setStats(data);
      } else {
        setMessage(data.message || "❌ Could not load statistics");
        setStats(null);
      }
    } catch (error) {
      console.error("Error loading stats:", error);
      setMessage("❌ Server not reachable");
      setStats(null);
    }
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

          {message && (
            <p style={{ marginTop: "10px", fontWeight: "600" }}>{message}</p>
          )}
        </div>

        <div className="section">
          <h2>Course Statistics</h2>
          <button onClick={loadStats}>Load Statistics</button>

          {stats && (
            <table>
              <tbody>
                <tr>
                  <td>Average</td>
                  <td>{stats.average}</td>
                </tr>
                <tr>
                  <td>S Grade</td>
                  <td>{stats.grades.S}</td>
                </tr>
                <tr>
                  <td>A Grade</td>
                  <td>{stats.grades.A}</td>
                </tr>
                <tr>
                  <td>B Grade</td>
                  <td>{stats.grades.B}</td>
                </tr>
                <tr>
                  <td>C Grade</td>
                  <td>{stats.grades.C}</td>
                </tr>
                <tr>
                  <td>D Grade</td>
                  <td>{stats.grades.D}</td>
                </tr>
                <tr>
                  <td>F Grade</td>
                  <td>{stats.grades.F}</td>
                </tr>
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default FacultyDashboard;
