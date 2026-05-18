import React from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, Users, BookOpen, CreditCard, ClipboardCheck, Settings, LogOut, Menu, Bell, Building2, Shield } from 'lucide-react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth, UserRole } from '../../contexts/AuthContext';
import { cn } from '../../lib/utils';

export default function DashboardLayout() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const getMenuItems = () => {
    const roles = user?.roles || [];
    const isPlatformAdmin = roles.includes('platform_admin');
    const isAdmin = roles.includes('admin');
    const isBursar = roles.includes('bursar');
    const isTeacher = roles.includes('teacher');
    const isClassTeacher = roles.includes('class_teacher');
    const isSubjectTeacher = roles.includes('subject_teacher');
    const isParent = roles.includes('parent');

    if (isPlatformAdmin) {
      return [
        { title: 'Global Overview', icon: LayoutDashboard, path: '/dashboard/platform' },
        { title: 'Manage Schools', icon: Building2, path: '/dashboard/schools' },
        { title: 'Revenue Docs', icon: CreditCard, path: '/dashboard/revenue' },
        { title: 'Settings', icon: Settings, path: '/dashboard/settings' },
      ];
    }
    
    if (isAdmin || isBursar) {
      const primaryPath = isAdmin ? 'admin' : 'bursar';
      return [
        { title: 'Overview', icon: LayoutDashboard, path: `/dashboard/${primaryPath}` },
        { title: 'Staff', icon: Shield, path: '/dashboard/staff' },
        { title: 'Students', icon: Users, path: '/dashboard/students' },
        ...(isAdmin ? [{ title: 'Attendance', icon: ClipboardCheck, path: '/dashboard/attendance' }] : []),
        ...(isAdmin ? [{ title: 'Results', icon: BookOpen, path: '/dashboard/results' }] : []),
        { title: 'Fees', icon: CreditCard, path: '/dashboard/fees' },
        { title: 'Settings', icon: Settings, path: '/dashboard/settings' },
      ];
    }
    
    if (isTeacher) {
      return [
        { title: 'Overview', icon: LayoutDashboard, path: '/dashboard/teacher' },
        { title: 'Attendance', icon: ClipboardCheck, path: '/dashboard/attendance' },
        { title: 'Results', icon: BookOpen, path: '/dashboard/results' },
        { title: 'Fees', icon: CreditCard, path: '/dashboard/fees' },
        { title: 'Students', icon: Users, path: '/dashboard/students' },
        { title: 'Settings', icon: Settings, path: '/dashboard/settings' },
      ];
    }

    if (isParent) {
      return [
        { title: 'Overview', icon: LayoutDashboard, path: '/dashboard/parent' },
        { title: 'Fee Portal', icon: CreditCard, path: '/dashboard/fees' },
        { title: 'Attendance', icon: ClipboardCheck, path: '/dashboard/attendance' },
        { title: 'Results', icon: BookOpen, path: '/dashboard/results' },
      ];
    }
    
    return [
      { title: 'Overview', icon: LayoutDashboard, path: `/dashboard/${roles[0] || 'admin'}` },
      { title: 'Attendance', icon: ClipboardCheck, path: '/dashboard/attendance' },
      { title: 'Results', icon: BookOpen, path: '/dashboard/results' },
      { title: 'Fees', icon: CreditCard, path: '/dashboard/fees' },
      { title: 'Students', icon: Users, path: '/dashboard/students' },
      { title: 'Settings', icon: Settings, path: '/dashboard/settings' },
    ];
  };

  const menuItems = getMenuItems();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden bg-white border-b px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
            <Building2 size={16} />
          </div>
          <span className="font-bold text-lg">SchoolPulse</span>
        </div>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-gray-100 rounded-lg">
          <Menu size={24} />
        </button>
      </div>

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-0 z-40 md:relative md:z-auto w-72 bg-white border-r px-6 py-8 transform transition-transform duration-300 md:translate-x-0",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex items-center gap-3 mb-12 px-2">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
            <Building2 size={24} />
          </div>
          <div className="flex flex-col">
            <span className="font-black text-xl tracking-tight text-gray-900 leading-none">SchoolPulse</span>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Nigeria Edition</span>
          </div>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.title}
              to={item.path}
              onClick={() => setIsSidebarOpen(false)}
              className={cn(
                "flex items-center gap-4 px-4 py-4 rounded-2xl font-bold text-sm transition-all group",
                location.pathname === item.path 
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30" 
                  : "text-gray-400 hover:text-gray-900 hover:bg-gray-50 px-2"
              )}
            >
              <item.icon size={20} className={cn(location.pathname === item.path ? "text-white" : "text-gray-400 group-hover:text-gray-900")} />
              {item.title}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-10 left-6 right-6">
          <button 
            onClick={logout}
            className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl font-bold text-sm text-red-500 hover:bg-red-50 transition-all"
          >
            <LogOut size={20} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Top Header */}
        <header className="hidden md:flex bg-white px-10 h-24 items-center justify-between border-b sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <h1 className="font-black text-2xl text-gray-900 tracking-tight">Dashboard</h1>
            <span className="text-gray-300">/</span>
            <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">
              {location.pathname.split('/').pop()}
            </span>
          </div>

          <div className="flex items-center gap-6">
            <button className="relative w-12 h-12 flex items-center justify-center rounded-2xl border hover:bg-gray-50 transition-all">
              <Bell size={20} className="text-gray-400" />
              <span className="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-4 pl-6 border-l">
              <div className="text-right">
                <p className="text-sm font-bold text-gray-900">{user?.name}</p>
                <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest leading-none">
                  {user?.roles?.[0].replace('_', ' ')}
                  {user?.roles && user.roles.length > 1 && <span className="block text-[8px] text-gray-400">+{user.roles.length - 1} more</span>}
                </p>
              </div>
              <div className="w-12 h-12 bg-gray-100 rounded-2xl border-2 border-white shadow-sm overflow-hidden flex items-center justify-center font-bold text-gray-400">
                {user?.name?.[0]}
              </div>
            </div>
          </div>
        </header>

        <div className="p-6 md:p-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
