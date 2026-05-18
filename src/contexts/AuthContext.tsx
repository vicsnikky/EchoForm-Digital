import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'admin' | 'teacher' | 'parent' | 'student' | 'bursar' | 'gate' | 'platform_admin';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  schoolId?: string;
  admissionNo?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, role: UserRole) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate auth check
    const savedUser = localStorage.getItem('schoolpulse_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, role: UserRole) => {
    const mockUser: User = {
      id: '1',
      name: role === 'platform_admin' ? 'Global Admin' : (role === 'admin' ? 'School Admin' : 'User'),
      email,
      role,
      schoolId: 'SCH-8241-PLS',
      admissionNo: 'ADM-2026-001'
    };
    setUser(mockUser);
    localStorage.setItem('schoolpulse_user', JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('schoolpulse_user');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
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
