import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import StatusBadge from "../components/StatusBadge";
import { projectAPI } from "../services/api";
import { Project, Bid } from "../types";

export default function ClientDashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [bids, setBids] = useState<Record<string, Bid[]>>({});
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    budget: "",
    deadline: "",
  });

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    setLoading(true);
    try {
      const res = await projectAPI.getMine();
      setProjects(res.data.data);
      // Load bids for OPEN or ASSIGNED projects
      for (const p of res.data.data) {
        if (p.status !== "COMPLETED") {
          const bRes = await projectAPI.getBids(p._id);
          setBids((prev) => ({ ...prev, [p._id]: bRes.data.data }));
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handlePost = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await projectAPI.create({ ...form, budget: Number(form.budget) });
      setShowForm(false);
      setForm({ title: "", description: "", budget: "", deadline: "" });
      loadProjects();
    } catch (e) {
      console.error("Failed to post project");
    }
  };

  const handleAcceptBid = async (pId: string, bId: string) => {
    try {
      await projectAPI.acceptBid(pId, bId);
      loadProjects();
    } catch (e) {
      alert("Failed to accept bid");
    }
  };

  const handleMarkComplete = async (pId: string) => {
    try {
      await projectAPI.markComplete(pId);
      loadProjects();
    } catch (e) {
      alert("Failed to mark complete");
    }
  };

  return (
    <>
      <Navbar />
      <div className="main-content">
        <div className="page-header flex justify-between items-center">
          <div>
            <h1>Client Dashboard</h1>
            <p>Manage your projects and review bids</p>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "Cancel" : "+ Post Project"}
          </button>
        </div>

        {showForm && (
          <div className="card mb-6 animate-fade-in">
            <h3 className="section-title">Post New Project</h3>
            <form
              onSubmit={handlePost}
              className="form-group"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 16,
              }}
            >
              <div className="form-group" style={{ gridColumn: "1 / -1" }}>
                <label className="form-label">Title</label>
                <input
                  className="form-input"
                  required
                  value={form.title}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, title: e.target.value }))
                  }
                />
              </div>
              <div className="form-group" style={{ gridColumn: "1 / -1" }}>
                <label className="form-label">Description</label>
                <textarea
                  className="form-textarea"
                  required
                  value={form.description}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, description: e.target.value }))
                  }
                />
              </div>
              <div className="form-group">
                <label className="form-label">Budget ($)</label>
                <input
                  type="number"
                  className="form-input"
                  required
                  value={form.budget}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, budget: e.target.value }))
                  }
                />
              </div>
              <div className="form-group">
                <label className="form-label">Deadline</label>
                <input
                  type="date"
                  className="form-input"
                  required
                  value={form.deadline}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, deadline: e.target.value }))
                  }
                />
              </div>
              <div style={{ gridColumn: "1 / -1", marginTop: 8 }}>
                <button type="submit" className="btn btn-primary">
                  Post Project
                </button>
              </div>
            </form>
          </div>
        )}

        {loading ? (
          <div className="loading-wrap">
            <div className="spinner" />
          </div>
        ) : null}

        <div className="projects-grid">
          {projects.map((p) => {
            const projectBids = bids[p._id] || [];
            return (
              <div className="project-card" key={p._id}>
                <div className="project-card-header">
                  <h3 className="project-title">{p.title}</h3>
                  <StatusBadge status={p.status} />
                </div>
                <p className="project-desc">{p.description}</p>
                <div className="project-meta">
                  <span className="project-meta-item">
                    Budget: <strong>${p.budget}</strong>
                  </span>
                  <span className="project-meta-item">
                    Due:{" "}
                    <strong>{new Date(p.deadline).toLocaleDateString()}</strong>
                  </span>
                </div>

                {p.status === "OPEN" && projectBids.length > 0 && (
                  <div className="bids-list mt-4 flex-col gap-2">
                    <p className="form-label">Recent Bids</p>
                    {projectBids.map((b) => (
                      <div className="bid-row" key={b._id}>
                        <div className="bid-info">
                          <div className="bid-freelancer">
                            {(b.freelancerId as any).name}
                          </div>
                          <div className="bid-amount text-accent">
                            ${b.amount}
                          </div>
                        </div>
                        <button
                          className="btn btn-success btn-sm"
                          onClick={() => handleAcceptBid(p._id, b._id)}
                        >
                          Accept
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {p.status === "OPEN" && projectBids.length === 0 && (
                  <div className="mt-4 text-muted">No bids yet.</div>
                )}

                {p.status === "ASSIGNED" && (
                  <div className="project-actions">
                    <button
                      className="btn btn-primary btn-full"
                      onClick={() => handleMarkComplete(p._id)}
                    >
                      Mark Project Complete
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {!loading && projects.length === 0 && (
          <div className="empty-state">
            <p>You haven't posted any projects yet.</p>
          </div>
        )}
      </div>
    </>
  );
}
