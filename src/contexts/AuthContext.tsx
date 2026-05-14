/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from 'react';

type UserRole = 'admin' | 'teacher' | 'parent' | 'student' | 'bursar' | 'gate' | 'platform_admin';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  schoolId: string;
}

interface AuthContextType {
  user: User | null;
  role: UserRole | null;
  loading: boolean;
  login: (email: string, role: UserRole) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Mock auto-login for development simulation
  useEffect(() => {
    const saved = localStorage.getItem('schoolpulse_user');
    if (saved) {
      setUser(JSON.parse(saved));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, role: UserRole) => {
    // Simulating a login
    const mockUser: User = {
      id: 'u123',
      name: email.split('@')[0],
      email: email,
      role: role,
      schoolId: 's456'
    };
    setUser(mockUser);
    localStorage.setItem('schoolpulse_user', JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('schoolpulse_user');
  };

  return (
    <AuthContext.Provider value={{ user, role: user?.role || null, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
