import axios from "axios";
import { useState } from "react";

export default function Register({ setPage }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    await axios.post("http://localhost:5000/api/auth/register", {
      name, email, password
    });
    setPage("login");
  };

  return (
    <div className="container mt-5">
      <div className="card mx-auto p-4" style={{ maxWidth: "400px" }}>
        <h4 className="text-center mb-3">Register</h4>

        <input className="form-control mb-2" placeholder="Name"
          onChange={e => setName(e.target.value)} />

        <input className="form-control mb-2" placeholder="Email"
          onChange={e => setEmail(e.target.value)} />

        <input className="form-control mb-2" type="password"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)} />

        <button className="btn btn-success w-100" onClick={register}>
          Register
        </button>

        <p className="text-center mt-2">
          <span className="text-primary" style={{ cursor: "pointer" }}
            onClick={() => setPage("login")}>
            Back to login
          </span>
        </p>
      </div>
    </div>
  );
}
