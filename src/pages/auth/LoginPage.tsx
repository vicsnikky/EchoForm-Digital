import React from 'react';
import { motion } from 'framer-motion';
import { LogIn, Mail, Lock, ShieldCheck, ArrowRight } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent, role: 'admin' | 'teacher' | 'parent') => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email || `${role}@school.com`, role);
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-[100px] -z-10 translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-100/30 rounded-full blur-[100px] -z-10 -translate-x-1/2 translate-y-1/2"></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white rounded-[32px] p-8 md:p-12 shadow-2xl shadow-blue-900/5 border"
      >
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-2xl font-black text-3xl shadow-xl shadow-blue-600/20 mb-6 mx-auto">S</div>
          <h1 className="text-3xl font-black text-blue-950 tracking-tighter mb-2">Welcome Back</h1>
          <p className="text-gray-500 font-medium tracking-tight">Access your SchoolPulse dashboard</p>
        </div>

        <form className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 uppercase tracking-widest pl-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="email" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="school@pulse.com"
                className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl py-4 flex pl-12 pr-4 outline-none focus:border-blue-600 focus:bg-white transition-all font-medium text-gray-900" 
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 uppercase tracking-widest pl-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl py-4 flex pl-12 pr-4 outline-none focus:border-blue-600 focus:bg-white transition-all font-medium" 
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-sm font-bold py-2">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input type="checkbox" className="w-5 h-5 rounded-lg border-2 accent-blue-600" />
              <span className="text-gray-600 group-hover:text-blue-600 transition-colors">Remember me</span>
            </label>
            <Link to="/forgot" className="text-blue-600 hover:underline">Forgot password?</Link>
          </div>

          <div className="grid grid-cols-1 gap-3 pt-4">
            <button 
              onClick={(e) => handleLogin(e, 'admin')}
              className="w-full bg-blue-600 text-white rounded-2xl py-4 font-bold text-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 active:scale-[0.98]"
            >
              Sign In as Admin <ArrowRight size={20} />
            </button>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <button 
                onClick={(e) => handleLogin(e, 'teacher')}
                className="bg-white border-2 border-gray-100 text-gray-700 rounded-2xl py-3 font-bold hover:border-emerald-600 hover:text-emerald-600 transition-all"
              >
                Teacher
              </button>
              <button 
                onClick={(e) => handleLogin(e, 'platform_admin')}
                className="bg-gray-900 border-2 border-gray-900 text-white rounded-2xl py-3 font-bold hover:bg-gray-800 transition-all"
              >
                Platform
              </button>
            </div>
          </div>
        </form>

        <p className="text-center mt-10 text-gray-500 font-medium">
          Don't have a school account? <Link to="/register" className="text-blue-600 font-bold hover:underline">Join SchoolPulse</Link>
        </p>

        <div className="mt-8 pt-8 border-t flex items-center justify-center gap-2 text-gray-400">
          <ShieldCheck size={16} />
          <span className="text-xs font-bold uppercase tracking-widest">Enterprise Bank Security</span>
        </div>
      </motion.div>
    </div>
  );
}
