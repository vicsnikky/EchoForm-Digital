import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, ShieldCheck, ArrowRight } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth, UserRole } from '../../contexts/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (role: UserRole | UserRole[]) => {
    try {
      const roles = Array.isArray(role) ? role : [role];
      await login(email || 'demo@school.com', roles);
      const primaryRole = roles[0];
      navigate(primaryRole === 'platform_admin' ? '/dashboard/platform' : `/dashboard/${primaryRole}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <Link to="/" className="inline-flex items-center gap-2 mb-8 group">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-600/20 group-hover:scale-110 transition-transform">
              <ShieldCheck size={24} />
            </div>
            <span className="font-black text-2xl tracking-tight text-gray-900 uppercase">SchoolPulse</span>
          </Link>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Institutional Login</h1>
          <p className="text-gray-500 font-medium mt-2">Sign in with Google to access your workspace</p>
        </div>

        <div className="bg-white p-8 rounded-[40px] border shadow-xl shadow-gray-200/50 space-y-6 text-center">
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => handleLogin('admin')}
              disabled={loading}
              className="bg-blue-600 text-white rounded-2xl py-6 font-bold text-sm hover:bg-blue-700 transition-all active:scale-95 shadow-lg shadow-blue-600/20"
            >
              School Admin
            </button>
            <button 
              onClick={() => handleLogin('bursar')}
              disabled={loading}
              className="bg-amber-600 text-white rounded-2xl py-6 font-bold text-sm hover:bg-amber-700 transition-all active:scale-95 shadow-lg shadow-amber-600/20"
            >
              School Bursar
            </button>
            <button 
              onClick={() => handleLogin(['teacher', 'class_teacher'])}
              disabled={loading}
              className="bg-emerald-600 text-white rounded-2xl py-6 font-bold text-sm hover:bg-emerald-700 transition-all active:scale-95 shadow-lg shadow-emerald-600/20"
            >
              Class Teacher
            </button>
            <button 
              onClick={() => handleLogin(['teacher', 'subject_teacher'])}
              disabled={loading}
              className="bg-indigo-600 text-white rounded-2xl py-6 font-bold text-sm hover:bg-indigo-700 transition-all active:scale-95 shadow-lg shadow-indigo-600/20"
            >
              Subject Teacher
            </button>
            <button 
              onClick={() => handleLogin('platform_admin')}
              disabled={loading}
              className="bg-gray-900 text-white rounded-2xl py-6 font-bold text-sm hover:bg-gray-800 transition-all active:scale-95 col-span-2"
            >
              Platform Super Admin
            </button>
          </div>

          <div className="pt-4 border-t border-dashed">
            <button 
              onClick={() => handleLogin('parent')}
              className="w-full flex items-center justify-between p-6 rounded-2xl bg-gray-50 hover:bg-white border hover:border-blue-600 transition-all group"
            >
              <div className="text-left">
                <p className="text-base font-black text-gray-900">Parent Portal</p>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">View Ward Progress</p>
              </div>
              <ArrowRight className="text-gray-300 group-hover:text-blue-600 transition-colors" size={24} />
            </button>
          </div>
          
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-relaxed">
            
          </p>
        </div>
      </div>
    </div>
  );
}
