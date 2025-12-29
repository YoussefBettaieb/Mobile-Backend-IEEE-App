import { useEffect, useState } from "react";
import api from "../api";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMe = async () => {
      setError("");
      try {
        const { data } = await api.get("/users/me");
        setUser(data);
      } catch (err) {
        setError(err?.response?.data?.message || "Failed to load profile");
      }
    };
    fetchMe();
  }, []);

  if (error) return <div className="error">{error}</div>;
  if (!user) return <div className="loading">Loading profile…</div>;

  return (
    <div>
      <h2>Profile</h2>
      <div className="profile-info">
        <div>
          <strong>ID:</strong> {user.id}
        </div>
        <div>
          <strong>Full Name:</strong> {user.fullName}
        </div>
        <div>
          <strong>Email:</strong> {user.email}
        </div>
        <div>
          <strong>Admin:</strong> {String(user.isAdmin)}
        </div>
      </div>
    </div>
  );
}
