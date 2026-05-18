import React from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Search, 
  Filter, 
  Download, 
  Upload, 
  CheckCircle2, 
  AlertCircle,
  Clock,
  ArrowRight
} from 'lucide-react';
import { cn, getGrade } from '../../lib/utils';

export default function ResultsModule() {
  const [selectedTerm, setSelectedTerm] = React.useState('Term 1');
  
  const subjects = [
    { name: 'Mathematics', average: 78, change: '+5%', test: 28, exam: 62 },
    { name: 'English Language', average: 82, change: '+2%', test: 24, exam: 68 },
    { name: 'Basic Science', average: 71, change: '-3%', test: 22, exam: 58 },
    { name: 'Civic Education', average: 88, change: 'Stable', test: 29, exam: 65 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 text-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Results Management</h2>
          <p className="text-gray-500 text-sm">Batch: Term 2 Examination 2026</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 bg-white border px-4 py-2.5 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 transition-all shadow-sm">
            <Upload size={18} /> Batch Upload
          </button>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20">
            <Download size={18} /> Broad Sheets
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {subjects.map((s, i) => (
          <div key={i} className="bg-white p-6 rounded-[32px] border shadow-sm relative overflow-hidden group">
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{s.name}</span>
                <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded", 
                  s.change.startsWith('+') ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
                )}>{s.change}</span>
              </div>
              <div className="flex items-end gap-2">
                <p className="text-3xl font-black text-gray-900">{s.average}%</p>
                <div className="bg-gray-900 text-white px-2 py-0.5 rounded text-[10px] font-bold mb-1">
                  Grade {getGrade(s.average)}
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-blue-50/50 rounded-full blur-2xl group-hover:scale-150 transition-transform"></div>
          </div>
        ))}
      </div>

      <div className="bg-white p-8 rounded-[40px] border shadow-sm overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h3 className="text-xl font-black text-gray-900 tracking-tight">Vetting Portal</h3>
            <p className="text-sm text-gray-500 font-medium">Review and approve results submitted by teachers.</p>
          </div>
          <div className="flex border p-1 rounded-2xl bg-gray-50">
            {['Pending', 'Rejected', 'Approved'].map(tab => (
              <button key={tab} className={cn(
                "px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all",
                tab === 'Pending' ? "bg-white text-gray-900 shadow-sm" : "text-gray-400 hover:text-gray-600"
              )}>{tab}</button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {[
            { subject: 'Advanced Mathematics', class: 'SS3 A', teacher: 'Mr. Okoro', stats: '42/45 Computed', progress: 92 },
            { subject: 'Government', class: 'SS2 C', teacher: 'Mrs. Adeosun', stats: '12/35 Computed', progress: 34 },
            { subject: 'Physics Practical', class: 'SS1 A', teacher: 'Engr. Obi', stats: '28/30 Computed', progress: 93 },
          ].map((item, i) => (
            <div key={i} className="p-6 rounded-3xl border border-gray-100 bg-gray-50/30 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all group flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-white rounded-2xl border flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                  <BookOpen size={24} />
                </div>
                <div>
                  <h4 className="font-black text-gray-900 tracking-tight uppercase group-hover:text-blue-600 transition-colors leading-none">{item.subject}</h4>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-2">{item.class} • {item.teacher}</p>
                </div>
              </div>
              
              <div className="flex-1 max-w-xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{item.stats}</span>
                  <span className="text-xs font-black text-gray-900">{item.progress}%</span>
                </div>
                <div className="h-2 bg-white rounded-full border overflow-hidden">
                  <div className="bg-blue-600 h-full rounded-full transition-all duration-1000" style={{ width: `${item.progress}%` }}></div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button className="bg-gray-900 text-white px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-gray-800 transition-all active:scale-95">Open Sheets</button>
                <button className="bg-white text-gray-400 border p-3 rounded-2xl hover:text-gray-900 transition-all"><ArrowRight size={18} /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
