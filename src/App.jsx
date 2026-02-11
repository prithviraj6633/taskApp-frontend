import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashborad.jsx";
import { useState } from "react";

export default function App() {
  const [page, setPage] = useState("login");
  const token = localStorage.getItem("token");

  if (!token)
    return page === "login"
      ? <Login setPage={setPage} />
      : <Register setPage={setPage} />;

  return <Dashboard />;
}
