import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import StatusBadge from '../components/StatusBadge';
import { adminAPI } from '../services/api';
import { User, Project } from '../types';

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [tab, setTab] = useState<'USERS' | 'PROJECTS'>('USERS');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [uRes, pRes] = await Promise.all([adminAPI.getUsers(), adminAPI.getProjects()]);
      setUsers(uRes.data.data);
      setProjects(pRes.data.data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleToggleBlock = async (user: User) => {
    try {
      if (user.isBlocked) await adminAPI.unblockUser(user._id);
      else await adminAPI.blockUser(user._id);
      loadData();
    } catch (e) {
      alert('Action failed');
    }
  };

  return (
    <>
      <Navbar />
      <div className="main-content">
        <div className="page-header">
          <h1>Admin Control Panel</h1>
          <p>System-wide overview and moderation</p>
        </div>

        <div className="tabs flex gap-2 mb-6 border-b border-gray-800 pb-2">
          <button
            className={`btn ${tab === 'USERS' ? 'btn-primary' : 'btn-ghost'}`}
            onClick={() => setTab('USERS')}
          >
            Users ({users.length})
          </button>
          <button
            className={`btn ${tab === 'PROJECTS' ? 'btn-primary' : 'btn-ghost'}`}
            onClick={() => setTab('PROJECTS')}
          >
            Projects ({projects.length})
          </button>
        </div>

        {tab === 'USERS' && (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u._id}>
                    <td>
                      <strong>{u.name}</strong>
                    </td>
                    <td>{u.email}</td>
                    <td>
                      <StatusBadge status={u.role} />
                    </td>
                    <td>
                      <StatusBadge status={u.isBlocked ? 'blocked' : 'active'} />
                    </td>
                    <td>
                      <button
                        className={`btn btn-sm ${u.isBlocked ? 'btn-success' : 'btn-danger'}`}
                        onClick={() => handleToggleBlock(u)}
                      >
                        {u.isBlocked ? 'Unblock' : 'Block'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tab === 'PROJECTS' && (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Client</th>
                  <th>Budget</th>
                  <th>Status</th>
                  <th>Posted</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((p) => (
                  <tr key={p._id}>
                    <td>
                      <strong>{p.title}</strong>
                    </td>
                    <td>{(p.clientId as any).name}</td>
                    <td>${p.budget}</td>
                    <td>
                      <StatusBadge status={p.status} />
                    </td>
                    <td>{new Date(p.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
