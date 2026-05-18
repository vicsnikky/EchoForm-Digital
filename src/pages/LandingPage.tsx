import React from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Users, 
  Smartphone, 
  Layout, 
  BarChart3, 
  Lock, 
  Globe, 
  ChevronRight,
  ArrowRight,
  Check,
  Building2
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white selection:bg-blue-100">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
              <Shield size={24} />
            </div>
            <span className="font-black text-2xl tracking-tight text-gray-900 uppercase">School<span className="text-blue-600">Pulse</span></span>
          </div>
          
          <div className="hidden md:flex items-center gap-10">
            {['Features', 'Modules', 'Pricing', 'Documentation'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-bold text-gray-400 hover:text-blue-600 transition-colors uppercase tracking-widest">{item}</a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Link to="/login" className="text-sm font-bold text-gray-900 hover:text-blue-600 transition-colors uppercase tracking-widest px-6">Login</Link>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest hover:shadow-xl hover:shadow-blue-600/20 transition-all active:scale-95">
              Start Trial
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full font-bold text-xs uppercase tracking-widest mb-8"
          >
            <Globe size={14} /> Powering Nigeria Institutions
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black text-gray-900 tracking-tighter leading-[0.9] mb-8"
          >
            SMART EDUCATION<br/>FOR <span className="text-blue-600">MODERN AFRICA.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto text-lg md:text-xl text-gray-500 font-medium leading-relaxed mb-12"
          >
            The comprehensive management platform designed specifically for <span className="text-gray-900 font-bold">Nigeria Schools</span>. From global institutions to community schools, we simplify everything.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Link to="/login" className="w-full sm:w-auto bg-blue-600 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-blue-600/40 transition-all flex items-center justify-center gap-2 active:scale-95 group">
              Register Your School <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <div className="w-full sm:w-auto flex flex-col gap-2">
              <Link to="/login" className="bg-white border-2 border-gray-100 text-gray-900 px-10 py-5 rounded-2xl font-bold text-lg hover:border-blue-600 transition-all active:scale-95 text-center">
                Staff Login
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white p-6 md:p-8 rounded-[32px] border shadow-xl shadow-blue-900/5 max-w-2xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div className="space-y-3 text-left">
              <h4 className="font-black text-gray-900 flex items-center gap-2">
                <Users size={18} className="text-blue-600" /> Parent Quick Access
              </h4>
              <p className="text-xs text-gray-500 font-medium leading-relaxed">Enter child's Admission Number to view results & attendance.</p>
              <div className="flex gap-2">
                <input type="text" placeholder="ADM-2026-XXX" className="flex-1 bg-gray-50 border rounded-xl px-4 py-2 text-sm font-bold outline-none focus:border-blue-600 focus:bg-white transition-all" />
                <button className="bg-blue-600 text-white p-2 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20"><ArrowRight size={18} /></button>
              </div>
            </div>
            
            <div className="space-y-3 text-left md:border-l md:pl-6">
              <h4 className="font-black text-gray-900 flex items-center gap-2">
                <Shield size={18} className="text-emerald-600" /> Teacher Portal
              </h4>
              <p className="text-xs text-gray-500 font-medium leading-relaxed">Login with School ID to access your assigned classes.</p>
              <div className="flex gap-2">
                <input type="text" placeholder="SCHOOL-ID" className="flex-1 bg-gray-50 border rounded-xl px-4 py-2 text-sm font-bold outline-none focus:border-emerald-600 focus:bg-white transition-all" />
                <button className="bg-emerald-600 text-white p-2 rounded-xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20"><ArrowRight size={18} /></button>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-20 flex flex-wrap items-center justify-center gap-8 grayscale opacity-50 font-black text-xl tracking-tighter"
          >
            <span>NIGERIA INSTITUTIONS</span>
            <span>MODERN SCHOOLS</span>
            <span>ECO ACADEMY</span>
            <span>GLOBAL LEARNING</span>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight mb-4">Unified Management.</h2>
            <p className="text-lg text-gray-500 font-medium">Everything you need to run your institution efficiently.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Layout, title: "Multi-Tenant", desc: "Each school gets its own secure, isolated database and dashboard." },
              { icon: BarChart3, title: "Result Analytics", desc: "Automated grading, custom report cards, and performance tracking." },
              { icon: Lock, title: "Secure Payments", desc: "Integrated fee management with instant notifications for parents." }
            ].map((feature, i) => (
              <div key={i} className="bg-white p-10 rounded-[40px] border shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all">
                <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                  <feature.icon size={28} />
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-500 font-medium leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
