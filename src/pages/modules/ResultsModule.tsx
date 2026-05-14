import React from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Search, 
  Filter, 
  ChevronRight, 
  FileText, 
  Download, 
  Upload, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import { cn, getGrade } from '../../lib/utils';

export default function ResultsModule() {
  const [selectedClass, setSelectedClass] = React.useState('SS 1 Sci');
  
  const subjects = [
    { name: 'Mathematics', teacher: 'Mr. Okoro', status: 'Published', progress: 100 },
    { name: 'English Language', teacher: 'Mrs. Adeosun', status: 'Vetting', progress: 85 },
    { name: 'Physics', teacher: 'Mr. Nelson', status: 'Pending', progress: 0 },
    { name: 'Chemistry', teacher: 'Mrs. Bello', status: 'Published', progress: 100 },
    { name: 'Biology', teacher: 'Mr. Eze', status: 'Draft', progress: 40 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Results Management</h2>
          <p className="text-gray-500 text-sm">Batch: Term 2 Examination 2024</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 bg-white border px-4 py-2.5 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 transition-all shadow-sm">
            <Upload size={18} />
            Bulk Upload
          </button>
          <button className="flex items-center gap-2 bg-emerald-600 px-4 py-2.5 rounded-xl text-sm font-bold text-white hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20">
            <FileText size={18} />
            Generate All Bulk PDFs
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-2xl border shadow-sm">
            <label className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-4">Select Class</label>
            <div className="space-y-2">
              {['JSS 1', 'JSS 2', 'JSS 3', 'SS 1 Sci', 'SS 1 Art', 'SS 2 Sci'].map(cls => (
                <button
                  key={cls}
                  onClick={() => setSelectedClass(cls)}
                  className={cn(
                    "w-full flex items-center justify-between px-4 py-3 rounded-xl border text-sm font-bold transition-all",
                    selectedClass === cls 
                      ? "bg-blue-50 border-blue-600 text-blue-600" 
                      : "bg-white border-gray-100 text-gray-700 hover:border-blue-200 shadow-sm"
                  )}
                >
                  {cls}
                  <ChevronRight size={16} />
                </button>
              ))}
            </div>
          </div>
          
          <div className="bg-emerald-900 text-white p-6 rounded-2xl shadow-xl shadow-emerald-900/20 relative overflow-hidden group">
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform"></div>
            <h4 className="text-sm font-bold uppercase tracking-widest opacity-80 mb-1">Publish Status</h4>
            <p className="text-2xl font-black">64%</p>
            <div className="w-full bg-white/20 h-1.5 rounded-full mt-3 overflow-hidden">
              <div className="bg-emerald-400 h-full w-[64%]"></div>
            </div>
            <p className="text-xs mt-3 opacity-60">8 of 14 classes published</p>
          </div>
        </div>

        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white rounded-3xl border shadow-sm overflow-hidden">
            <div className="p-6 border-b flex items-center justify-between">
              <h3 className="font-bold text-lg text-gray-900">Subject Submission Stats - {selectedClass}</h3>
              <div className="flex items-center gap-2">
                <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg"><Filter size={18} /></button>
                <div className="h-6 w-px bg-gray-100 mx-2"></div>
                <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg"><Search size={18} /></button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Subject</th>
                    <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Teacher</th>
                    <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Progress</th>
                    <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Status</th>
                    <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {subjects.map((sub, i) => (
                    <tr key={i} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="px-6 py-4">
                        <p className="font-bold text-gray-900">{sub.name}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium text-gray-600">{sub.teacher}</p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex-1 min-w-[80px] bg-gray-100 h-1.5 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${sub.progress}%` }}
                              className={cn(
                                "h-full",
                                sub.progress === 100 ? "bg-emerald-500" : "bg-blue-500"
                              )}
                            />
                          </div>
                          <span className="text-xs font-bold text-gray-500">{sub.progress}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={cn(
                          "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest inline-flex items-center gap-1",
                          sub.status === 'Published' ? "bg-emerald-50 text-emerald-600" :
                          sub.status === 'Vetting' ? "bg-amber-50 text-amber-600" :
                          "bg-gray-100 text-gray-500"
                        )}>
                          {sub.status === 'Published' && <CheckCircle2 size={12} />}
                          {sub.status === 'Vetting' && <Clock size={12} />}
                          {sub.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                          <ChevronRight size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-gray-900 text-white rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -z-0"></div>
            <div className="relative z-10">
              <h3 className="text-2xl font-black mb-2 tracking-tight">Ready to Publish Term 2 Results?</h3>
              <p className="text-blue-200">Once published, parents will receive notifications and report cards will be accessible via their dashboards.</p>
            </div>
            <button className="relative z-10 bg-white text-gray-900 px-8 py-4 rounded-2xl font-bold hover:bg-blue-50 transition-all flex items-center gap-2 whitespace-nowrap active:scale-95 shadow-xl shadow-white/10">
              Go to Vetting Center <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

import { ArrowRight } from 'lucide-react';
