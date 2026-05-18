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
import { cn } from '../lib/utils';

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
            <Link to="/login" className="bg-blue-600 text-white px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest hover:shadow-xl hover:shadow-blue-600/20 transition-all active:scale-95">
              Login
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="pt-40 pb-20 px-6">
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
              Login to Portal <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <div className="w-full sm:w-auto flex flex-col gap-2">
              <Link to="/login" className="bg-white border-2 border-gray-100 text-gray-900 px-10 py-5 rounded-2xl font-bold text-lg hover:border-blue-600 transition-all active:scale-95 text-center">
                Guest Access
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
      <section id="features" className="py-32 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight mb-6 uppercase">Unified Management.</h2>
            <p className="text-lg text-gray-500 font-medium max-w-2xl mx-auto">Everything you need to run your institution efficiently with zero technical overhead.</p>
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
                <h3 className="text-2xl font-black text-gray-900 mb-4 uppercase tracking-tight">{feature.title}</h3>
                <p className="text-gray-500 font-medium leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modules Section */}
      <section id="modules" className="py-32 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight mb-6 uppercase">CORE MODULES.</h2>
              <p className="text-lg text-gray-500 font-medium">Powering every department of your school with specialized tools.</p>
            </div>
            <div className="bg-blue-600 text-white px-6 py-3 rounded-full font-black text-xs uppercase tracking-widest">
              12+ Modules Available
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: "Student Info", desc: "Digital records, bio-data, and documents.", icon: Users },
              { title: "Examination", desc: "Automated result compilation and transcripts.", icon: BarChart3 },
              { title: "Gate Pass", desc: "Visitor management and security logs.", icon: Shield },
              { title: "Bursary", desc: "Fee collections, receipts, and payroll.", icon: Building2 },
              { title: "Attendance", icon: Check, desc: "Subject-based and daily attendance logs." },
              { title: "Inventory", icon: Layout, desc: "Manage school assets and supplies." },
              { title: "Staff Records", icon: Shield, desc: "Manage staff profile and performance." },
              { title: "Analytics", icon: Globe, desc: "Executive reports for school owners." },
            ].map((module, i) => (
              <div key={i} className="group p-8 rounded-[32px] bg-gray-50 hover:bg-blue-600 transition-all duration-500 hover:scale-[1.02]">
                <div className="w-12 h-12 bg-white text-blue-600 rounded-xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                  <module.icon size={24} />
                </div>
                <h4 className="text-xl font-black text-gray-900 mb-2 uppercase tracking-tight group-hover:text-white transition-colors">{module.title}</h4>
                <p className="text-sm text-gray-500 font-medium leading-relaxed group-hover:text-blue-100 transition-colors">{module.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-32 px-6 bg-gray-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 blur-[100px] rounded-full mt-[-100px] mr-[-100px]" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-600/10 blur-[100px] rounded-full mb-[-100px] ml-[-100px]" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-6 uppercase">Institutional Plans.</h2>
            <p className="text-lg text-gray-400 font-medium">Simple, predictable pricing for schools of all sizes.</p>
          </div>

          <div className="max-w-xl mx-auto">
            <div className="p-10 md:p-16 rounded-[60px] bg-white border-2 border-blue-600 shadow-2xl shadow-blue-600/20 text-center relative overflow-hidden group">
              <div className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest py-2 px-6 rounded-bl-3xl">Affordable for All</div>
              
              <h3 className="text-3xl font-black text-gray-900 mb-2 uppercase tracking-tight">Institutional Plan</h3>
              <p className="text-gray-500 font-medium mb-8">Everything included, no hidden fees.</p>
              
              <div className="flex flex-col items-center gap-1 mb-12">
                <div className="flex items-baseline gap-2">
                  <span className="text-7xl font-black text-gray-900 tracking-tighter">₦1,000</span>
                  <span className="text-lg font-bold text-gray-400 uppercase tracking-widest">/ term</span>
                </div>
                <p className="text-sm font-black text-blue-600 uppercase tracking-widest mt-2">Per Student</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12 text-left">
                {[
                  "Unlimited Staff Access",
                  "Digital Result Portal",
                  "Fee Tracking & Receipts",
                  "Attendance Management",
                  "Parent Portal Access",
                  "Gate Pass Security"
                ].map(f => (
                  <div key={f} className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center shrink-0">
                      <Check size={12} />
                    </div>
                    <span className="text-sm font-bold text-gray-600 uppercase tracking-tight">{f}</span>
                  </div>
                ))}
              </div>

              <Link to="/login" className="w-full py-6 rounded-3xl bg-blue-600 text-white font-black text-sm uppercase tracking-widest shadow-xl shadow-blue-600/30 hover:bg-blue-700 transition-all active:scale-95 block">
                Register Your School Now
              </Link>
              
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-8">
                * Minimum of 50 students per term applies
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Documentation Section */}
      <section id="documentation" className="py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gray-50 p-12 md:p-20 rounded-[60px] border border-dashed border-gray-200 flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 space-y-8 text-center md:text-left">
              <h2 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight uppercase leading-[0.9]">READY TO<br/><span className="text-blue-600">MODERNIZE?</span></h2>
              <p className="text-lg text-gray-500 font-medium">Explore our documentation to understand how to set up your school in minutes.</p>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                <Link to="/login" className="bg-gray-900 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-gray-800 transition-all active:scale-95">Read Docs</Link>
                <Link to="/login" className="bg-white border-2 border-gray-100 text-gray-900 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:border-blue-600 transition-all active:scale-95">Support Center</Link>
              </div>
            </div>
            <div className="flex-1 w-full grid grid-cols-2 gap-4">
              {[
                { label: "Onboarding", icon: Users },
                { label: "Data Import", icon: Globe },
                { label: "API Access", icon: Lock },
                { label: "Reports", icon: BarChart3 }
              ].map(item => (
                <div key={item.label} className="bg-white p-6 rounded-3xl border shadow-sm flex flex-col items-center text-center gap-3">
                  <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                    <item.icon size={20} />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-gray-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
              <Shield size={18} />
            </div>
            <span className="font-black text-xl tracking-tight text-gray-900 uppercase">School<span className="text-blue-600">Pulse</span></span>
          </div>
          <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">© 2026 SchoolPulse Nigeria. All rights reserved.</p>
          <div className="flex items-center gap-6">
            {['Privacy', 'Terms', 'Security'].map(item => (
              <a key={item} href="#" className="text-xs font-black text-gray-400 hover:text-blue-600 transition-colors uppercase tracking-widest">{item}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
