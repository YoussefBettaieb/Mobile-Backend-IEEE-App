import { useEffect, useState } from "react";
import api from "../api";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      setError("");
      setLoading(true);
      try {
        const { data } = await api.get("/users");
        setUsers(data || []);
      } catch (err) {
        setError(
          err?.response?.data?.message || "Failed to fetch users (Admin only)"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) return <div className="loading">Loading users…</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div>
      <h2>Users (Admin Only)</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Admin</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.fullName}</td>
              <td>{user.email}</td>
              <td>{user.isAdmin ? "✓" : "✗"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {!users.length && <div className="empty-state">No users found.</div>}
    </div>
  );
}
