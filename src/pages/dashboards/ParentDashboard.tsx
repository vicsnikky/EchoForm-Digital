import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  MapPin, 
  CheckCircle2, 
  FileText, 
  CreditCard, 
  Download,
  Calendar,
  MessageCircle,
  ArrowRight,
  TrendingUp,
  Award
} from 'lucide-react';
import { cn, formatCurrency } from '../../lib/utils';

export default function ParentDashboard() {
  const children = [
    { id: '1', name: 'Ifeoluwa Okoro', class: 'JSS3 B', status: 'In School', avatar: 'IO' },
    { id: '2', name: 'Chisom Okoro', class: 'Primary 4', status: 'At Home', avatar: 'CO' },
  ];

  const [selectedChild, setSelectedChild] = React.useState(children[0]);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-blue-600 font-medium text-sm">Welcome back, Mr. Okoro</p>
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Ward Overview</h2>
        </div>
        <div className="flex items-center gap-4 bg-white p-2 rounded-2xl border shadow-sm">
          {children.map((child) => (
            <button
              key={child.id}
              onClick={() => setSelectedChild(child)}
              className={cn(
                "px-4 py-2 rounded-xl text-sm font-bold transition-all",
                selectedChild.id === child.id 
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30" 
                  : "text-gray-400 hover:text-gray-900"
              )}
            >
              {child.name.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Child Profile Card */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-8 rounded-[32px] border shadow-sm relative overflow-hidden">
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 text-center">
              <div className="w-32 h-32 bg-blue-50 text-blue-600 rounded-full border-4 border-white shadow-xl flex items-center justify-center text-3xl font-black">
                {selectedChild.avatar}
              </div>
              <div className="flex-1 text-left">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-3xl font-black text-gray-900 tracking-tight uppercase leading-none">{selectedChild.name}</h3>
                </div>
                <p className="text-lg font-bold text-gray-500 uppercase tracking-tight">{selectedChild.class}</p>
                <div className="flex items-center gap-3 pt-4">
                  <span className="flex items-center gap-1.5 text-xs font-bold bg-blue-50 text-blue-100 px-3 py-1.5 rounded-full">
                    <MapPin size={12} /> Roll: SP-2026-042
                  </span>
                  <span className={cn(
                    "flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full",
                    selectedChild.status === 'In School' ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
                  )}>
                    <CheckCircle2 size={12} /> {selectedChild.status}
                  </span>
                </div>
              </div>
              <div className="flex md:flex-col gap-2 w-full md:w-auto">
                <button className="flex-1 md:w-full bg-gray-900 text-white px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-gray-800 transition-all">
                  <FileText size={16} /> Full Report
                </button>
                <button className="flex-1 md:w-full bg-white text-gray-900 border px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-gray-50 transition-all">
                  <MessageCircle size={16} /> Contact Admin
                </button>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50/50 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-8 rounded-[32px] border shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <h4 className="font-bold text-gray-900 uppercase tracking-widest text-xs">Recent Performance</h4>
                <TrendingUp size={18} className="text-emerald-500" />
              </div>
              <div className="space-y-5">
                {[
                  { subject: 'Mathematics', score: '88/100', trend: 'up' },
                  { subject: 'English Lang.', score: '92/100', trend: 'up' },
                  { subject: 'Chemistry', score: '74/100', trend: 'down' },
                ].map((s, i) => (
                  <div key={i} className="flex items-center justify-between group cursor-pointer">
                    <p className="text-sm font-bold text-gray-700 group-hover:text-blue-600 transition-colors uppercase tracking-tight">{s.subject}</p>
                    <p className="text-sm font-black text-gray-900 bg-gray-50 px-2 py-1 rounded">{s.score}</p>
                  </div>
                ))}
                <button className="w-full mt-4 flex items-center justify-center gap-2 text-sm font-black text-blue-600 bg-blue-50 py-3 rounded-2xl hover:bg-blue-100 transition-all uppercase tracking-widest text-xs">
                  View Detailed Results <ArrowRight size={14} />
                </button>
              </div>
            </div>

            <div className="bg-white p-8 rounded-[32px] border shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <h4 className="font-bold text-gray-900 uppercase tracking-widest text-xs">Term 2 Attendance</h4>
                <Calendar size={18} className="text-blue-600" />
              </div>
              <div className="flex items-end gap-3 mb-6">
                <span className="text-5xl font-black text-gray-900 leading-none">94%</span>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">+2.1% from prev. term</span>
              </div>
              <div className="flex gap-1 h-3 mb-6">
                {[...Array(20)].map((_, i) => (
                  <div key={i} className={cn(
                    "flex-1 rounded-full",
                    i < 18 ? "bg-emerald-500" : (i === 18 ? "bg-amber-400" : "bg-red-400")
                  )}></div>
                ))}
              </div>
              <p className="text-xs text-gray-500 font-medium leading-relaxed italic text-center">Consistent attendance recorded for {selectedChild.name.split(' ')[0]}.</p>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* Fee Card */}
          <div className="bg-blue-600 p-8 rounded-[40px] text-white shadow-2xl relative overflow-hidden group">
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-10">
                <CreditCard size={28} />
                <span className="text-[10px] font-black uppercase tracking-widest bg-white/20 px-3 py-1.5 rounded-full">Outstanding Balance</span>
              </div>
              <p className="text-4xl font-black mb-4 tracking-tighter leading-none">{formatCurrency(45000)}</p>
              <p className="text-sm font-bold text-blue-100 mb-8 uppercase tracking-widest opacity-80">Term 2 Tuition • Due Jun 30</p>
              <button className="w-full bg-white text-blue-600 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-xl active:scale-95">
                Pay Securely Now
              </button>
            </div>
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-white/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700"></div>
          </div>

          <div className="bg-white p-8 rounded-[32px] border shadow-sm">
            <h4 className="font-black text-gray-900 mb-6 flex items-center gap-2 uppercase tracking-widest text-xs">
              <Award size={18} className="text-amber-500" /> Notifications
            </h4>
            <div className="space-y-6">
              {[
                { title: 'New Result Uploaded', desc: 'Mid-term results for Science', time: '2h ago' },
                { title: 'School Excursion', desc: 'Consent form required for Lagos Zoo', time: '1d ago' },
              ].map((notif, i) => (
                <div key={i} className="space-y-1 relative pl-4 border-l-2 border-gray-100 hover:border-blue-600 transition-colors">
                  <p className="text-sm font-black text-gray-900 group">{notif.title}</p>
                  <p className="text-xs text-gray-500 font-medium leading-relaxed">{notif.desc}</p>
                  <p className="text-[10px] font-bold text-gray-400 mt-2">{notif.time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
