import axios from "axios";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const token = localStorage.getItem("token");

  const loadTasks = async () => {
    const res = await axios.get("http://localhost:5000/api/tasks", {
      headers: { authorization: token }
    });
    setTasks(res.data);
  };

  useEffect(() => { loadTasks(); }, []);

  const addTask = async () => {
    await axios.post("http://localhost:5000/api/tasks",
      { title },
      { headers: { authorization: token } }
    );
    setTitle("");
    loadTasks();
  };

  const updateStatus = async (id, status) => {
    await axios.put(`http://localhost:5000/api/tasks/${id}`,
      { status },
      { headers: { authorization: token } }
    );
    loadTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
      headers: { authorization: token }
    });
    loadTasks();
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mb-3">
        <h4>Task Dashboard</h4>
        <button className="btn btn-danger"
          onClick={() => {
            localStorage.clear();
            window.location.reload();
          }}>
          Logout
        </button>
      </div>

      <div className="input-group mb-3">
        <input className="form-control"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="New task..." />
        <button className="btn btn-primary" onClick={addTask}>Add</button>
      </div>

      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Task</th>
            <th>Status</th>
            <th width="80">Delete</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(t => (
            <tr key={t._id}>
              <td>{t.title}</td>
              <td>
                <select className="form-select"
                  value={t.status}
                  onChange={e => updateStatus(t._id, e.target.value)}>
                  <option>Pending</option>
                  <option>In-progress</option>
                  <option>Done</option>
                </select>
              </td>
              <td>
                <button className="btn btn-sm btn-danger"
                  onClick={() => deleteTask(t._id)}>
                  X
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
