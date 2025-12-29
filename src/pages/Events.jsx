import { useEffect, useState } from "react";
import api from "../api";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchEvents = async () => {
    setError("");
    setLoading(true);
    try {
      const { data } = await api.get("/events");
      setEvents(data || []);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to fetch events");
    } finally {
      setLoading(false);
    }
  };

  const register = async (id) => {
    try {
      await api.post(`/events/${id}/register`);
      alert("Registered!");
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to register");
    }
  };

  const unregister = async (id) => {
    try {
      await api.delete(`/events/${id}/register`);
      alert("Unregistered!");
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to unregister");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  if (loading) return <div className="loading">Loading events…</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div>
      <h2>Events</h2>
      <div style={{ display: "grid", gap: 12 }}>
        {events.map((e) => (
          <div key={e.id} className="event-card">
            <div className="event-title">{e.title}</div>
            <div className="event-date">
              {new Date(e.date).toLocaleDateString()}
            </div>
            <div className="event-description">{e.description}</div>
            <div className="event-actions">
              <button onClick={() => register(e.id)}>Register</button>
              <button onClick={() => unregister(e.id)}>Unregister</button>
            </div>
          </div>
        ))}
        {!events.length && <div className="empty-state">No events found.</div>}
      </div>
    </div>
  );
}
