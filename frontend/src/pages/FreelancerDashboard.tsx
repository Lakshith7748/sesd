import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import StatusBadge from '../components/StatusBadge';
import { projectAPI, bidAPI } from '../services/api';
import { Project, Bid } from '../types';

export default function FreelancerDashboard() {
  const [openProjects, setOpenProjects] = useState<Project[]>([]);
  const [myBids, setMyBids] = useState<Bid[]>([]);
  const [loading, setLoading] = useState(true);
  const [bidForm, setBidForm] = useState<{
    projectId: string;
    amount: string;
    proposal: string;
  } | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [projRes, bidsRes] = await Promise.all([projectAPI.getOpen(), bidAPI.getMine()]);
      setOpenProjects(projRes.data.data);
      setMyBids(bidsRes.data.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handlePlaceBid = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bidForm) return;
    try {
      await bidAPI.place(bidForm.projectId, {
        amount: Number(bidForm.amount),
        proposal: bidForm.proposal,
      });
      setBidForm(null);
      loadData();
    } catch (e) {
      alert('Failed to place bid. You might already have placed one.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="main-content">
        <div className="page-header">
          <h1>Freelancer Dashboard</h1>
          <p>Find work and manage your bids</p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-label">Active Bids</div>
            <div className="stat-value">{myBids.filter((b) => b.status === 'PENDING').length}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Accepted Bids</div>
            <div className="stat-value text-success">
              {myBids.filter((b) => b.status === 'ACCEPTED').length}
            </div>
          </div>
        </div>

        <div className="section-title mt-6 mb-4">Open Projects</div>
        <div className="projects-grid mb-8">
          {openProjects.length === 0 && <p className="text-muted">No open projects right now.</p>}
          {openProjects.map((p) => (
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
                  By: <strong>{(p.clientId as any).name}</strong>
                </span>
              </div>
              <div className="project-actions">
                <button
                  className="btn btn-secondary btn-full"
                  onClick={() => setBidForm({ projectId: p._id, amount: '', proposal: '' })}
                >
                  Place Bid
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="section-title mb-4">My Bids</div>
        <div className="bids-list">
          {myBids.length === 0 && <p className="text-muted">You haven't placed any bids.</p>}
          {myBids.map((b) => (
            <div className="bid-row" key={b._id}>
              <div className="bid-info">
                <div className="flex items-center gap-3">
                  <div className="bid-freelancer">{(b.projectId as any).title}</div>
                  <StatusBadge status={b.status} />
                </div>
                <div className="bid-proposal mt-2">{b.proposal}</div>
              </div>
              <div className="bid-amount">${b.amount}</div>
            </div>
          ))}
        </div>
      </div>

      {bidForm && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2 className="modal-title">Place Bid</h2>
              <button className="modal-close" onClick={() => setBidForm(null)}>
                ×
              </button>
            </div>
            <form className="modal-form" onSubmit={handlePlaceBid}>
              <div className="form-group">
                <label className="form-label">Amount ($)</label>
                <input
                  type="number"
                  className="form-input"
                  required
                  value={bidForm.amount}
                  onChange={(e) => setBidForm({ ...bidForm, amount: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Proposal / Cover Letter</label>
                <textarea
                  className="form-textarea"
                  required
                  value={bidForm.proposal}
                  onChange={(e) => setBidForm({ ...bidForm, proposal: e.target.value })}
                />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-ghost" onClick={() => setBidForm(null)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Submit Bid
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
