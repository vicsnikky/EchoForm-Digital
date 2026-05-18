import React from 'react';
import { motion } from 'framer-motion';
import { 
  CreditCard, 
  Search, 
  Filter, 
  Download, 
  TrendingUp, 
  Clock, 
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  Plus
} from 'lucide-react';
import { cn, formatCurrency } from '../../lib/utils';

export default function FeeModule() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 text-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Fee Management</h2>
          <p className="text-gray-500 text-sm">Financial Oversight • Term 2, 2026</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 bg-white border px-4 py-2.5 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 transition-all shadow-sm">
            <Download size={18} /> Incomes Report
          </button>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20">
            <Plus size={18} /> Record Payment
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-gray-900 p-8 rounded-[40px] text-white shadow-2xl relative overflow-hidden md:col-span-2">
          <div className="relative z-10 flex flex-col md:flex-row justify-between gap-8 h-full">
            <div className="space-y-8">
              <div>
                <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em] mb-3">Expected Term 2 Revenue</p>
                <p className="text-5xl font-black tracking-tighter leading-none">{formatCurrency(12450000)}</p>
              </div>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Received</p>
                  <p className="text-xl font-bold">{formatCurrency(8120000)}</p>
                  <div className="mt-2 h-1 w-24 bg-white/10 rounded-full">
                    <div className="bg-emerald-400 h-full w-[65%] rounded-full shadow-[0_0_8px_rgba(52,211,153,0.5)]"></div>
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Outstanding</p>
                  <p className="text-xl font-bold">{formatCurrency(4330000)}</p>
                  <div className="mt-2 h-1 w-24 bg-white/10 rounded-full">
                    <div className="bg-amber-400 h-full w-[35%] rounded-full shadow-[0_0_8px_rgba(251,191,36,0.5)]"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-end">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-[24px] font-black tracking-tight text-lg shadow-2xl shadow-blue-600/20 transition-all active:scale-95 group">
                Open Cashflow <ChevronRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] -mr-48 -mt-48"></div>
        </div>

        <div className="bg-white p-8 rounded-[40px] border shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-black text-gray-900 uppercase tracking-widest text-[10px] mb-8">Defaulter Rate</h3>
            <div className="flex items-center gap-6 mb-8">
              <div className="w-24 h-24 rounded-full border-[12px] border-amber-50 flex items-center justify-center relative">
                <div className="absolute inset-0 rounded-full border-[12px] border-t-amber-400 border-l-transparent border-r-transparent border-b-transparent"></div>
                <span className="text-xl font-black text-gray-900">22%</span>
              </div>
              <div>
                <p className="text-[10px] font-black text-amber-600 bg-amber-50 px-2.5 py-1 rounded-lg uppercase tracking-tight inline-block mb-2">High Attention</p>
                <p className="text-xs text-gray-500 font-medium leading-relaxed">84 Students currently have outstanding tuition fees above 50%.</p>
              </div>
            </div>
          </div>
          <button className="w-full bg-gray-50 text-gray-900 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-gray-100 transition-all">Generate Dues List</button>
        </div>
      </div>

      <div className="bg-white rounded-[40px] border shadow-sm overflow-hidden">
        <div className="p-8 border-b flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h3 className="font-black text-xl text-gray-900 tracking-tight">Transaction Ledger</h3>
            <p className="text-sm text-gray-500 font-medium">Real-time payment logs and verification system.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input type="text" placeholder="Transaction ID..." className="bg-gray-50 border rounded-2xl py-2.5 pl-10 pr-4 text-xs font-bold outline-none focus:border-blue-600 transition-all w-full md:w-64" />
            </div>
            <button className="p-2.5 border rounded-2xl hover:bg-gray-50 text-gray-500"><Filter size={18} /></button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Date</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Student</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Description</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Amount</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                { date: 'Jun 16, 2026', student: 'Ifeoluwa O.', type: 'Tuition Fee', amount: 85000, status: 'Success' },
                { date: 'Jun 15, 2026', student: 'Musa Garba', type: 'Bus Fee', amount: 12000, status: 'Success' },
                { date: 'Jun 14, 2026', student: 'Zainab Ahmed', type: 'Tuition Fee', amount: 125000, status: 'Pending' },
                { date: 'Jun 14, 2026', student: 'Ezekiel J.', type: 'Uniform', amount: 8000, status: 'Success' },
                { date: 'Jun 13, 2026', student: 'Chinonso U.', type: 'Tuition Fee', amount: 45000, status: 'Failed' },
              ].map((tx, i) => (
                <tr key={i} className="hover:bg-gray-50/50 transition-colors cursor-pointer group">
                  <td className="px-8 py-6 text-xs text-gray-400 font-bold">{tx.date}</td>
                  <td className="px-8 py-6">
                    <p className="font-black text-gray-900 group-hover:text-blue-600 transition-colors uppercase tracking-tight text-sm">{tx.student}</p>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-[10px] font-bold text-gray-400 uppercase bg-gray-100 px-2 py-1 rounded">{tx.type}</span>
                  </td>
                  <td className="px-8 py-6 font-black text-gray-900">{formatCurrency(tx.amount)}</td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                      <div className={cn("w-1.5 h-1.5 rounded-full", tx.status === 'Success' ? 'bg-emerald-500' : tx.status === 'Pending' ? 'bg-amber-500' : 'bg-red-500')}></div>
                      <span className={cn("text-[10px] font-black uppercase tracking-widest", tx.status === 'Success' ? 'text-emerald-600' : tx.status === 'Pending' ? 'text-amber-600' : 'text-red-600')}>{tx.status}</span>
                    </div>
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
