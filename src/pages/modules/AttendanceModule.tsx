import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Search, 
  ChevronRight,
  Filter,
  Download,
  Plus
} from 'lucide-react';
import { cn } from '../../lib/utils';

export default function AttendanceModule() {
  const [selectedClass, setSelectedClass] = React.useState('JSS 1A');
  const [activeTab, setActiveTab] = React.useState('mark');

  const students = [
    { id: '1', name: 'Abubakar Ibrahim', status: 'present' },
    { id: '2', name: 'Chioma Adeyemi', status: 'late' },
    { id: '3', name: 'Efe Omokaro', status: 'absent' },
    { id: '4', name: 'Godwin Uzochi', status: 'present' },
    { id: '5', name: 'Hauwa Mohammed', status: 'present' },
    { id: '6', name: 'Ifeanyi Okafor', status: 'present' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Attendance Tracking</h2>
          <p className="text-gray-500 text-sm">Term 2, Week 6 • Tuesday, June 16, 2026</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 bg-white border px-4 py-2.5 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 transition-all shadow-sm">
            <Download size={18} />
            Report
          </button>
          <button className="flex items-center gap-2 bg-blue-600 px-4 py-2.5 rounded-xl text-sm font-bold text-white hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20">
            <Plus size={18} />
            Bulk Import
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center p-1 bg-gray-100 rounded-2xl w-fit">
        {['mark', 'history', 'analytics'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "px-6 py-2.5 rounded-xl text-sm font-bold transition-all uppercase tracking-widest",
              activeTab === tab ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-900"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters Panel */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-2xl border shadow-sm space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] px-1">Select Class</label>
              <div className="grid grid-cols-1 gap-2">
                {['JSS 1A', 'JSS 1B', 'JSS 2A', 'JSS 2B', 'SS 1 Sci', 'SS 1 Art'].map(cls => (
                  <button
                    key={cls}
                    onClick={() => setSelectedClass(cls)}
                    className={cn(
                      "flex items-center justify-between px-4 py-3 rounded-xl border text-sm font-bold transition-all",
                      selectedClass === cls 
                        ? "bg-blue-50 border-blue-600 text-blue-600" 
                        : "bg-white border-gray-100 text-gray-700 hover:border-blue-200"
                    )}
                  >
                    {cls}
                    {selectedClass === cls && <ChevronRight size={16} />}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white rounded-3xl border shadow-sm overflow-hidden">
            <div className="p-6 border-b flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Search student name..."
                  className="w-full bg-gray-50 border rounded-xl py-2.5 pl-12 pr-4 text-sm font-medium focus:ring-2 ring-blue-50 focus:border-blue-600 outline-none transition-all"
                />
              </div>
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Present</p>
                  <p className="text-lg font-black text-emerald-600">42/50</p>
                </div>
                <div className="h-8 w-px bg-gray-100 hidden md:block"></div>
                <div className="text-center">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Rate</p>
                  <p className="text-lg font-black text-blue-600">84%</p>
                </div>
              </div>
            </div>

            <div className="divide-y overflow-x-auto">
              {students.map((student, i) => (
                <div key={student.id} className="p-4 md:p-6 flex items-center justify-between hover:bg-gray-50/50 transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center font-bold text-gray-600 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                      {i + 1}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{student.name}</p>
                      <p className="text-xs text-gray-500 uppercase tracking-tighter">Roll No: SP-2026-00{student.id}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {[
                      { icon: CheckCircle2, label: 'Present', color: 'text-emerald-500 bg-emerald-50' },
                      { icon: Clock, label: 'Late', color: 'text-amber-500 bg-amber-50' },
                      { icon: XCircle, label: 'Absent', color: 'text-red-500 bg-red-50' },
                    ].map((status) => (
                      <button
                        key={status.label}
                        className={cn(
                          "px-3 py-2 md:px-5 md:py-3 rounded-2xl flex flex-col items-center gap-1 transition-all border border-transparent hover:border-gray-200",
                          student.status.toLowerCase() === status.label.toLowerCase() 
                            ? `${status.color} border-current opacity-100 shadow-inner` 
                            : "opacity-40 grayscale hover:opacity-100 hover:grayscale-0"
                        )}
                      >
                        <status.icon size={18} />
                        <span className="text-[10px] font-black uppercase tracking-widest">{status.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 bg-gray-50 border-t flex justify-end">
              <button className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold hover:shadow-xl shadow-blue-600/20 active:scale-95 transition-all">
                Publish Today's Attendance
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
