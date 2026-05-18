import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Search, 
  Filter, 
  Download, 
  Calendar,
  CheckCircle2,
  XCircle,
  Clock,
  ChevronRight,
  MoreVertical
} from 'lucide-react';
import { cn } from '../../lib/utils';

export default function AttendanceModule() {
  const students = [
    { id: '1', name: 'Ifeoluwa Okoro', status: 'Present', time: '07:45 AM', streak: 12 },
    { id: '2', name: 'Musa Garba', status: 'Absent', time: '-', streak: 0 },
    { id: '3', name: 'Zainab Ahmed', status: 'Late', time: '08:15 AM', streak: 8 },
    { id: '4', name: 'Ezekiel James', status: 'Present', time: '07:30 AM', streak: 21 },
    { id: '5', name: 'Chinonso Uche', status: 'Present', time: '07:55 AM', streak: 5 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Attendance Tracking</h2>
          <p className="text-gray-500 text-sm">Term 2, Week 6 • Tuesday, June 16, 2026</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 bg-white border px-4 py-2.5 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 transition-all shadow-sm">
            <Download size={18} /> Export Report
          </button>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20">
            <Calendar size={18} /> Today's Roll Call
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Present Today', val: '88%', change: '+2%', color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Avg Late Comers', val: '5', change: '-2', color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Longest Streak', val: '21 Days', change: 'Ezekiel J.', color: 'text-blue-600', bg: 'bg-blue-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border shadow-sm">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
            <div className="flex items-end justify-between">
              <p className="text-2xl font-black text-gray-900">{stat.val}</p>
              <span className={cn("text-[10px] font-bold px-2 py-1 rounded-lg", stat.bg, stat.color)}>{stat.change}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-[32px] border shadow-sm overflow-hidden">
        <div className="p-6 border-b flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input type="text" placeholder="Search by name or roll number..." className="w-full bg-gray-50 border rounded-xl py-2.5 pl-12 pr-4 text-sm font-medium outline-none focus:border-blue-600 focus:bg-white transition-all" />
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2.5 border rounded-xl hover:bg-gray-50 text-gray-500 transition-all"><Filter size={18} /></button>
            <select className="bg-gray-50 border rounded-xl px-4 py-2.5 text-sm font-bold text-gray-700 outline-none cursor-pointer">
              <option>JSS3 B</option>
              <option>SS2 A</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 border-b">
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Student</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Arrival</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Streak</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50/50 transition-colors cursor-pointer group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center font-bold text-gray-400">
                        {student.name[0]}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors uppercase tracking-tight">{student.name}</p>
                        <p className="text-xs text-gray-500 uppercase tracking-tighter">Roll No: SP-2026-00{student.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm font-bold text-gray-600">
                      <Clock size={14} className="text-gray-400" /> {student.time}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg inline-flex items-center gap-1",
                      student.status === 'Present' ? 'bg-emerald-50 text-emerald-600' :
                      student.status === 'Late' ? 'bg-amber-50 text-amber-600' : 'bg-red-50 text-red-600'
                    )}>
                      {student.status === 'Present' ? <CheckCircle2 size={12} /> : 
                       student.status === 'Late' ? <Clock size={12} /> : <XCircle size={12} />}
                      {student.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 w-12 bg-gray-100 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-blue-600 h-full rounded-full" style={{ width: `${Math.min(100, student.streak * 5)}%` }}></div>
                      </div>
                      <span className="text-xs font-bold text-gray-500">{student.streak}d</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-gray-300 hover:text-gray-900"><MoreVertical size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
