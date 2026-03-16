import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthState, UserRole } from '../types';

interface AuthContextType {
  auth: AuthState;
  login: (token: string, name: string) => void;
  logout: () => void;
  isRole: (role: UserRole) => boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

function parseJwt(token: string): { userId: string; role: UserRole } | null {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return { userId: payload.userId, role: payload.role };
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<AuthState>({ token: null, user: null });

  useEffect(() => {
    const token = localStorage.getItem('fm_token');
    const name = localStorage.getItem('fm_name') ?? undefined;
    if (token) {
      const decoded = parseJwt(token);
      if (decoded) setAuth({ token, user: { ...decoded, name } });
    }
  }, []);

  const login = (token: string, name: string) => {
    const decoded = parseJwt(token);
    if (!decoded) return;
    localStorage.setItem('fm_token', token);
    localStorage.setItem('fm_name', name);
    setAuth({ token, user: { ...decoded, name } });
  };

  const logout = () => {
    localStorage.removeItem('fm_token');
    localStorage.removeItem('fm_name');
    setAuth({ token: null, user: null });
  };

  const isRole = (role: UserRole) => auth.user?.role === role;

  return (
    <AuthContext.Provider value={{ auth, login, logout, isRole }}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
