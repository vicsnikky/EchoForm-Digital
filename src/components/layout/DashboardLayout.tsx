import React from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, Users, BookOpen, CreditCard, ClipboardCheck, Settings, LogOut, Menu, Bell, Building2 } from 'lucide-react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { cn } from '../../lib/utils';

export default function DashboardLayout() {
  const { user, logout, role } = useAuth();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const getMenuItems = () => {
    if (role === 'platform_admin') {
      return [
        { title: 'Global Overview', icon: LayoutDashboard, path: '/dashboard/platform' },
        { title: 'Manage Schools', icon: Building2, path: '/dashboard/platform#schools' },
        { title: 'Revenue Docs', icon: CreditCard, path: '/dashboard/fees' },
        { title: 'Settings', icon: Settings, path: '/dashboard/settings' },
      ];
    }
    
    return [
      { title: 'Overview', icon: LayoutDashboard, path: `/dashboard/${role}` },
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
      <header className="md:hidden bg-blue-900 text-white p-4 flex items-center justify-between sticky top-0 z-50 shadow-md">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center font-bold text-white">S</div>
          <span className="font-bold tracking-tight">SchoolPulse</span>
        </div>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-blue-800 rounded-full transition-colors">
          <Menu size={24} />
        </button>
      </header>

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-40 w-64 bg-blue-900 text-white transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 pt-20 md:pt-0",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="hidden md:flex items-center gap-2 p-6 mb-4">
          <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center font-bold text-white text-xl shadow-lg shadow-emerald-500/20">S</div>
          <span className="text-xl font-bold tracking-tight">SchoolPulse</span>
        </div>

        <nav className="px-4 space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsSidebarOpen(false)}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative",
                location.pathname === item.path 
                  ? "bg-white/10 text-white font-medium" 
                  : "text-blue-100 hover:bg-white/5 hover:text-white"
              )}
            >
              <item.icon size={20} className={cn(
                "transition-transform group-hover:scale-110",
                location.pathname === item.path ? "text-emerald-400" : "text-blue-300"
              )} />
              {item.title}
              {location.pathname === item.path && (
                <motion.div 
                  layoutId="sidebar-active"
                  className="absolute left-0 w-1 h-6 bg-emerald-400 rounded-r-full"
                />
              )}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-8 left-0 w-full px-8">
          <button 
            onClick={logout}
            className="flex items-center gap-3 text-blue-300 hover:text-white transition-colors w-full group"
          >
            <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top bar (Desktop) */}
        <header className="hidden md:flex h-16 bg-white border-b items-center justify-between px-8 sticky top-0 z-30">
          <div>
            <h1 className="text-gray-900 font-semibold text-lg">
              {menuItems.find(i => i.path === location.pathname)?.title || 'Dashboard'}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-500 capitalize">{role}</p>
              </div>
              <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold border-2 border-blue-50 ring-2 ring-blue-50/50">
                {user?.name?.[0]?.toUpperCase()}
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <div className="p-4 md:p-8 flex-1 max-w-7xl w-full mx-auto">
          <Outlet />
        </div>
      </main>

      {/* Backdrop for mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}
