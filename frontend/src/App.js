import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import FacultyDashboard from "./FacultyDashboard";
import StudentDashboard from "./StudentDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/faculty" element={<FacultyDashboard />} />
        <Route path="/student/:username" element={<StudentDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
