import React from 'react';
import { motion } from 'framer-motion';
import { 
  Rocket, 
  Shield, 
  Smartphone, 
  Zap, 
  Globe, 
  ChevronRight,
  ArrowRight,
  Check,
  Users
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-bold text-white text-xl transform transition-transform group-hover:rotate-6 shadow-lg shadow-blue-500/20">S</div>
            <span className="text-2xl font-black tracking-tighter text-blue-900">SchoolPulse</span>
          </div>
          
          <div className="hidden lg:flex items-center gap-10">
            {['Features', 'Pricing', 'Testimonials', 'FAQ'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-bold text-gray-500 hover:text-blue-600 transition-colors uppercase tracking-widest">{item}</a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Link to="/login" className="hidden sm:block text-sm font-bold text-blue-600 hover:bg-blue-50 px-5 py-2.5 rounded-xl transition-all">Log In</Link>
            <Link to="/register" className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 active:scale-95 flex items-center gap-2">
              Get Started <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl aspect-square bg-gradient-to-br from-blue-50 to-emerald-50 rounded-full blur-[100px] -z-10 opacity-60"></div>
        
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 px-4 py-2 rounded-full font-bold text-xs uppercase tracking-widest"
          >
            <Zap size={14} className="fill-blue-700" /> Made for Nigerian Schools
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.95] text-blue-950"
          >
            The Operating System for <span className="text-emerald-600">African Schools.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 font-medium max-w-2xl mx-auto leading-relaxed"
          >
            Digitize attendance, automate report cards, track fees, and engage parents in one premium dashboard. Built for 3G internet and low-end Android phones.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Link to="/register" className="w-full sm:w-auto bg-blue-600 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-blue-600/40 transition-all flex items-center justify-center gap-2 active:scale-95 group">
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
            transition={{ delay: 0.5 }}
            className="pt-10 flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale contrast-125"
          >
            <div className="font-bold text-xl tracking-tighter">TRUSTED EDUCATION</div>
            <div className="font-bold text-xl tracking-tighter">LAGOS SCHOOLS</div>
            <div className="font-bold text-xl tracking-tighter">ABUJA ACADEMY</div>
          </motion.div>
        </div>
      </section>

      {/* Stats Preview */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { value: '500+', label: 'Schools Onboarded', color: 'text-blue-600' },
            { value: '250k+', label: 'Report Cards Generated', color: 'text-emerald-600' },
            { value: '99.9%', label: 'Platform Uptime', color: 'text-amber-600' },
          ].map(stat => (
            <div key={stat.label} className="text-center p-8 bg-gray-50 rounded-3xl border border-gray-100 hover:border-blue-200 transition-colors">
              <div className={`text-5xl font-black mb-2 ${stat.color}`}>{stat.value}</div>
              <div className="text-gray-500 font-bold uppercase tracking-widest text-xs">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-blue-950 text-white rounded-[40px] mx-4 my-8 px-6">
        <div className="max-w-7xl mx-auto space-y-20">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">Everything your school needs to excel.</h2>
            <p className="text-blue-200 text-lg">We've automated the heavy lifting so your teachers can focus on what matters: teaching.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Zap, title: 'Instant Attendance', desc: 'Scan QR codes or mark manually. Syncs instantly when online.' },
              { icon: Rocket, title: 'Result Auto-Collation', desc: 'Input scores once. We handle positions, grades, and remarks.' },
              { icon: Shield, title: 'Fee Protection', desc: 'Track debtors, generate digital receipts, and block result access.' },
              { icon: Smartphone, title: 'Parent Portal', desc: 'Real-time visibility into attendance, fees, and results via mobile.' },
              { icon: Globe, title: 'Document Library', desc: 'Centralized vetting workflow and secure exam paper storage.' },
              { icon: Zap, title: '90% Less Admin', desc: 'Replace paper registers and Excel sheets with smart automation.' },
            ].map((f, i) => (
              <div key={i} className="p-8 bg-blue-900/50 rounded-3xl border border-blue-800 hover:bg-blue-800 transition-colors group">
                <f.icon size={40} className="text-emerald-400 mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                <p className="text-blue-300 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-32 px-6 text-center">
        <div className="max-w-3xl mx-auto space-y-10">
          <h2 className="text-5xl font-black text-blue-950 tracking-tighter">Ready to digitize your school?</h2>
          <p className="text-gray-600 text-xl">Join 500+ schools using SchoolPulse to drive efficiency and transparency.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/register" className="w-full sm:w-auto bg-blue-600 text-white px-12 py-6 rounded-2xl font-bold text-xl hover:shadow-2xl shadow-blue-600/30 transition-all transform active:scale-95">
              Create Admin Account
            </Link>
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest px-4">Starting at ₦1,000/Student</p>
          </div>
        </div>
      </section>
    </div>
  );
}
