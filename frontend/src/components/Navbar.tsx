import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const roleLabel = auth.user?.role ?? '';
  const roleClass = roleLabel.toLowerCase();

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <a href="/" className="navbar-logo">
          <div className="navbar-logo-icon">FM</div>
          FreelanceMarket
        </a>

        {auth.user && (
          <div className="navbar-actions">
            <div className="navbar-user">
              <div className="navbar-user-dot" />
              <span>{auth.user.name ?? 'User'}</span>
              <span className={`badge badge-${roleClass}`} style={{ marginLeft: 4 }}>
                {roleLabel}
              </span>
            </div>
            <button className="btn btn-ghost btn-sm" onClick={handleLogout}>
              Sign out
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
