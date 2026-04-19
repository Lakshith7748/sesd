import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { authAPI } from "../services/api";
import { UserRole } from "../types";
import { useAuth } from "../context/AuthContext";
import AuthSidebar from "../components/AuthSidebar";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [role, setRole] = useState<UserRole>("CLIENT");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    skills: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const set =
    (k: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await authAPI.register({ ...form, role });
      const res = await authAPI.login({
        email: form.email,
        password: form.password,
      });
      const token: string = res.data.data.token;
      login(token, form.name);
      if (role === "CLIENT") navigate("/client");
      else if (role === "FREELANCER") navigate("/freelancer");
      else navigate("/admin");
    } catch (err: any) {
      setError(err.response?.data?.message ?? "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <AuthSidebar type="register" />
      <div className="auth-right">
        <Link to="/" className="auth-back-home">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back to Home
        </Link>
        <Link to="/" className="auth-logo">
          <div className="auth-logo-icon">FM</div>FreelanceMarket
        </Link>
        <h1 className="auth-heading">Create account</h1>
        {error && <div className="auth-error mb-4">{error}</div>}
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">I am a…</label>
            <div className="home-toggle" role="tablist" aria-label="Role">
              {(["CLIENT", "FREELANCER"] as UserRole[]).map((r) => (
                <button
                  key={r}
                  type="button"
                  className={`home-toggle-btn ${role === r ? "active" : ""}`}
                  onClick={() => setRole(r)}
                >
                  {r === "CLIENT" ? "Client" : "Freelancer"}
                </button>
              ))}
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-input"
              required
              value={form.name}
              onChange={set("name")}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-input"
              required
              value={form.email}
              onChange={set("email")}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-input"
              required
              minLength={6}
              value={form.password}
              onChange={set("password")}
            />
          </div>
          {role === "FREELANCER" && (
            <div className="form-group">
              <label className="form-label">Skills</label>
              <input
                type="text"
                className="form-input"
                required={role === "FREELANCER"}
                value={form.skills}
                onChange={set("skills")}
              />
            </div>
          )}
          <button
            type="submit"
            className="btn btn-primary btn-full btn-lg"
            disabled={loading}
          >
            {loading ? "Creating…" : "Create Account"}
          </button>
        </form>
        <div className="auth-switch">
          Already have an account? <Link to="/login">Sign in</Link>
        </div>
      </div>
    </div>
  );
}
