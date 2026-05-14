import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  ClipboardCheck, 
  CreditCard, 
  TrendingUp, 
  ArrowUpRight, 
  Calendar,
  MoreVertical,
  CheckCircle2,
  Clock,
  UserPlus,
  Shield,
  Bell,
  FileText,
  AlertCircle
} from 'lucide-react';
import { formatCurrency } from '../../lib/utils';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const data = [
  { name: 'Week 1', attendance: 92, fees: 450000 },
  { name: 'Week 2', attendance: 88, fees: 320000 },
  { name: 'Week 3', attendance: 95, fees: 580000 },
  { name: 'Week 4', attendance: 91, fees: 610000 },
];

export default function AdminDashboard() {
  const stats = [
    { title: 'Total Students', value: '1,248', change: '+12', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { title: 'Avg Attendance', value: '91%', change: '+3%', icon: ClipboardCheck, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { title: 'Fees Collected', value: formatCurrency(1850000), change: '+₦240k', icon: CreditCard, color: 'text-amber-600', bg: 'bg-amber-50' },
    { title: 'Performance', value: '74%', change: '+2%', icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-blue-600 font-medium text-sm">Main Campus Administration</p>
          <div className="flex items-center gap-3">
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">School Overview</h2>
            <div className="bg-gray-900 text-emerald-400 px-3 py-1 rounded-lg text-[10px] font-black tracking-widest mt-1">
              ID: SCH-8241-PLS
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 text-gray-500 bg-white px-4 py-2 rounded-xl border-dashed border-2 shadow-sm">
          <Calendar size={18} />
          <span className="text-sm font-medium">Term 2, Week 6 • June 2026</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-2xl border shadow-sm hover:shadow-md transition-shadow group cursor-pointer"
          >
            <div className="flex items-start justify-between">
              <div className={cn("p-3 rounded-xl transition-colors group-hover:bg-white border", stat.bg)}>
                <stat.icon size={24} className={stat.color} />
              </div>
              <div className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full text-xs font-bold">
                {stat.change}
                <ArrowUpRight size={12} />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-500 font-medium">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="font-bold text-gray-900 text-lg">Financial Performance</h3>
              <p className="text-sm text-gray-500">Revenue and fee collection trends</p>
            </div>
            <select className="text-sm border rounded-lg px-3 py-1.5 focus:ring-2 ring-blue-100 outline-none">
              <option>Last 4 Weeks</option>
              <option>This Term</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: '#F9FAFB'}}
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                />
                <Bar dataKey="fees" fill="#2563EB" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border shadow-sm">
          <h3 className="font-bold text-gray-900 text-lg mb-6 flex items-center justify-between">
            Staff Vetting
            <span className="text-[10px] font-black uppercase tracking-widest text-amber-600 bg-amber-50 px-2 py-1 rounded">Action Required</span>
          </h3>
          <div className="space-y-4">
            {[
              { type: 'Exam Questions', target: 'JSS3 Math Exam', user: 'Mr. Okoro', status: 'Pending', icon: FileText, color: 'text-blue-600' },
              { type: 'Quiz Set', target: 'SS2 Further Maths', user: 'Mr. Jude', status: 'Rejected', icon: AlertCircle, color: 'text-red-500' },
              { type: 'CA Test', target: 'Pry 4 English', user: 'Mrs. Ade', status: 'Pending', icon: Clock, color: 'text-amber-600' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-all cursor-pointer group">
                <div className={cn("p-2 rounded-lg shrink-0", item.color, "bg-opacity-10")}>
                  <item.icon size={16} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-sm text-gray-900 truncate">{item.type}</p>
                    <span className={cn(
                      "text-[9px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded",
                      item.status === 'Pending' ? 'bg-amber-50 text-amber-600' :
                      item.status === 'Rejected' ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'
                    )}>{item.status}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">{item.target} • {item.user}</p>
                </div>
              </div>
            ))}
            <button className="w-full py-3 text-sm font-bold text-blue-600 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors mt-2">
              Open Vetting Portal
            </button>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b bg-gray-50/50 flex items-center justify-between">
          <h3 className="font-bold text-gray-900">Recent Activity</h3>
          <button className="text-blue-600 text-xs font-bold hover:underline">View Log</button>
        </div>
        <div className="divide-y">
          {[
            { action: 'Attendance marked', detail: 'SS2 Science - 100% present', time: '10 mins ago', icon: CheckCircle2, color: 'text-emerald-500' },
            { action: 'Result submitted', detail: 'Primary 4 English (Week 5 Test)', time: '45 mins ago', icon: Clock, color: 'text-amber-500' },
            { action: 'Fee payment', detail: '₦125,000 via Bank Transfer (Zainab A.)', time: '2 hours ago', icon: CreditCard, color: 'text-blue-500' },
          ].map((activity, i) => (
            <div key={i} className="px-6 py-4 flex items-center gap-4">
              <activity.icon size={18} className={activity.color} />
              <div>
                <p className="text-sm font-semibold text-gray-900">{activity.action}</p>
                <p className="text-xs text-gray-500">{activity.detail}</p>
              </div>
              <span className="ml-auto text-xs text-gray-400">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import { cn } from '../../lib/utils';
