import axios from "axios";
import { useState } from "react";

export default function Login({ setPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const res = await axios.post("http://localhost:5000/api/auth/login", {
      email, password
    });
    localStorage.setItem("token", res.data.token);
    window.location.reload();
  };

  return (
    <div className="container mt-5">
      <div className="card mx-auto p-4" style={{ maxWidth: "400px" }}>
        <h4 className="text-center mb-3">Login</h4>

        <input className="form-control mb-2" placeholder="Email"
          onChange={e => setEmail(e.target.value)} />

        <input className="form-control mb-2" type="password"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)} />

        <button className="btn btn-primary w-100" onClick={login}>
          Login
        </button>

        <p className="text-center mt-2">
          <span className="text-primary" style={{ cursor: "pointer" }}
            onClick={() => setPage("register")}>
            Create account
          </span>
        </p>
      </div>
    </div>
  );
}
