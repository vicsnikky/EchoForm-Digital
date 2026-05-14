import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  MapPin, 
  CreditCard, 
  BookOpen, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
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
    { id: 'c1', name: 'Zainab Abubakar', class: 'SS 2 Science', attendance: '98%', fees: 'Paid', progress: 84 },
    { id: 'c2', name: 'Mustafa Abubakar', class: 'JSS 1A', attendance: '82%', fees: 'Pending', progress: 72 },
  ];

  const [selectedChild, setSelectedChild] = React.useState(children[0]);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="text-blue-600 font-medium text-sm">Welcome back, Mr. Abubakar</p>
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Child Management</h2>
        </div>
        
        {/* Child Selector */}
        <div className="flex p-1 bg-gray-100 rounded-2xl w-fit">
          {children.map(child => (
            <button
              key={child.id}
              onClick={() => setSelectedChild(child)}
              className={cn(
                "px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2",
                selectedChild.id === child.id ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-900"
              )}
            >
              <div className={cn(
                "w-2 h-2 rounded-full",
                selectedChild.id === child.id ? "bg-blue-600" : "bg-gray-300"
              )}></div>
              {child.name.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Child Profile & Stats */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-8 rounded-[32px] border shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 scale-150 opacity-5 group-hover:scale-[1.7] transition-transform duration-1000">
              <Users size={120} className="text-blue-900" />
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center gap-6 relative z-10">
              <div className="w-24 h-24 bg-blue-100 text-blue-600 rounded-3xl flex items-center justify-center font-black text-4xl shadow-xl shadow-blue-500/10 border-4 border-white">
                {selectedChild.name[0]}
              </div>
              <div className="space-y-1">
                <h3 className="text-2xl font-black text-gray-900 tracking-tight">{selectedChild.name}</h3>
                <p className="text-lg font-bold text-gray-500">{selectedChild.class}</p>
                <div className="flex items-center gap-3 pt-2">
                  <span className="flex items-center gap-1.5 text-xs font-bold bg-blue-50 text-blue-600 px-3 py-1.5 rounded-full">
                    <MapPin size={12} /> Roll: SP-2026-042
                  </span>
                  <span className={cn(
                    "flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full",
                    selectedChild.fees === 'Paid' ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
                  )}>
                    <CreditCard size={12} /> {selectedChild.fees}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10">
              {[
                { label: 'Attendance', value: selectedChild.attendance, icon: CheckCircle2, color: 'emerald' },
                { label: 'Term Avg', value: selectedChild.progress + '%', icon: TrendingUp, color: 'blue' },
                { label: 'Position', value: '4th', icon: Award, color: 'amber' },
                { label: 'Conduct', value: 'Good', icon: MessageCircle, color: 'purple' },
              ].map((stat) => (
                <div key={stat.label} className="p-4 bg-gray-50 rounded-2xl border border-transparent hover:border-gray-200 transition-all text-center group cursor-pointer">
                  <stat.icon size={20} className={`mx-auto mb-2 text-${stat.color}-500 group-hover:scale-110 transition-transform`} />
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{stat.label}</p>
                  <p className="text-lg font-black text-gray-900 mt-1">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* View Results Card */}
            <div className="bg-blue-950 text-white p-8 rounded-[32px] shadow-2xl shadow-blue-900/30 relative overflow-hidden group cursor-pointer">
              <div className="absolute -right-6 -top-6 w-32 h-32 bg-blue-600/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
              <BookOpen size={48} className="text-blue-400 mb-6 group-hover:rotate-12 transition-transform" />
              <h4 className="text-2xl font-black mb-2 tracking-tight">Academic Results</h4>
              <p className="text-blue-200 text-sm mb-8 leading-relaxed">Term 2 examination results are now published. View detailed subject scores and download report card.</p>
              <div className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.2em] bg-blue-600/50 w-fit px-4 py-2 rounded-full border border-blue-400/30 group-hover:bg-blue-500 transition-colors">
                View Now <ArrowRight size={16} />
              </div>
            </div>

            {/* Fee Management Card */}
            <div className="bg-white p-8 rounded-[32px] border shadow-sm flex flex-col justify-between group cursor-pointer hover:border-blue-200 transition-all">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-all">
                    <CreditCard size={24} />
                  </div>
                  <span className={cn(
                    "text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full",
                    selectedChild.fees === 'Paid' ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                  )}>
                    {selectedChild.fees === 'Paid' ? 'No balance' : 'Balance Due'}
                  </span>
                </div>
                <h4 className="text-xl font-black text-gray-900 mb-2">School Fees</h4>
                <p className="text-gray-500 text-sm">Review child's financial status, outstanding balances, and payment history.</p>
              </div>
              <div className="pt-8 flex items-center justify-between">
                <span className="text-2xl font-black text-gray-900">
                  {selectedChild.fees === 'Paid' ? '₦0' : '₦45,000'}
                </span>
                <button className="text-blue-600 hover:bg-blue-50 p-2 rounded-full transition-all">
                  <Download size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Side Panel: Calendar & Notices */}
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-white p-6 rounded-[32px] border shadow-sm">
            <h4 className="text-sm font-black text-gray-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
              <Calendar size={16} className="text-blue-600" />
              School Calendar
            </h4>
            <div className="space-y-6">
              {[
                { date: 'Jun 18', event: 'Mid-term Break Begins', type: 'Holiday', color: 'bg-red-50 text-red-600' },
                { date: 'Jun 22', event: 'Open Day / PTF Meeting', type: 'Event', color: 'bg-blue-50 text-blue-600' },
                { date: 'Jul 04', event: 'Term 3 Resumption', type: 'Academic', color: 'bg-emerald-50 text-emerald-600' },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 group cursor-pointer">
                  <div className="text-center min-w-[40px]">
                    <p className="text-xs font-black text-gray-900 uppercase tracking-tight">{item.date.split(' ')[0]}</p>
                    <p className="text-lg font-black text-blue-600 leading-none">{item.date.split(' ')[1]}</p>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{item.event}</p>
                    <span className={cn(
                      "text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded mt-1 inline-block",
                      item.color
                    )}>
                      {item.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-8 py-3 text-sm font-bold text-blue-600 hover:bg-blue-50 rounded-2xl transition-colors border-2 border-dashed border-blue-100">
              View Full Term Plan
            </button>
          </div>

          <div className="bg-emerald-950 text-white p-8 rounded-[32px] shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition-transform duration-500">
              <MessageCircle size={80} />
            </div>
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-emerald-400 mb-4">Latest Announcement</h4>
            <p className="text-sm font-medium leading-relaxed mb-6">Dear Parents, please be reminded that the Open Day meeting is mandatory for all students in exam-going classes.</p>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-300">
              <Clock size={12} /> Posted 2 hours ago
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-[32px] border border-dashed border-gray-200">
            <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Support</h4>
            <p className="text-xs text-gray-500 leading-relaxed">Having issues with result access or fee payments? Contact the bursary office or use our help center.</p>
            <button className="text-blue-600 font-bold text-xs uppercase tracking-widest mt-4 hover:underline">Get Help & Support</button>
          </div>
        </div>
      </div>
    </div>
  );
}
