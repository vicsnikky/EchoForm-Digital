/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/auth/LoginPage';
import OnboardingPage from './pages/auth/OnboardingPage';
import DashboardLayout from './components/layout/DashboardLayout';
import AdminDashboard from './pages/dashboards/AdminDashboard';
import PlatformAdminDashboard from './pages/dashboards/PlatformAdminDashboard';
import TeacherDashboard from './pages/dashboards/TeacherDashboard';
import ParentDashboard from './pages/dashboards/ParentDashboard';
import AttendanceModule from './pages/modules/AttendanceModule';
import ResultsModule from './pages/modules/ResultsModule';
import FeeModule from './pages/modules/FeeModule';
import { AuthProvider, useAuth } from './contexts/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }: { children: React.ReactNode, allowedRoles?: string[] }) => {
  const { user, loading, role } = useAuth();
  
  if (loading) return (
    <div className="h-screen w-full flex items-center justify-center bg-gray-50">
      <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
  
  if (!user) return <Navigate to="/login" />;
  
  if (allowedRoles && !allowedRoles.includes(role || '')) {
    return <Navigate to="/unauthorized" />;
  }
  
  return <>{children}</>;
};

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<OnboardingPage />} />
          
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }>
            <Route index element={<RoleRedirect />} />
            <Route path="admin" element={<AdminDashboard />} />
            <Route path="platform" element={<PlatformAdminDashboard />} />
            <Route path="teacher" element={<TeacherDashboard />} />
            <Route path="parent" element={<ParentDashboard />} />
            <Route path="attendance" element={<AttendanceModule />} />
            <Route path="results" element={<ResultsModule />} />
            <Route path="fees" element={<FeeModule />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

function RoleRedirect() {
  const { role } = useAuth();
  if (role === 'platform_admin') return <Navigate to="/dashboard/platform" />;
  if (role === 'admin') return <Navigate to="/dashboard/admin" />;
  if (role === 'teacher') return <Navigate to="/dashboard/teacher" />;
  if (role === 'parent') return <Navigate to="/dashboard/parent" />;
  return <Navigate to="/" />;
}
