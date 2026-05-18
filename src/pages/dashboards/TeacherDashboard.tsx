import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  BookOpen, 
  Calendar, 
  Clock, 
  ChevronRight, 
  TrendingUp, 
  Award,
  Shield,
  FileText,
  Upload,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { cn } from '../../lib/utils';

export default function TeacherDashboard() {
  const classes = [
    { name: 'JSS3 Mathematics', time: '08:30 AM', students: 45, room: 'Hall 1' },
    { name: 'SS2 Further Maths', time: '10:45 AM', students: 32, room: 'Lab B' },
    { name: 'Pry 4 English', time: '01:15 PM', students: 28, room: 'Class 4' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Mr. Okoro</h2>
            <div className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-lg text-[10px] font-black tracking-widest mt-1">
              STAFF ID: TCH-001
            </div>
          </div>
          <div className="flex gap-2 mt-2">
            {['Class Teacher', 'Subject Teacher'].map(role => (
              <span key={role} className="text-[10px] font-bold bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full uppercase tracking-tight">
                {role}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2 text-gray-400 bg-white px-4 py-2 rounded-xl border-dashed border-2 shadow-sm font-bold text-sm">
          <Shield size={16} className="text-blue-600" /> SCH-PULSE-8241
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: 'Assigned Students', val: '105', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
              { label: 'Pending Gradings', val: '42', icon: FileText, color: 'text-amber-600', bg: 'bg-amber-50' },
              { label: 'Performance', val: '+4.2%', icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
            ].map((stat, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border shadow-sm flex items-center gap-4">
                <div className={cn("p-3 rounded-xl", stat.bg, stat.color)}>
                  <stat.icon size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase">{stat.label}</p>
                  <p className="text-xl font-bold text-gray-900">{stat.val}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white p-8 rounded-[32px] border shadow-sm">
            <h3 className="font-bold text-xl text-gray-900 tracking-tight mb-6">Today's Schedule</h3>
            <div className="space-y-4">
              {classes.map((cls, i) => (
                <div key={i} className="flex items-center justify-between p-5 rounded-2xl bg-gray-50/50 hover:bg-white border hover:border-gray-200 transition-all group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-xl border flex flex-col items-center justify-center">
                      <span className="text-[10px] font-bold text-gray-400">TERM</span>
                      <span className="text-xs font-black text-gray-900">T2</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors uppercase tracking-tight">{cls.name}</h4>
                      <p className="text-xs text-gray-500 font-medium">{cls.time} • Room {cls.room}</p>
                    </div>
                  </div>
                  <button className="p-2 text-gray-300 group-hover:text-gray-900">
                    <ChevronRight size={20} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-8 rounded-[32px] border shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="font-bold text-xl text-gray-900 tracking-tight">Curriculum Vetting</h3>
                <p className="text-sm text-gray-500">Upload questions for admin approval before examinations.</p>
              </div>
              <button className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20">
                <Upload size={16} /> Upload New
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { title: 'JSS3 Math Final', status: 'Accepted', date: '2 days ago', feedback: 'Perfect structured format.' },
                { title: 'SS2 Further Maths', status: 'Rejected', date: '5 hours ago', feedback: 'Questions 4 & 7 are out of current syllabus.' },
                { title: 'Pry 4 English', status: 'Pending', date: 'Just now', feedback: 'Waiting for Admin vetting...' },
              ].map((vet, i) => (
                <div key={i} className="p-5 rounded-2xl border border-gray-50 bg-gray-50/30">
                  <div className="flex items-start justify-between mb-3 text-center">
                    <div className="flex items-center gap-2">
                      <FileText size={18} className="text-blue-600" />
                      <p className="font-bold text-gray-900">{vet.title}</p>
                    </div>
                    <span className={cn(
                      "text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded",
                      vet.status === 'Accepted' ? 'bg-emerald-100 text-emerald-700' :
                      vet.status === 'Rejected' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                    )}>
                      {vet.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 font-medium mb-4 leading-relaxed">"{vet.feedback}"</p>
                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-gray-400">{vet.date}</span>
                    {vet.status === 'Rejected' && (
                      <button className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline flex items-center gap-1">
                        Edit & Resubmit <ChevronRight size={10} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white p-8 rounded-[32px] border shadow-sm">
            <h3 className="font-bold text-lg text-gray-900 mb-6">Upcoming Tasks</h3>
            <div className="space-y-4">
              {[
                { task: 'Submit Exam Grades', due: 'Tomorrow', urgency: 'High' },
                { task: 'Parent-Teacher Meeting', due: 'Friday', urgency: 'Medium' },
                { task: 'Lesson Plan Review', due: '24 Jun', urgency: 'Normal' },
              ].map((task, i) => (
                <div key={i} className="p-4 rounded-2xl border bg-white flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-gray-900">{task.task}</p>
                    <p className="text-xs text-gray-500 font-medium">{task.due}</p>
                  </div>
                  <span className={cn(
                    "w-2 h-2 rounded-full",
                    task.urgency === 'High' ? 'bg-red-500' : 
                    task.urgency === 'Medium' ? 'bg-amber-500' : 'bg-blue-500'
                  )}></span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
