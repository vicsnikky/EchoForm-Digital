import React from 'react';
import { motion } from 'framer-motion';
import { 
  ClipboardCheck, 
  BookOpen, 
  FileUp, 
  MessageSquare,
  Clock,
  ChevronRight,
  TrendingUp,
  Award
} from 'lucide-react';
import { cn } from '../../lib/utils';

export default function TeacherDashboard() {
  const classes = [
    { name: 'JSS 1A', subject: 'Mathematics', strength: 48, attendance: '92%', status: 'Present' },
    { name: 'SS 2 Sci', subject: 'Further Maths', strength: 24, attendance: '100%', status: 'Upcoming' },
    { name: 'JSS 3C', subject: 'Mathematics', strength: 52, attendance: '-', status: 'Scheduled' },
  ];

  const tasks = [
    { title: 'Submit CA 2 Scores', deadline: 'Today, 4:00 PM', priority: 'High', type: 'Result' },
    { title: 'Vet English Exam Paper', deadline: 'Tomorrow', priority: 'Medium', type: 'Document' },
    { title: 'Mark Attendance SS 2 Sci', deadline: 'In 2 hours', priority: 'Normal', type: 'Attendance' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-emerald-600 font-medium text-sm">Good morning, Mr. Okoro</p>
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Today's Schedule</h2>
        </div>
        <div className="flex items-center gap-2 text-gray-500 bg-white px-4 py-2 rounded-xl border-dashed border-2 shadow-sm">
          <Clock size={18} />
          <span className="text-sm font-medium">Tuesday, June 14, 2024</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Classes Column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-blue-600 text-white p-6 rounded-3xl shadow-xl shadow-blue-600/20 relative overflow-hidden group cursor-pointer">
              <div className="absolute -right-4 -top-4 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
              <ClipboardCheck size={40} className="mb-4 opacity-80" />
              <h3 className="text-xl font-black mb-1">Mark Attendance</h3>
              <p className="text-blue-100 text-sm">Next: SS 2 Science (11:00 AM)</p>
              <div className="mt-6 flex items-center gap-2 text-xs font-bold uppercase tracking-widest bg-white/20 w-fit px-3 py-1.5 rounded-full">
                Quick Action <ChevronRight size={14} />
              </div>
            </div>

            <div className="bg-emerald-600 text-white p-6 rounded-3xl shadow-xl shadow-emerald-600/20 relative overflow-hidden group cursor-pointer">
              <div className="absolute -right-4 -top-4 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
              <BookOpen size={40} className="mb-4 opacity-80" />
              <h3 className="text-xl font-black mb-1">Enter Scores</h3>
              <p className="text-emerald-100 text-sm">JSS 1A Math • CA 2 Test</p>
              <div className="mt-6 flex items-center gap-2 text-xs font-bold uppercase tracking-widest bg-white/20 w-fit px-3 py-1.5 rounded-full">
                Open Gradebook <ChevronRight size={14} />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border shadow-sm">
            <h3 className="font-bold text-gray-900 text-lg mb-6 flex items-center justify-between">
              Assigned Classes
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">Term 2</span>
            </h3>
            <div className="space-y-4">
              {classes.map((cls, i) => (
                <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl border border-gray-100 hover:border-blue-200 transition-all hover:bg-blue-50/10 group cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center font-bold text-gray-600 group-hover:bg-blue-100 group-hover:text-blue-600">
                      {cls.name.split(' ')[0]}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{cls.name} <span className="text-xs text-gray-400 font-medium tracking-tight">({cls.subject})</span></h4>
                      <p className="text-xs text-gray-500 font-medium">Strength: {cls.strength} Students</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 mt-4 sm:mt-0 pt-4 sm:pt-0 border-t sm:border-0 border-gray-50">
                    <div className="text-center">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Attendance</p>
                      <p className="text-sm font-bold text-gray-900">{cls.attendance}</p>
                    </div>
                    <span className={cn(
                      "px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest",
                      cls.status === 'Present' ? "bg-emerald-50 text-emerald-600" :
                      cls.status === 'Upcoming' ? "bg-blue-50 text-blue-600" :
                      "bg-gray-100 text-gray-500"
                    )}>
                      {cls.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tasks & Notifications Column */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border shadow-sm">
            <h3 className="font-bold text-gray-900 text-lg mb-6 flex items-center gap-2">
              <TrendingUp size={20} className="text-amber-500" />
              Pending Tasks
            </h3>
            <div className="space-y-4">
              {tasks.map((task, i) => (
                <div key={i} className="relative pl-6 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-gray-100 peer-hover:before:bg-blue-600 before:rounded-full group cursor-pointer transition-all">
                  <div className={cn(
                    "absolute left-0 top-1 w-1 h-4 rounded-full transition-colors",
                    task.priority === 'High' ? 'bg-red-500' : 'bg-amber-500'
                  )}></div>
                  <p className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{task.title}</p>
                  <p className="text-xs text-gray-500 mt-1 flex items-center gap-2 font-medium">
                    <Clock size={12} />
                    {task.deadline}
                  </p>
                </div>
              ))}
            </div>
            <button className="w-full mt-8 py-3 text-sm font-bold text-blue-600 hover:bg-blue-50 rounded-2xl transition-colors border-2 border-dashed border-blue-100">
              Personal Task List
            </button>
          </div>

          <div className="bg-amber-900 text-white p-6 rounded-3xl shadow-xl shadow-amber-900/20 relative overflow-hidden group">
            <Award size={48} className="text-amber-400/20 absolute -right-4 -bottom-4 rotate-12 group-hover:scale-125 transition-transform duration-500" />
            <h4 className="text-xs font-black uppercase tracking-[0.2em] opacity-60 mb-2">Announcement</h4>
            <p className="font-bold text-sm leading-relaxed">Staff meeting held tomorrow by 8:00 AM. Please ensure you've uploaded your vetting comments.</p>
            <p className="text-[10px] mt-4 opacity-40 font-bold uppercase tracking-widest text-right">— Admin Office</p>
          </div>

          <div className="bg-white p-6 rounded-3xl border shadow-sm">
            <h3 className="font-bold text-gray-900 text-lg mb-6">Recent Reports</h3>
            <div className="space-y-4">
              {[
                { name: 'CA 1 Summary', size: '1.2 MB', ext: 'PDF' },
                { name: 'Register - JSS 1A', size: '4.5 MB', ext: 'XLS' },
              ].map((f, i) => (
                <div key={i} className="flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-blue-50 transition-colors">
                      <FileUp size={16} className="text-gray-400 group-hover:text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">{f.name}</p>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{f.ext} • {f.size}</p>
                    </div>
                  </div>
                  <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all opacity-0 group-hover:opacity-100">
                    <ChevronRight size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
