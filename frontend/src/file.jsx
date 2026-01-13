import { useState } from "react";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const login = async () => {
    setMessage("");

    try {
      const res = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      if (res.ok) {
        if (data.role === "faculty") {
          window.location.href = "/faculty";
        } else {
          window.location.href = `/student/${data.username}`;
        }
      } else {
        setMessage(data.message || "Login failed");
      }
    } catch (err) {
      setMessage("Server not reachable");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2>Internal Assessment Portal</h2>
        <p className="login-subtitle">
          Academic Performance Management System
        </p>

        <div className="badges">
          <span className="badge">Faculty Access</span>
          <span className="badge">Student Access</span>
        </div>

        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* 🔴 IMPORTANT FIX HERE */}
        <button type="button" onClick={login}>
          Login
        </button>

        {message && (
          <p style={{ color: "red", marginTop: "10px", textAlign: "center" }}>
            {message}
          </p>
        )}

        <div className="login-footer">
          © 2026 lmao final eval<br />
          structured eval
        </div>
      </div>
    </div>
  );
}

export default Login;
