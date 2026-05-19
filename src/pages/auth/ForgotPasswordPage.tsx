import React from 'react';
import { motion } from 'framer-motion';
import { Mail, ShieldCheck, ArrowLeft, Send } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ForgotPasswordPage() {
  const [email, setEmail] = React.useState('');
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // In a real app, this would call a backend API to send a reset email
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
          <h1 className="text-3xl font-black text-gray-900 tracking-tight uppercase">Account Recovery</h1>
          <p className="text-gray-500 font-medium mt-2">Enter your email to retrieve your login credentials.</p>
        </div>

        <div className="bg-white p-8 md:p-10 rounded-[40px] border shadow-xl shadow-gray-200/50">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Work Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl py-5 pl-14 pr-6 font-bold outline-none focus:border-blue-600 focus:bg-white transition-all" 
                    placeholder="name@school.com"
                  />
                </div>
              </div>

              <button 
                type="submit"
                className="w-full bg-blue-600 text-white py-6 rounded-3xl font-black text-sm uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/30 active:scale-95 flex items-center justify-center gap-3"
              >
                Send Recovery Link <Send size={18} />
              </button>

              <Link to="/login" className="flex items-center justify-center gap-2 text-[10px] font-black text-gray-400 hover:text-gray-900 uppercase tracking-widest transition-colors">
                <ArrowLeft size={14} /> Back to Login
              </Link>
            </form>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-4"
            >
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Send size={32} />
              </div>
              <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight mb-2">Check your Email</h3>
              <p className="text-gray-500 font-medium text-sm leading-relaxed mb-8">
                We've sent a recovery link to <span className="text-gray-900 font-bold">{email}</span>. Please follow the instructions to reset your password.
              </p>
              <Link to="/login" className="inline-block px-8 py-4 bg-gray-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-gray-800 transition-all active:scale-95 shadow-xl shadow-gray-900/10">
                Return to Login
              </Link>
            </motion.div>
          )}
        </div>

        <div className="mt-12 p-6 bg-blue-50/50 rounded-[32px] border border-blue-100/50">
          <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">Support Note</p>
          <p className="text-[10px] text-blue-400 font-bold leading-relaxed uppercase">
            If you are a student or teacher and cannot access the email provided by the school, please contact your school administrator or bursar for manual credential reset.
          </p>
        </div>
      </div>
    </div>
  );
}
