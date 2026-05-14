import React from 'react';
import { motion } from 'framer-motion';
import { 
  CreditCard, 
  Search, 
  Filter, 
  ArrowUpRight, 
  ArrowDownLeft, 
  TrendingUp, 
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  Plus
} from 'lucide-react';
import { cn, formatCurrency } from '../../lib/utils';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const feeData = [
  { name: 'Paid', value: 3.8, color: '#059669' },
  { name: 'Pending', value: 1.2, color: '#F59E0B' },
  { name: 'Overdue', value: 0.8, color: '#DC2626' },
];

export default function FeeModule() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Fee Management</h2>
          <p className="text-gray-500 text-sm">Financial Oversight • Term 2, 2024</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 bg-white border px-4 py-2.5 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 transition-all shadow-sm">
            <FileText size={18} />
            Reports
          </button>
          <button className="flex items-center gap-2 bg-blue-600 px-4 py-2.5 rounded-xl text-sm font-bold text-white hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20">
            <Plus size={18} />
            Record Payment
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Total Revenue', value: formatCurrency(5600000), trend: '+12%', icon: TrendingUp, color: 'blue' },
          { title: 'Amount Paid', value: formatCurrency(3850000), trend: '68%', icon: CheckCircle2, color: 'emerald' },
          { title: 'Outstanding', value: formatCurrency(1750000), trend: '-5%', icon: Clock, color: 'amber' },
          { title: 'Debtors', value: '42 Students', trend: '-2', icon: AlertCircle, color: 'red' },
        ].map((stat) => (
          <div key={stat.title} className="bg-white p-6 rounded-2xl border shadow-sm">
            <div className="flex items-start justify-between">
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest">{stat.title}</p>
              <stat.icon size={16} className={`text-${stat.color}-500`} />
            </div>
            <div className="mt-2 flex items-end justify-between">
              <h3 className="text-xl font-black text-gray-900">{stat.value}</h3>
              <p className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full",stat.color === 'emerald' ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-50 text-gray-500')}>
                {stat.trend}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 bg-white p-6 rounded-2xl border shadow-sm">
          <h3 className="font-bold text-gray-900 mb-6">Payment Distribution</h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={feeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {feeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3 mt-4">
            {feeData.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{backgroundColor: item.color}}></div>
                  <span className="text-sm font-medium text-gray-600">{item.name}</span>
                </div>
                <span className="text-sm font-bold text-gray-900">₦{item.value}M</span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 bg-white rounded-2xl border shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b flex flex-col sm:flex-row items-center justify-between gap-4">
            <h3 className="font-bold text-gray-900">Recent Transactions</h3>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input 
                  type="text" 
                  placeholder="Student name or ID..."
                  className="w-full bg-gray-50 border rounded-xl py-2 pl-10 pr-4 text-sm outline-none focus:ring-2 ring-blue-50 focus:border-blue-600 transition-all font-medium" 
                />
              </div>
              <button className="p-2 border rounded-xl hover:bg-gray-50 transition-colors"><Filter size={18} /></button>
            </div>
          </div>

          <div className="flex-1 overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Date</th>
                  <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Student</th>
                  <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Type</th>
                  <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest text-right">Amount</th>
                  <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {[
                  { date: 'Jun 14, 2024', student: 'Ifeoluwa O.', type: 'Tuition Fee', amount: 85000, status: 'Success' },
                  { date: 'Jun 13, 2024', student: 'Musa Garba', type: 'Bus Fee', amount: 12000, status: 'Success' },
                  { date: 'Jun 12, 2024', student: 'Zainab Ahmed', type: 'Tuition Fee', amount: 125000, status: 'Pending' },
                  { date: 'Jun 12, 2024', student: 'Ezekiel J.', type: 'Uniform', amount: 8000, status: 'Success' },
                  { date: 'Jun 11, 2024', student: 'Chinonso U.', type: 'Tuition Fee', amount: 45000, status: 'Failed' },
                ].map((tx, i) => (
                  <tr key={i} className="hover:bg-gray-50/50 transition-colors cursor-pointer group">
                    <td className="px-6 py-4 text-sm text-gray-500 font-medium">{tx.date}</td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{tx.student}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded-md">{tx.type}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <p className={cn("font-black text-sm", tx.status === 'Failed' ? 'text-red-600' : 'text-gray-900')}>
                        {formatCurrency(tx.amount)}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center">
                        <span className={cn(
                          "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                          tx.status === 'Success' ? 'bg-emerald-50 text-emerald-600' :
                          tx.status === 'Pending' ? 'bg-amber-50 text-amber-600' :
                          'bg-red-50 text-red-600'
                        )}>
                          {tx.status}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 bg-gray-50 border-t flex items-center justify-between">
            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Showing 5 of 124 transactions</p>
            <button className="text-blue-600 font-bold text-xs uppercase tracking-widest hover:underline px-4 py-2">View Transaction History</button>
          </div>
        </div>
      </div>
    </div>
  );
}
