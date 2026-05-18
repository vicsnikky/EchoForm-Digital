import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'admin' | 'teacher' | 'parent' | 'student' | 'bursar' | 'gate' | 'platform_admin' | 'subject_teacher' | 'class_teacher';

interface User {
  id: string;
  name: string;
  email: string;
  roles: UserRole[];
  schoolId?: string;
  admissionNo?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, roles: UserRole[]) => Promise<void>;
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

  const login = async (email: string, roles: UserRole[]) => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const primaryRole = roles[0];
    const mockUser: User = {
      id: '1',
      name: primaryRole === 'platform_admin' ? 'Global Admin' : (primaryRole === 'admin' ? 'School Admin' : (primaryRole === 'parent' ? 'Ifeoluwa Parent' : 'Staff User')),
      email,
      roles,
      schoolId: 'SCH-8241-PLS',
      admissionNo: primaryRole === 'parent' ? 'ADM-2026-001' : undefined
    };
    
    setUser(mockUser);
    localStorage.setItem('schoolpulse_user', JSON.stringify(mockUser));
    setLoading(false);
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
