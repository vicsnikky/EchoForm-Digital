import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/auth/LoginPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import DashboardLayout from './components/layout/DashboardLayout';
import AdminDashboard from './pages/dashboards/AdminDashboard';
import TeacherDashboard from './pages/dashboards/TeacherDashboard';
import ParentDashboard from './pages/dashboards/ParentDashboard';
import PlatformAdminDashboard from './pages/dashboards/PlatformAdminDashboard';
import AttendanceModule from './pages/modules/AttendanceModule';
import ResultsModule from './pages/modules/ResultsModule';
import StaffModule from './pages/modules/StaffModule';
import FeeModule from './pages/modules/FeeModule';
import SettingsModule from './pages/modules/SettingsModule';
import { AuthProvider, useAuth } from './contexts/AuthContext';

function PrivateRoute({ children, roles }: { children: React.ReactNode, roles?: string[] }) {
  const { user, loading } = useAuth();
  
  if (loading) return null;
  if (!user) return <Navigate to="/login" />;
  if (roles && !user.roles.some(r => roles.includes(r))) return <Navigate to="/" />;
  
  return <>{children}</>;
}

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/dashboard" element={<PrivateRoute><DashboardLayout /></PrivateRoute>}>
          <Route path="platform" element={<PlatformAdminDashboard />} />
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="bursar" element={<AdminDashboard />} />
          <Route path="teacher" element={<TeacherDashboard />} />
          <Route path="parent" element={<ParentDashboard />} />
          <Route path="attendance" element={<AttendanceModule />} />
          <Route path="results" element={<ResultsModule />} />
          <Route path="staff" element={<StaffModule />} />
          <Route path="fees" element={<FeeModule />} />
          <Route path="students" element={<AttendanceModule />} /> {/* Multi-purpose student view */}
          <Route path="settings" element={<SettingsModule />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}
