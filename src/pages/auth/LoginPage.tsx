import React from 'react';
import { motion } from 'framer-motion';
import { LogIn, Mail, Lock, ShieldCheck, ArrowRight } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth, UserRole } from '../../contexts/AuthContext';
import { cn } from '../../lib/utils';

export default function LoginPage() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent, role: UserRole) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, role);
      navigate(role === 'platform_admin' ? '/dashboard/platform' : `/dashboard/${role}`);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
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
          <p className="text-gray-500 font-medium mt-2">Access your school workspace</p>
        </div>

        <div className="bg-white p-8 rounded-[40px] border shadow-xl shadow-gray-200/50 space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@school.com" 
                  className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl py-4 pl-12 pr-4 font-bold outline-none focus:border-blue-600 focus:bg-white transition-all" 
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Security Code / Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" 
                  className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl py-4 pl-12 pr-4 font-bold outline-none focus:border-blue-600 focus:bg-white transition-all" 
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={(e) => handleLogin(e, 'admin')}
              disabled={loading}
              className="bg-blue-600 text-white rounded-2xl py-4 font-bold text-sm hover:bg-blue-700 transition-all active:scale-95 shadow-lg shadow-blue-600/20"
            >
              School Admin
            </button>
            <button 
              onClick={(e) => handleLogin(e, 'teacher')}
              disabled={loading}
              className="bg-emerald-600 text-white rounded-2xl py-4 font-bold text-sm hover:bg-emerald-700 transition-all active:scale-95 shadow-lg shadow-emerald-600/20"
            >
              Teacher
            </button>
            <button 
              onClick={(e) => handleLogin(e, 'platform_admin')}
              disabled={loading}
              className="bg-gray-900 text-white rounded-2xl py-4 font-bold text-sm hover:bg-gray-800 transition-all active:scale-95 col-span-2"
            >
              Platform Super Admin
            </button>
          </div>

          <div className="pt-4 border-t border-dashed">
            <button 
              onClick={(e) => handleLogin(e, 'parent')}
              className="w-full flex items-center justify-between p-4 rounded-2xl bg-gray-50 hover:bg-white border hover:border-blue-600 transition-all group"
            >
              <div className="text-left">
                <p className="text-sm font-black text-gray-900">Parent Portal</p>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">View Ward Progress</p>
              </div>
              <ArrowRight className="text-gray-300 group-hover:text-blue-600 transition-colors" size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
